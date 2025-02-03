import Parser from 'rss-parser';
import { MediaItem, RSSItem } from '@/types/media';
import { cache } from 'react';

// RSS Parser for The Conversation with custom headers
const parser = new Parser<RSSItem>({
    headers: {
        'Accept': 'application/atom+xml,application/xml,text/xml,application/rss+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; RummerLab/1.0; +https://rummerlab.org)'
    },
    customFields: {
        item: ['contentSnippet']
    }
});

// Cached fetch wrapper with error handling
async function fetchWithCache(url: string, options?: RequestInit) {
    try {
        const response = await fetch(url, {
            ...options,
            next: {
                revalidate: 604800 // Cache for one week (7 days in seconds)
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        return null;
    }
}

// Function to extract image from content
function extractImageFromContent(content: string): string | null {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content?.match(imgRegex);
    return match ? match[1] : null;
}

// Function to fetch and parse The Conversation RSS feed
export const fetchConversationArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        // Using author profile feed
        const response = await fetch('https://theconversation.com/profiles/jodie-l-rummer-711270/articles.atom', {
            headers: {
                'Accept': 'application/atom+xml,application/xml,text/xml,application/rss+xml',
                'User-Agent': 'Mozilla/5.0 (compatible; RummerLab/1.0; +https://rummerlab.org)'
            },
            next: {
                revalidate: 604800
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        return feed.items.map(item => {
            // Try to get image from content or media:content
            const imageUrl = item['media:content']?.$.url || 
                           item.enclosure?.url || 
                           (item.content ? extractImageFromContent(item.content) : null);

            return {
                type: 'article',
                source: 'The Conversation',
                title: item.title || '',
                description: item.contentSnippet || '',
                url: item.link || '',
                date: item.pubDate || new Date().toISOString(),
                sourceType: 'The Conversation',
                ...(imageUrl && {
                    image: {
                        url: imageUrl,
                        alt: item.title || 'Article image'
                    }
                })
            };
        });
    } catch (error) {
        console.error('Error fetching The Conversation articles:', error);
        return [];
    }
});

interface NewsAPIArticle {
    source: {
        name: string;
    };
    title: string;
    description: string;
    url: string;
    publishedAt: string;
    urlToImage?: string;
}

interface GuardianArticle {
    fields: {
        headline: string;
        trailText: string;
        thumbnail?: string;
    };
    webUrl: string;
    webPublicationDate: string;
}

// Function to fetch articles from NewsAPI
export const fetchNewsAPIArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        if (!process.env.NEWS_API_ORG_KEY) {
            console.error('NEWS_API_ORG_KEY is not defined in environment variables');
            return [];
        }

        const url = `https://newsapi.org/v2/everything?q="Rummer"&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_ORG_KEY}`;
        const data = await fetchWithCache(url);
        
        if (!data) {
            console.error('No data returned from NewsAPI');
            return [];
        }
        
        if (!data.articles) {
            console.error('No articles found in NewsAPI response:', data);
            return [];
        }
        
        return data.articles.map((article: NewsAPIArticle) => ({
            type: 'article',
            source: article.source.name,
            title: article.title,
            description: article.description,
            url: article.url,
            date: article.publishedAt,
            sourceType: 'Other',
            ...(article.urlToImage && {
                image: {
                    url: article.urlToImage,
                    alt: article.title
                }
            })
        }));
    } catch (error) {
        console.error('Error fetching NewsAPI articles:', error);
        return [];
    }
});

// Function to fetch articles from The Guardian
export const fetchGuardianArticles = cache(async (): Promise<MediaItem[]> => {
    const data = await fetchWithCache(
        `https://content.guardianapis.com/search?q="Jodie Rummer"&show-fields=headline,trailText,thumbnail&api-key=${process.env.THE_GUARDIAN_API_KEY}`
    );
    
    if (!data || !data.response || !data.response.results) {
        return [];
    }
    
    return data.response.results.map((article: GuardianArticle) => ({
        type: 'article',
        source: 'The Guardian',
        title: article.fields.headline,
        description: article.fields.trailText,
        url: article.webUrl,
        date: article.webPublicationDate,
        sourceType: 'The Guardian',
        ...(article.fields.thumbnail && {
            image: {
                url: article.fields.thumbnail,
                alt: article.fields.headline
            }
        })
    }));
});

// Function to fetch all news sources with error handling
export const fetchAllNews = cache(async (): Promise<MediaItem[]> => {
    try {
        const [conversationArticles, newsApiArticles, guardianArticles] = await Promise.allSettled([
            fetchConversationArticles(),
            fetchNewsAPIArticles(),
            fetchGuardianArticles()
        ]);

        // Handle results from Promise.allSettled
        const results: MediaItem[] = [];
        
        if (conversationArticles.status === 'fulfilled') results.push(...conversationArticles.value);
        if (newsApiArticles.status === 'fulfilled') results.push(...newsApiArticles.value);
        if (guardianArticles.status === 'fulfilled') results.push(...guardianArticles.value);

        // Sort by date
        return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error fetching all news:', error);
        return [];
    }
}); 
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
        bodyText?: string;
    };
    webUrl: string;
    webPublicationDate: string;
}

// Function to strip HTML tags and clean text
function stripHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&[^;]+;/g, '') // Remove HTML entities
        .replace(/\s+/g, ' ') // Normalize whitespace
        .replace(/^(Exclusive|Live):\s*/i, '') // Remove "Exclusive:" or "Live:" prefixes
        .trim();
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
    try {
        const data = await fetchWithCache(
            // Using quotes to ensure exact phrase match and adding body field to search content
            `https://content.guardianapis.com/search?q="Jodie+Rummer"&show-fields=headline,trailText,thumbnail,bodyText&api-key=${process.env.THE_GUARDIAN_API_KEY}`
        );
        
        if (!data || !data.response || !data.response.results) {
            return [];
        }
        
        // Filter articles to ensure they actually mention Jodie Rummer and aren't blog closures
        return data.response.results
            .filter((article: GuardianArticle) => {
                const bodyText = article.fields.bodyText?.toLowerCase() || '';
                const headline = article.fields.headline?.toLowerCase() || '';
                const trailText = article.fields.trailText?.toLowerCase() || '';
                
                // Exclude blog closures and ensure Jodie Rummer is mentioned
                const isBlogClosure = trailText.includes('this blog is now closed') || 
                                    trailText.includes('blog is closed') ||
                                    headline.includes('live updates') ||
                                    headline.includes('as it happened');
                
                const mentionsJodie = bodyText.includes('jodie rummer') || 
                                    headline.includes('jodie rummer') || 
                                    trailText.includes('jodie rummer');
                
                return mentionsJodie && !isBlogClosure;
            })
            .map((article: GuardianArticle) => ({
                type: 'article',
                source: 'The Guardian',
                title: stripHtml(article.fields.headline),
                description: stripHtml(article.fields.trailText),
                url: article.webUrl,
                date: article.webPublicationDate,
                sourceType: 'The Guardian',
                ...(article.fields.thumbnail && {
                    image: {
                        url: article.fields.thumbnail,
                        alt: stripHtml(article.fields.headline)
                    }
                })
            }));
    } catch (error) {
        console.error('Error fetching Guardian articles:', error);
        return [];
    }
});

// Common headers for RSS feeds
const rssHeaders = {
    'Accept': 'application/atom+xml,application/xml,text/xml,application/rss+xml',
    'User-Agent': 'Mozilla/5.0 (compatible; RummerLab/1.0; +https://rummerlab.org)'
};

// Function to fetch ABC News articles
export const fetchABCNewsArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch('https://www.abc.net.au/news/feed/51120/rss.xml', {
            headers: rssHeaders,
            next: { revalidate: 604800 }
        });
        // https://www.abc.net.au/news/feed/2942460/rss.xml
        //https://www.abc.net.au/science/news/topic/enviro/enviro.xml
        /* AU science http://feeds.news.com.au/public/rss/2.0/news_tech_506.xml
AU science http://www.smh.com.au/rssheadlines/health/article/rss.xml
AU science http://www.sbs.com.au/news/rss/news/science-technology.xml
AU science http://www.theage.com.au/rssheadlines/technology-news/article/rss.xml
AU science http://www.watoday.com.au/rssheadlines/technology-news/article/rss.xml
AU science http://www.australianscience.com.au/feed/
AU science http://www.scienceweek.net.au/homepage/feed/
*/

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        return feed.items
            .filter(item => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                return content.includes('rummer') || title.includes('rummer');
            })
            .map(item => ({
                type: 'article',
                source: 'ABC News',
                title: stripHtml(item.title || ''),
                description: stripHtml(item.contentSnippet || ''),
                url: item.link || '',
                date: item.pubDate || new Date().toISOString(),
                sourceType: 'Other',
                ...(item.enclosure?.url && {
                    image: {
                        url: item.enclosure.url,
                        alt: stripHtml(item.title || '')
                    }
                })
            }));
    } catch (error) {
        console.error('Error fetching ABC News articles:', error);
        return [];
    }
});

// Function to fetch Yahoo News AU articles
export const fetchYahooNewsArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch('https://au.news.yahoo.com/rss', {
            headers: rssHeaders,
            next: { revalidate: 604800 }
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        return feed.items
            .filter(item => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                return content.includes('rummer') || title.includes('rummer');
            })
            .map(item => ({
                type: 'article',
                source: 'Yahoo News AU',
                title: stripHtml(item.title || ''),
                description: stripHtml(item.contentSnippet || ''),
                url: item.link || '',
                date: item.pubDate || new Date().toISOString(),
                sourceType: 'Other',
                ...(item.enclosure?.url && {
                    image: {
                        url: item.enclosure.url,
                        alt: stripHtml(item.title || '')
                    }
                })
            }));
    } catch (error) {
        console.error('Error fetching Yahoo News AU articles:', error);
        return [];
    }
});

// Function to fetch Science Daily articles
export const fetchScienceDailyArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        // Updated URL to use HTTPS and the correct path
        const response = await fetch('https://www.sciencedaily.com/rss/plants_animals/marine_biology.xml', {
            headers: rssHeaders,
            next: { revalidate: 604800 }
        });

        if (!response.ok) {
            console.warn(`Science Daily RSS feed returned status: ${response.status}`);
            return [];
        }

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        return feed.items
            .filter(item => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                return content.includes('rummer') || title.includes('rummer');
            })
            .map(item => ({
                type: 'article',
                source: 'Science Daily',
                title: stripHtml(item.title || ''),
                description: stripHtml(item.contentSnippet || ''),
                url: item.link || '',
                date: item.pubDate || new Date().toISOString(),
                sourceType: 'Other',
                ...(item.enclosure?.url && {
                    image: {
                        url: item.enclosure.url,
                        alt: stripHtml(item.title || '')
                    }
                })
            }));
    } catch (error) {
        console.error('Error fetching Science Daily articles:', error);
        return [];
    }
});

// Function to fix Google News URLs
function fixGoogleNewsUrl(url: string): string {
    if (!url) return '';
    
    // If the URL contains 'articles/' and 'oc=5', it's a Google News redirect URL
    if (url.includes('news.google.com/rss/articles/')) {
        try {
            // Extract the article ID from the URL
            const articleId = url.split('articles/')[1].split('?')[0];
            
            // For Google News RSS feeds, we need to construct the actual URL
            // The URL in the feed is already the final URL, we just need to clean it up
            return url.replace('/rss/articles/', '/articles/');
        } catch (error) {
            console.warn('Error processing Google News URL:', error);
            return url;
        }
    }
    
    // Handle relative URLs from Google News
    if (url.startsWith('./')) {
        return `https://news.google.com/${url.slice(2)}`;
    }
    if (!url.startsWith('http')) {
        return `https://news.google.com/${url}`;
    }
    return url;
}

// Update the Google News function with expanded search query
export const fetchGoogleNewsArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            'https://news.google.com/rss/search?q=Jodie+Rummer+OR+Great+Barrier+Reef+OR+James+Cook+University&hl=en-AU&gl=AU&ceid=AU:en',
            {
                headers: rssHeaders,
                next: { revalidate: 604800 }
            }
        );

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        return feed.items
            .filter(item => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                const description = (item.contentSnippet || '').toLowerCase();
                return content.includes('rummer') || 
                       title.includes('rummer') || 
                       description.includes('rummer');
            })
            .map(item => {
                // Get the URL from the description field if available, as it contains the direct link
                const descriptionUrl = item.description?.match(/href="([^"]+)"/)?.[1];
                const itemUrl = item.link || descriptionUrl || item.guid || '';
                const fixedUrl = fixGoogleNewsUrl(itemUrl);

                return {
                    type: 'article',
                    source: 'Google News',
                    title: stripHtml(item.title || ''),
                    description: stripHtml(item.contentSnippet || item.description || ''),
                    url: fixedUrl,
                    date: item.pubDate || new Date().toISOString(),
                    sourceType: 'Other',
                    ...(item.enclosure?.url && {
                        image: {
                            url: item.enclosure.url,
                            alt: stripHtml(item.title || '')
                        }
                    })
                };
            });
    } catch (error) {
        console.error('Error fetching Google News articles:', error);
        return [];
    }
});

// Function to fetch news.com.au articles
export const fetchNewsComAuArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch('https://www.news.com.au/content-feeds/latest-news-national/', {
            headers: rssHeaders,
            next: { revalidate: 604800 }
        });

        if (!response.ok) {
            console.warn(`news.com.au RSS feed returned status: ${response.status}`);
            return [];
        }

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        return feed.items
            .filter(item => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                return content.includes('rummer') || title.includes('rummer');
            })
            .map(item => ({
                type: 'article',
                source: 'news.com.au',
                title: stripHtml(item.title || ''),
                description: stripHtml(item.contentSnippet || ''),
                url: item.link || '',
                date: item.pubDate || new Date().toISOString(),
                sourceType: 'Other',
                ...(item.enclosure?.url && {
                    image: {
                        url: item.enclosure.url,
                        alt: stripHtml(item.title || '')
                    }
                })
            }));
    } catch (error) {
        console.error('Error fetching news.com.au articles:', error);
        return [];
    }
});

// Update fetchAllNews to include new sources
export const fetchAllNews = cache(async (): Promise<MediaItem[]> => {
    try {
        const [
            conversationArticles,
            newsApiArticles,
            guardianArticles,
            googleNewsArticles,
            abcNewsArticles,
            yahooNewsArticles,
            scienceDailyArticles,
            newsComAuArticles
        ] = await Promise.allSettled([
            fetchConversationArticles(),
            fetchNewsAPIArticles(),
            fetchGuardianArticles(),
            fetchGoogleNewsArticles(),
            fetchABCNewsArticles(),
            fetchYahooNewsArticles(),
            fetchScienceDailyArticles(),
            fetchNewsComAuArticles()
        ]);

        const results: MediaItem[] = [];
        
        // Add results from all sources
        if (conversationArticles.status === 'fulfilled') results.push(...conversationArticles.value);
        if (newsApiArticles.status === 'fulfilled') results.push(...newsApiArticles.value);
        if (guardianArticles.status === 'fulfilled') results.push(...guardianArticles.value);
        if (googleNewsArticles.status === 'fulfilled') results.push(...googleNewsArticles.value);
        if (abcNewsArticles.status === 'fulfilled') results.push(...abcNewsArticles.value);
        if (yahooNewsArticles.status === 'fulfilled') results.push(...yahooNewsArticles.value);
        if (scienceDailyArticles.status === 'fulfilled') results.push(...scienceDailyArticles.value);
        if (newsComAuArticles.status === 'fulfilled') results.push(...newsComAuArticles.value);

        // Sort by date and remove duplicates based on URL
        return Array.from(
            new Map(results.map(item => [item.url, item]))
            .values()
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } catch (error) {
        console.error('Error fetching all news:', error);
        return [];
    }
}); 
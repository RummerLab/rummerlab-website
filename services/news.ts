import Parser from 'rss-parser';
import { MediaItem, RSSItem } from '@/types/media';
import { cache } from 'react';

// Common constants
const REVALIDATE_TIME = 604800; // One week in seconds

const DEFAULT_HEADERS = {
    'Accept': 'application/atom+xml,application/xml,text/xml,application/rss+xml',
    'User-Agent': 'Mozilla/5.0 (compatible; RummerLab/1.0; +https://rummerlab.org)'
};

const MODERN_HEADERS = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://www.townsvillebulletin.com.au',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
};

// Initialize RSS parser
const parser = new Parser<RSSItem>({
    headers: DEFAULT_HEADERS,
    customFields: {
        item: ['contentSnippet']
    }
});

// Utility functions
import sanitizeHtml from 'sanitize-html';

function stripHtml(html: string): string {
    return sanitizeHtml(html, {
        allowedTags: [],
        allowedAttributes: {}
    }).replace(/\s+/g, ' ')
      .replace(/^(Exclusive|Live):\s*/i, '')
      .trim();
}

function extractImageFromContent(content: string): string | null {
    const imgRegex = /<img[^>]+src="([^">]+)"/;
    const match = content?.match(imgRegex);
    return match ? match[1] : null;
}

// Generic fetch function with error handling and caching
async function fetchWithRetry<T>(
    url: string,
    options: RequestInit = {},
    retries = 3
): Promise<T | null> {
    try {
        const response = await fetch(url, {
            ...options,
            next: { revalidate: REVALIDATE_TIME }
        });
        
        if (!response.ok) {
            console.warn(`Fetch failed for ${url} with status: ${response.status}, status text: ${response.statusText}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying fetch for ${url}, ${retries} attempts remaining. Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithRetry(url, options, retries - 1);
        }
        console.error(`Final fetch error for ${url}:`, error);
        console.error(`Request options:`, JSON.stringify(options, null, 2));
        return null;
    }
}

// Generic RSS fetcher
async function fetchRSSFeed(
    url: string,
    source: string,
    filterFn: (item: RSSItem) => boolean,
    headers = DEFAULT_HEADERS
): Promise<MediaItem[]> {
    try {
        const response = await fetch(url, {
            headers,
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!response.ok) {
            console.warn(`${source} RSS feed returned status: ${response.status}, status text: ${response.statusText}`);
            return [];
        }

        const xmlText = await response.text();
        
        const feed = await parser.parseString(xmlText);

        const filteredItems = feed.items.filter(filterFn);

        return filteredItems.map(item => {
            const mediaItem: MediaItem = {
                type: 'article',
                source,
                title: stripHtml(item.title || ''),
                description: stripHtml(item.contentSnippet || ''),
                url: item.link || '',
                date: item.pubDate || new Date().toISOString(),
                sourceType: source === 'The Guardian' ? 'The Guardian' : 
                          source === 'The Conversation' ? 'The Conversation' : 
                          source === 'ABC News' ? 'ABC News' : 
                          source === 'CNN' ? 'CNN' : 'Other',
                ...(item.enclosure?.url && {
                    image: {
                        url: item.enclosure.url,
                        alt: stripHtml(item.title || '')
                    }
                })
            };
            return mediaItem;
        });
    } catch (error) {
        console.error(`Error fetching ${source} articles:`, error);
        console.error(`Request headers:`, JSON.stringify(headers, null, 2));
        if (error instanceof Error) {
            console.error(`Error stack:`, error.stack);
        }
        return [];
    }
}

// Common filter functions
const doesArticleMentionRummer = (content: string, title: string, description: string): boolean => {
    const normalizedContent = content.toLowerCase();
    const normalizedTitle = title.toLowerCase();
    const normalizedDescription = description.toLowerCase();
    
    return normalizedTitle.includes('rummer') || 
           normalizedDescription.includes('rummer') || 
           (normalizedContent.includes('rummer') && 
            (normalizedContent.split('rummer').length > 2 || 
             (normalizedContent.includes('dr rummer') || normalizedContent.includes('dr. rummer')) || 
             normalizedContent.includes('professor rummer') || 
             normalizedContent.includes('jodie rummer')));
};

const containsRummer = (item: RSSItem): boolean => {
    return doesArticleMentionRummer(
        item.content || '',
        item.title || '',
        item.contentSnippet || ''
    );
};

const containsMarineKeywords = (item: RSSItem): boolean => {
    const content = (item.content || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    const description = (item.contentSnippet || '').toLowerCase();
    return !!(content.includes('marine') ||
           content.includes('reef') ||
           content.includes('shark') ||
           content.includes('fish') ||
           content.includes('ocean') ||
           title.includes('marine') ||
           description.includes('marine'));
};

// Common types and interfaces
interface NewsAPIResponse {
    articles: Array<{
        source: { name: string };
        title: string;
        description: string;
        url: string;
        publishedAt: string;
        urlToImage?: string;
    }>;
}

interface GuardianResponse {
    response: {
        results: Array<{
            fields: {
                headline: string;
                trailText: string;
                thumbnail?: string;
                bodyText?: string;
            };
            webUrl: string;
            webPublicationDate: string;
        }>;
    };
}

// Export fetch functions using the generic RSS fetcher
export const fetchConversationArticles = cache(() => 
    fetchRSSFeed(
        'https://theconversation.com/profiles/jodie-l-rummer-711270/articles.atom',
        'The Conversation',
        (item: RSSItem): boolean => true,
        DEFAULT_HEADERS
    )
);

export const fetchABCNewsArticles = cache(() =>
    fetchRSSFeed(
        'https://www.abc.net.au/news/feed/51120/rss.xml',
        'ABC News',
        containsRummer,
        DEFAULT_HEADERS
    )
);

export const fetchYahooNewsArticles = cache(() =>
    fetchRSSFeed(
        'https://au.news.yahoo.com/rss',
        'Yahoo News AU',
        containsRummer,
        DEFAULT_HEADERS
    )
);

export const fetchScienceDailyArticles = cache(() =>
    fetchRSSFeed(
        'https://www.sciencedaily.com/rss/plants_animals/marine_biology.xml',
        'Science Daily',
        containsRummer,
        DEFAULT_HEADERS
    )
);

export const fetchNewsComAuArticles = cache(() =>
    fetchRSSFeed(
        'https://www.news.com.au/content-feeds/latest-news-national/',
        'news.com.au',
        containsRummer,
        DEFAULT_HEADERS
    )
);

export const fetchABCScienceArticles = cache(() =>
    fetchRSSFeed(
        'https://www.abc.net.au/science/news/topic/enviro/enviro.xml',
        'ABC Science',
        item => containsRummer(item), // || containsMarineKeywords(item),
        DEFAULT_HEADERS
    )
);

export const fetchNewsComAuScienceArticles = cache(() =>
    fetchRSSFeed(
        'http://feeds.news.com.au/public/rss/2.0/news_tech_506.xml',
        'News.com.au Science',
        item => containsRummer(item), // || containsMarineKeywords(item),
        DEFAULT_HEADERS
    )
);

export const fetchSMHScienceArticles = cache(() =>
    fetchRSSFeed(
        'http://www.smh.com.au/rssheadlines/health/article/rss.xml',
        'Sydney Morning Herald',
        item => containsRummer(item), // || containsMarineKeywords(item),
        DEFAULT_HEADERS
    )
);
export const fetchSBSScienceArticles = cache(() =>
    fetchRSSFeed(
        'https://www.sbs.com.au/news/feed',
        'SBS News',
        (item: RSSItem): boolean => {
            const content = (item.content || '').toLowerCase();
            const title = (item.title || '').toLowerCase();
            const description = (item.contentSnippet || '').toLowerCase();
            
            const isRelevant = containsRummer(item); // || containsMarineKeywords(item);
            /*const isScience = content.includes('science') ||
                            title.includes('science') ||
                            description.includes('science') ||
                            content.includes('research') ||
                            title.includes('research') ||
                            description.includes('research');
            
            return Boolean(isRelevant && isScience);*/
            return isRelevant;
        },
        DEFAULT_HEADERS
    )
);

export const fetchCairnsNewsArticles = cache(() =>
    fetchRSSFeed(
        'https://cairnsnews.org/feed/',
        'Cairns News',
        item => containsRummer(item), // || containsMarineKeywords(item),
        DEFAULT_HEADERS
    )
);

// Special case handlers
export const fetchNewsAPIArticles = cache(async (): Promise<MediaItem[]> => {
    if (!process.env.NEWS_API_ORG_KEY) {
        console.error('NEWS_API_ORG_KEY is not defined in environment variables');
        return [];
    }

    const data = await fetchWithRetry<NewsAPIResponse>(
        `https://newsapi.org/v2/everything?q="Rummer"&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_ORG_KEY}`
    );

    if (!data?.articles) return [];

    //save to file for testing
    //const fs = require('fs');
    //fs.writeFileSync('newsapi.json', JSON.stringify(data, null, 2));

    return data.articles
        .filter(article => {
            const title = article.title ?? '';
            const description = article.description ?? '';
            const content = `${title} ${description}`.toLowerCase();
            return (
                doesArticleMentionRummer(content, title, description) ||
                content.includes('shark')
            );
        })
        .map(article => ({
            type: 'article' as const,
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
});

// Function to fix Google News URLs
function fixGoogleNewsUrl(url: string): string {
    if (!url) return '';
    
    try {
        // Handle Google News redirect URLs
        if (url.includes('news.google.com/rss/articles/')) {
            // Extract the actual URL from the Google News redirect
            const urlMatch = url.match(/url=([^&]+)/);
            if (urlMatch) {
                try {
                    return decodeURIComponent(urlMatch[1]);
                } catch {
                    // If decoding fails, use the cleaned up version
                    return url.replace('/rss/articles/', '/articles/');
                }
            }
            return url.replace('/rss/articles/', '/articles/');
        }
        
        // Handle relative URLs from Google News
        if (url.startsWith('./')) {
            return `https://news.google.com/${url.slice(2)}`;
        }
        if (!url.startsWith('http')) {
            return `https://news.google.com/${url}`;
        }
        
        return url;
    } catch (error) {
        console.error('Error processing Google News URL:', error);
        return url;
    }
}

// Add Google News fetcher
export const fetchGoogleNewsArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            'https://news.google.com/rss/search?q=Jodie+Rummer+OR+Great+Barrier+Reef+OR+James+Cook+University&hl=en-AU&gl=AU&ceid=AU:en',
            {
                headers: DEFAULT_HEADERS,
                next: { revalidate: REVALIDATE_TIME }
            }
        );

        if (!response.ok) {
            console.warn(`Google News RSS feed returned status: ${response.status}, status text: ${response.statusText}`);
            return [];
        }

        const xmlText = await response.text();
        
        const feed = await parser.parseString(xmlText);

        const articles = feed.items
            .filter(item => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                const description = (item.contentSnippet || '').toLowerCase();
                
                return doesArticleMentionRummer(content, title, description);
            })
            .map(item => {
                // Get the URL from the description field if available, as it contains the direct link
                const descriptionUrl = item.description?.match(/href="([^"]+)"/)?.[1];
                const itemUrl = item.link || descriptionUrl || item.guid || '';
                const fixedUrl = fixGoogleNewsUrl(itemUrl);

                const mediaItem: MediaItem = {
                    type: 'article',
                    source: 'Google News',
                    title: stripHtml(item.title || ''),
                    description: stripHtml(item.contentSnippet || item.description || ''),
                    url: fixedUrl,
                    date: item.pubDate || new Date().toISOString(),
                    sourceType: 'Other' as const,
                    ...(item.enclosure?.url && {
                        image: {
                            url: item.enclosure.url,
                            alt: stripHtml(item.title || '')
                        }
                    })
                };

                return mediaItem;
            });

        return articles;
    } catch (error) {
        console.error('Error fetching Google News articles:', error);
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }
        return [];
    }
});

// Update Guardian article filter
export const fetchGuardianArticles = cache(async (): Promise<MediaItem[]> => {
    const data = await fetchWithRetry<GuardianResponse>(
        `https://content.guardianapis.com/search?q="Rummer"&show-fields=headline,trailText,thumbnail,bodyText&api-key=${process.env.THE_GUARDIAN_API_KEY}`
    );

    if (!data?.response?.results) {
        console.warn('No results found in Guardian response:', data);
        return [];
    }

    const filteredArticles = data.response.results
        .filter(article => {
            const bodyText = article.fields.bodyText?.toLowerCase() || '';
            const headline = article.fields.headline?.toLowerCase() || '';
            const trailText = article.fields.trailText?.toLowerCase() || '';
            
            // Expanded list of blog/live update exclusions
            const isBlogExclude = 
                trailText.includes('this blog is now closed') || 
                trailText.includes('blog is closed') ||
                headline.includes('live updates') ||
                headline.includes('as it happened') ||
                headline.includes('live blog') ||
                headline.includes('live coverage') ||
                headline.includes('live report') ||
                headline.includes('live reaction') ||
                headline.includes('live news') ||
                headline.includes('annotated solutions for prize') ||
                headline.includes('crossword');
            
            return doesArticleMentionRummer(bodyText, headline, trailText) && !isBlogExclude;
        });

    return filteredArticles.map(article => ({
        type: 'article' as const,
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
});

// Townsville Bulletin requires HTML scraping
export const fetchTownsvilleBulletinArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch('https://www.townsvillebulletin.com.au/news/townsville', {
            headers: MODERN_HEADERS,
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!response.ok) return [];

        const htmlText = await response.text();
        const articles: MediaItem[] = [];
        
        // Extract articles using regex
        const articlePattern = /<article[^>]*>(.*?)<\/article>/gs;
        const titlePattern = /<h[2-4][^>]*>(.*?)<\/h[2-4]>/s;
        const linkPattern = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>/;
        const datePattern = /datetime="([^"]+)"/;
        const descriptionPattern = /<p[^>]*>(.*?)<\/p>/s;

        let match;
        while ((match = articlePattern.exec(htmlText)) !== null) {
            const articleHtml = match[1];
            const titleMatch = articleHtml.match(titlePattern);
            const linkMatch = articleHtml.match(linkPattern);
            const dateMatch = articleHtml.match(datePattern);
            const descriptionMatch = articleHtml.match(descriptionPattern);

            if (titleMatch && linkMatch) {
                const title = stripHtml(titleMatch[1]);
                const url = new URL(linkMatch[1], 'https://www.townsvillebulletin.com.au').href;
                const date = dateMatch ? new Date(dateMatch[1]).toISOString() : new Date().toISOString();
                const description = descriptionMatch ? stripHtml(descriptionMatch[1]) : '';

                const content = `${title} ${description}`.toLowerCase();

                if (doesArticleMentionRummer(content, title, description)) {
                    articles.push({
                        type: 'article' as const,
                        source: 'Townsville Bulletin',
                        title,
                        description,
                        url,
                        date,
                        sourceType: 'Other'
                    });
                }
            }
        }

        return articles;
    } catch (error) {
        console.error('Error fetching Townsville Bulletin articles:', error);
        return [];
    }
});

// Main function to fetch all news
export const fetchAllNews = cache(async (): Promise<MediaItem[]> => {
    const fetchFunctions = [
        fetchConversationArticles,
        fetchNewsAPIArticles,
        fetchGuardianArticles,
        fetchGoogleNewsArticles,
        fetchABCNewsArticles,
        fetchYahooNewsArticles,
        fetchScienceDailyArticles,
        fetchNewsComAuArticles,
        fetchABCScienceArticles,
        fetchNewsComAuScienceArticles,
        fetchSMHScienceArticles,
        fetchSBSScienceArticles,
        fetchTownsvilleBulletinArticles,
        fetchCairnsNewsArticles
    ];

    try {
        const results = await Promise.allSettled(
            fetchFunctions.map(fn => fn())
        );

        const successfulResults = results.filter((result): result is PromiseFulfilledResult<MediaItem[]> => 
            result.status === 'fulfilled'
        );

        const failedSources = results
            .map((result, index) => ({ result, source: fetchFunctions[index].name }))
            .filter(({ result }) => result.status === 'rejected')
            .map(({ source, result }) => {
                if (result.status === 'rejected') {
                    console.error(`Failed to fetch from ${source}:`, result.reason);
                    return source;
                }
                return null;
            })
            .filter((source): source is string => source !== null);

        if (failedSources.length > 0) {
            console.warn(`Failed to fetch from the following sources: ${failedSources.join(', ')}`);
        }

        const allArticles = successfulResults.flatMap(result => result.value);

        // Remove duplicates and sort by date
        const uniqueArticles = Array.from(
            new Map(allArticles.map(item => [item.url, item]))
            .values()
        ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        //save to file for testing
        //const fs = require('fs');
        //fs.writeFileSync('news.json', JSON.stringify(uniqueArticles, null, 2));

        return uniqueArticles;
    } catch (error) {
        console.error('Error in fetchAllNews:', error);
        if (error instanceof Error) {
            console.error('Error stack:', error.stack);
        }
        return [];
    }
}); 
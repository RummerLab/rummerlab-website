import Parser from 'rss-parser';
import { MediaItem, RSSItem } from '@/types/media';
import { cache } from 'react';

// Common constants
const REVALIDATE_TIME = 7 * 24 * 60 * 60; // 7 days in seconds

// Simple logging function to reduce noise
const logInfo = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[News Service] ${message}`);
    }
};

const logWarn = (message: string) => {
    console.warn(`[News Service] ${message}`);
};

const logError = (message: string, error?: any) => {
    console.error(`[News Service] ${message}`, error);
};

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
            logWarn(`Fetch failed for ${url} with status: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        if (retries > 0) {
            logWarn(`Retrying fetch for ${url}, ${retries} attempts remaining`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithRetry(url, options, retries - 1);
        }
        logError(`Final fetch error for ${url}`, error);
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
            logWarn(`${source} RSS feed returned status: ${response.status}`);
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
        logError(`Error fetching ${source} articles`, error);
        return [];
    }
}

// Primary filter function - articles MUST mention Dr. Rummer, RummerLab, or Physioshark
const doesArticleMentionRummer = (content: string, title: string, description: string): boolean => {
    const normalizedContent = content.toLowerCase();
    const normalizedTitle = title.toLowerCase();
    const normalizedDescription = description.toLowerCase();
    
    // Primary requirement: Must mention Dr. Rummer, RummerLab, or Physioshark
    const rummerKeywords = [
        'rummer',
        'rummerlab',
        'physioshark',
        'physiologyfish'
    ];
    
    // Check for Dr. Rummer specific mentions
    const drRummerMentions = [
        'dr rummer',
        'dr. rummer',
        'professor rummer',
        'prof rummer',
        'prof jodie rummer',
        'jodie rummer'
    ];
    
    // Check if any of the primary keywords are mentioned
    const hasPrimaryKeyword = rummerKeywords.some(keyword => 
        normalizedTitle.includes(keyword) || 
        normalizedDescription.includes(keyword) || 
        normalizedContent.includes(keyword)
    );
    
    // Check for Dr. Rummer specific mentions in content
    const hasDrRummerMention = drRummerMentions.some(mention => 
        normalizedContent.includes(mention)
    );
    
    return hasPrimaryKeyword || hasDrRummerMention;
};

const containsRummer = (item: RSSItem): boolean => {
    return doesArticleMentionRummer(
        item.content || '',
        item.title || '',
        item.contentSnippet || ''
    );
};

// Secondary filter function - marine keywords as prefilter (articles still need to mention Dr. Rummer)
const containsMarineKeywords = (item: RSSItem): boolean => {
    const content = (item.content || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    const description = (item.contentSnippet || '').toLowerCase();
    
    // Marine keywords as prefilter (articles still need to mention Dr. Rummer)
    const marineKeywords = [
        'marine biology', 'marine science', 'marine research', 'marine life',
        'reef', 'coral reef', 'great barrier reef', 'ocean acidification',
        'shark', 'ocean warming', 'marine ecosystem',
        'jcu', 'james cook university'
    ];

    return marineKeywords.some(keyword => 
        content.includes(keyword) || 
        title.includes(keyword) || 
        description.includes(keyword)
    );
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

// Enhanced English detection function to filter out non-English articles
const isLikelyEnglish = (text: string | undefined): boolean => {
    if (!text) return false;
    const isNonEnglish = (text.includes('«') && text.includes('»')) || (text.includes('¿') && text.includes('?'));
    return !isNonEnglish;
};

export const fetchConversationArticles = cache(async (): Promise<MediaItem[]> => {
    const articles = await fetchRSSFeed(
        'https://theconversation.com/profiles/jodie-l-rummer-711270/articles.atom',
        'The Conversation',
        (item: RSSItem): boolean => true,
        DEFAULT_HEADERS
    );

    // Filter for English articles and check for Rummer mentions with HTML content
    const filteredArticles = await Promise.allSettled(
        articles.map(async (article) => {
            const isEnglish = isLikelyEnglish(article.title);
            if (!isEnglish) {
                return null;
            }

            // Check RSS content first
            const hasRummer = doesArticleMentionRummer(article.description || '', article.title, article.description || '');
            const hasMarineKeywords = containsMarineKeywords({ 
                title: article.title, 
                content: article.description || '', 
                contentSnippet: article.description || '' 
            } as RSSItem);

            // If RSS content doesn't have keywords, fetch full HTML content
            if (!hasRummer && !hasMarineKeywords && article.url) {
                const { hasRummer: hasRummerContent, image } = await checkArticleContent(article.url, article.title);
                
                if (hasRummerContent) {
                    // Update article with image if found
                    if (image) {
                        article.image = { url: image, alt: article.title };
                    }
                    return article;
                } else {
                    return null;
                }
            } else if (hasRummer) {
                // If the article passed filters but has no image, fetch HTML to extract one
                if (!article.image && article.url) {
                    try {
                        const { image } = await checkArticleContent(article.url, article.title);
                        if (image) {
                            article.image = { url: image, alt: article.title };
                        }
                    } catch {
                        // Non-fatal: continue without image if extraction fails
                    }
                }
                return article;
            } else {
                return null;
            }
        })
    );

    return filteredArticles
        .filter((result): result is PromiseFulfilledResult<MediaItem | null> => 
            result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value!);
});

export const fetchABCNewsArticles = cache(async (): Promise<MediaItem[]> => {
    const articles = await fetchRSSFeed(
        'https://www.abc.net.au/news/feed/51120/rss.xml',
        'ABC News',
        (item: RSSItem): boolean => true, // Accept all items initially
        DEFAULT_HEADERS
    );

    // Check each article for keywords, with HTML content checking if needed
    const filteredArticles = await Promise.allSettled(
        articles.map(async (article) => {
            const hasRummer = doesArticleMentionRummer(article.description || '', article.title, article.description || '');
            const hasMarineKeywords = containsMarineKeywords({ 
                title: article.title, 
                content: article.description || '', 
                contentSnippet: article.description || '' 
            } as RSSItem);

            // If RSS content doesn't have keywords, check if it might be marine-related before fetching HTML
            if (!hasRummer && !hasMarineKeywords && article.url) {
                const mightBeMarine = mightBeMarineRelated(article.title, article.description || '');
                
                if (mightBeMarine) {
                    const { hasRummer: hasRummerContent, image } = await checkArticleContent(article.url, article.title);
                    
                    if (hasRummerContent) {
                        // Update article with image if found
                        if (image) {
                            article.image = { url: image, alt: article.title };
                        }
                        return article;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else if (hasRummer) {
                return article;
            } else {
                return null;
            }
        })
    );

    return filteredArticles
        .filter((result): result is PromiseFulfilledResult<MediaItem | null> => 
            result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value!);
});

export const fetchYahooNewsArticles = cache(async (): Promise<MediaItem[]> => {
    const articles = await fetchRSSFeed(
        'https://au.news.yahoo.com/rss',
        'Yahoo News AU',
        (item: RSSItem): boolean => true, // Accept all items initially
        DEFAULT_HEADERS
    );

    // Check each article for keywords, with HTML content checking if needed
    const filteredArticles = await Promise.allSettled(
        articles.map(async (article) => {
            const hasRummer = doesArticleMentionRummer(article.description || '', article.title, article.description || '');
            const hasMarineKeywords = containsMarineKeywords({ 
                title: article.title, 
                content: article.description || '', 
                contentSnippet: article.description || '' 
            } as RSSItem);

            // If RSS content doesn't have keywords, check if it might be marine-related before fetching HTML
            if (!hasRummer && !hasMarineKeywords && article.url) {
                const mightBeMarine = mightBeMarineRelated(article.title, article.description || '');
                
                if (mightBeMarine) {
                    const { hasRummer: hasRummerContent, image } = await checkArticleContent(article.url, article.title);
                    
                    if (hasRummerContent) {
                        // Update article with image if found
                        if (image) {
                            article.image = { url: image, alt: article.title };
                        }
                        return article;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }
            } else if (hasRummer) {
                return article;
            } else {
                return null;
            }
        })
    );

    return filteredArticles
        .filter((result): result is PromiseFulfilledResult<MediaItem | null> => 
            result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value!);
});

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

// New RSS feeds for science communication
export const fetchCosmosMagazineArticles = cache(() =>
    fetchRSSFeed(
        'https://cosmosmagazine.com/feed',
        'Cosmos Magazine',
        item => containsRummer(item), // Only articles mentioning Dr. Rummer
        DEFAULT_HEADERS
    )
);

export const fetchLabDownUnderArticles = cache(() =>
    fetchRSSFeed(
        'https://labdownunder.com/feed',
        'Lab Down Under',
        item => containsRummer(item), // Only articles mentioning Dr. Rummer
        DEFAULT_HEADERS
    )
);

export const fetchItsRocketScienceArticles = cache(() =>
    fetchRSSFeed(
        'https://itsrocketscience.com.au/feed',
        "It's Rocket Science",
        item => containsRummer(item), // Only articles mentioning Dr. Rummer
        DEFAULT_HEADERS
    )
);

// Additional ocean science and conservation RSS feeds
// These sources are highly relevant to Dr. Rummer's research on ocean acidification, marine conservation, and coral reef physiology
export const fetchOceanConservancyArticles = cache(() =>
    fetchRSSFeed(
        'https://oceanconservancy.org/feed',
        'Ocean Conservancy',
        item => containsRummer(item), // Only articles mentioning Dr. Rummer
        DEFAULT_HEADERS
    )
);

export const fetchOceanAcidificationArticles = cache(() =>
    fetchRSSFeed(
        'https://news-oceanacidification-icc.org/category/web-sites-and-blogs/feed/',
        'Ocean Acidification ICC',
        item => containsRummer(item), // Only articles mentioning Dr. Rummer
        DEFAULT_HEADERS
    )
);

export const fetchOceanicSocietyArticles = cache(() =>
    fetchRSSFeed(
        'https://oceanicsociety.org/feed',
        'Oceanic Society',
        item => containsRummer(item), // Only articles mentioning Dr. Rummer
        DEFAULT_HEADERS
    )
);

// Special case handlers
export const fetchNewsAPIArticles = cache(async (): Promise<MediaItem[]> => {
    if (!process.env.NEWS_API_ORG_KEY) {
        logError('NEWS_API_ORG_KEY is not defined in environment variables');
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
            const hasRummer = doesArticleMentionRummer(content, title, description);
            const hasMarineKeywords = containsMarineKeywords(article as RSSItem); // Cast to RSSItem for compatibility
            
            return hasRummer;
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
        logError('Error processing Google News URL', error);
        return url;
    }
}

// Attempt to resolve the final article URL for Google News links by inspecting the HTML
async function resolveGoogleNewsFinalUrl(googleNewsUrl: string): Promise<string> {
    try {
        const response = await fetch(googleNewsUrl, {
            headers: {
                ...DEFAULT_HEADERS,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            },
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!response.ok) {
            return googleNewsUrl;
        }

        const html = await response.text();

        // meta refresh redirect
        const metaRefreshMatch = html.match(/<meta[^>]*http-equiv=["']refresh["'][^>]*content=["'][^"']*url=([^"']+)["'][^>]*>/i);
        if (metaRefreshMatch?.[1]) {
            try {
                return decodeURIComponent(metaRefreshMatch[1]);
            } catch {
                return metaRefreshMatch[1];
            }
        }

        // JS redirect patterns
        const jsRedirectMatch = html.match(/location\.(?:replace|href)\(['"]([^'"]+)['"]\)/i);
        if (jsRedirectMatch?.[1]) {
            return jsRedirectMatch[1];
        }

        // Fallback: first absolute external link that is not a Google domain
        const anchorMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
        for (const anchor of anchorMatches) {
            const hrefMatch = anchor.match(/href=["']([^"']+)["']/i);
            const href = hrefMatch?.[1];
            if (!href) continue;
            if (!/^https?:\/\//i.test(href)) continue;
            try {
                const { hostname } = new URL(href);
                const lowerHost = hostname.toLowerCase();
                const isGoogle = lowerHost.endsWith('google.com') || lowerHost.endsWith('googleusercontent.com') || lowerHost.includes('news.google.com');
                if (!isGoogle) {
                    return href;
                }
            } catch {
                // ignore invalid URLs
            }
        }

        return googleNewsUrl;
    } catch {
        return googleNewsUrl;
    }
}

// Function to check if article might be related to Dr. Rummer's research
function mightBeMarineRelated(title: string, description: string): boolean {
    const text = `${title} ${description}`.toLowerCase();
    
    // Special case: Always allow The Conversation articles to pass through for HTML fetching
    if (text.includes('the conversation')) {
        return true;
    }

    // Terms that might indicate Dr. Rummer's research areas
    const potentialResearchTerms = [
        'shark', 'reef', 'coral', 'ocean', 'marine', 'sea', 'underwater',
        'climate', 'warming', 'acidification', 'ocean acidification', 'ecosystem', 'biology', 'science',
        'research', 'study', 'university', 'jcu', 'james cook', 'great barrier',
        'conservation', 'environment', 'species', 'wildlife', 'aquatic',
        'rummer', 'physiologyfish', 'rummerlab', 'physioshark'
    ];
    
    return potentialResearchTerms.some(term => text.includes(term));
}

// Function to extract image from HTML content
function extractImageFromHtml(html: string, baseUrl: string): string | null {
    try {
        // Look for various image patterns
        const imagePatterns = [
            // Open Graph image (any order of attributes, single or double quotes)
            /<meta[^>]*?(?:property|name)=['\"]og:image['\"][^>]*?content=['\"]([^'\"]+)['\"][^>]*?>/i,
            /<meta[^>]*?content=['\"]([^'\"]+)['\"][^>]*?(?:property|name)=['\"]og:image['\"][^>]*?>/i,
            // Twitter image (including :src)
            /<meta[^>]*?name=['\"]twitter:image(?::src)?['\"][^>]*?content=['\"]([^'\"]+)['\"][^>]*?>/i,
            /<meta[^>]*?content=['\"]([^'\"]+)['\"][^>]*?name=['\"]twitter:image(?::src)?['\"][^>]*?>/i,
            // Schema.org image
            /<meta[^>]*?(?:property|name)=['\"]image['\"][^>]*?content=['\"]([^'\"]+)['\"][^>]*?>/i,
            // The Conversation magazine style background-image (high priority)
            /<div[^>]*class="[^"]*image[^"]*"[^>]*style="[^"]*background-image:\s*url\(([^)]+)\)/i,
            // The Conversation img tag inside image div
            /<div[^>]*class="[^"]*image[^"]*"[^>]*>.*?<img[^>]*src="([^"]+)"/is,
            // Large article images (common patterns)
            /<img[^>]*class="[^"]*hero[^"]*"[^>]*src="([^"]+)"/i,
            /<img[^>]*class="[^"]*featured[^"]*"[^>]*src="([^"]+)"/i,
            /<img[^>]*class="[^"]*article[^"]*"[^>]*src="([^"]+)"/i,
            // First large image in article content
            /<img[^>]*width="[5-9][0-9][0-9]"[^>]*src="([^"]+)"/i,
            /<img[^>]*height="[3-9][0-9][0-9]"[^>]*src="([^"]+)"/i,
            // Any image with reasonable size
            /<img[^>]*src="([^"]+)"[^>]*>/i
        ];

        for (let i = 0; i < imagePatterns.length; i++) {
            const pattern = imagePatterns[i];
            const match = html.match(pattern);
            if (match && match[1]) {
                let imageUrl = match[1];

                // Decode basic HTML entities in URLs
                imageUrl = imageUrl.replace(/&amp;/g, '&');
                
                // Convert relative URLs to absolute
                if (imageUrl.startsWith('/')) {
                    const urlObj = new URL(baseUrl);
                    imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl}`;
                } else if (imageUrl.startsWith('./')) {
                    const urlObj = new URL(baseUrl);
                    imageUrl = `${urlObj.protocol}//${urlObj.host}${imageUrl.substring(1)}`;
                } else if (!imageUrl.startsWith('http')) {
                    const urlObj = new URL(baseUrl);
                    imageUrl = `${urlObj.protocol}//${urlObj.host}/${imageUrl}`;
                }

                // Filter out small images, icons, and common non-article images
                if (imageUrl.includes('logo') || 
                    imageUrl.includes('icon') || 
                    imageUrl.includes('avatar') ||
                    imageUrl.includes('ad') ||
                    imageUrl.includes('banner') ||
                    imageUrl.includes('button') ||
                    imageUrl.includes('googleusercontent.com') ||
                    imageUrl.includes('news.google.com') ||
                    imageUrl.includes('google.com')) {
                    
                    continue;
                }
                
                return imageUrl;
            }
        }

        return null;
    } catch (error) {
        logWarn('Error extracting image from HTML');
        return null;
    }
}

// Function to fetch and check article content
async function checkArticleContent(url: string, title: string): Promise<{ hasRummer: boolean; hasMarineKeywords: boolean; content: string; image?: string }> {
    try {
        const response = await fetch(url, {
            headers: {
                ...DEFAULT_HEADERS,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            next: { revalidate: REVALIDATE_TIME }
        });

        if (!response.ok) {
            logWarn(`Failed to fetch article content for "${title}": ${response.status}`);
            return { hasRummer: false, hasMarineKeywords: false, content: '' };
        }

        const html = await response.text();
        
        // Extract text content from HTML (basic approach)
        const textContent = html
            .replace(/<script[^>]*>.*?<\/script>/gs, '') // Remove scripts
            .replace(/<style[^>]*>.*?<\/style>/gs, '') // Remove styles
            .replace(/<[^>]+>/g, ' ') // Remove HTML tags
            .replace(/\s+/g, ' ') // Normalize whitespace
            .toLowerCase();

        let hasRummer = doesArticleMentionRummer(textContent, title.toLowerCase(), '');
        const hasMarineKeywords = containsMarineKeywords({ 
            title, 
            content: textContent, 
            contentSnippet: '' 
        } as RSSItem);

        // Special handling for The Conversation: detect author meta and twitter creator
        if (!hasRummer && url.includes('theconversation.com')) {
            const authorMetaMatch = html.match(/<meta[^>]*(?:name|property)=["']author["'][^>]*content=["']([^"']+)["']/i);
            const twitterCreatorMatch = html.match(/<meta[^>]*name=["']twitter:creator["'][^>]*content=["']([^"']+)["']/i);
            const authorContent = (authorMetaMatch?.[1] || '').toLowerCase();
            const twitterCreator = (twitterCreatorMatch?.[1] || '').toLowerCase();

            const authorIndicatesRummer = authorContent.includes('rummer') || authorContent.includes('jodie');
            const twitterIndicatesRummer = twitterCreator.includes('physiologyfish') || twitterCreator.includes('jodierummer');

            if (authorIndicatesRummer || twitterIndicatesRummer) {
                hasRummer = true;
            }
        }

        // Extract image from HTML
        const image = extractImageFromHtml(html, url);
        
        return { 
            hasRummer, 
            hasMarineKeywords, 
            content: textContent.substring(0, 200) + '...',
            ...(image && { image })
        };
    } catch (error) {
        logWarn(`Error fetching article content for "${title}"`);
        return { hasRummer: false, hasMarineKeywords: false, content: '' };
    }
}

// Add Google News fetcher
export const fetchGoogleNewsArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            'https://news.google.com/rss/search?q=Jodie+Rummer+OR+Dr+Rummer+OR+RummerLab+OR+Physioshark&hl=en-AU&gl=AU&ceid=AU:en',
            {
                headers: DEFAULT_HEADERS,
                next: { revalidate: REVALIDATE_TIME }
            }
        );

        if (!response.ok) {
            logWarn(`Google News RSS feed returned status: ${response.status}`);
            return [];
        }

        const xmlText = await response.text();
        
        const feed = await parser.parseString(xmlText);

        // Process articles with content checking
        const articlesWithContent = await Promise.allSettled(
            feed.items.map(async (item) => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                const description = (item.contentSnippet || '').toLowerCase();
                
                // First check RSS content
                const hasRummerRSS = doesArticleMentionRummer(content, title, description);
                const hasMarineKeywordsRSS = containsMarineKeywords(item);
                
                // If RSS content doesn't have Dr. Rummer mention, fetch full article
                if (!hasRummerRSS) {
                    const descriptionUrl = item.description?.match(/href="([^"]+)"/)?.[1];
                    const itemUrl = item.link || descriptionUrl || item.guid || '';
                    let fixedUrl = fixGoogleNewsUrl(itemUrl);
                    if (fixedUrl.includes('news.google.com')) {
                        fixedUrl = await resolveGoogleNewsFinalUrl(fixedUrl);
                    }
                    
                    if (fixedUrl && fixedUrl !== 'No URL available') {
                        const { hasRummer, hasMarineKeywords, content: articleContent, image } = await checkArticleContent(fixedUrl, item.title || '');
                        
                        if (hasRummer) {
                            return { item, hasRummer, hasMarineKeywords, fixedUrl, image };
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                } else {
                    const descriptionUrl = item.description?.match(/href="([^"]+)"/)?.[1];
                    const itemUrl = item.link || descriptionUrl || item.guid || '';
                    let fixedUrl = fixGoogleNewsUrl(itemUrl);
                    if (fixedUrl.includes('news.google.com')) {
                        fixedUrl = await resolveGoogleNewsFinalUrl(fixedUrl);
                    }
                    return { item, hasRummer: hasRummerRSS, hasMarineKeywords: false, fixedUrl };
                }
            })
        );

        const articles = await Promise.all(
            articlesWithContent
                .filter(result => result.status === 'fulfilled' && (result as PromiseFulfilledResult<{ item: any; hasRummer: boolean; hasMarineKeywords: boolean; fixedUrl: string; image?: string } | null>).value !== null)
                .map(result => (result as PromiseFulfilledResult<{ item: any; hasRummer: boolean; hasMarineKeywords: boolean; fixedUrl: string; image?: string } | null>).value!)
                .filter(({ hasRummer, hasMarineKeywords }) => hasRummer)
                .map(async ({ item, fixedUrl, image }) => {
                    // Prefer extracted image from the final article HTML over Google News enclosure thumbs
                    let imageUrl: string | undefined = image;

                    // Only use Google enclosure URL if it's not a Google News icon
                    if (!imageUrl && item.enclosure?.url && 
                        !item.enclosure.url.includes('googleusercontent.com') && 
                        !item.enclosure.url.includes('news.google.com') && 
                        !item.enclosure.url.includes('google.com')) {
                        imageUrl = item.enclosure.url;
                    }

                    // If we still don't have an image OR it's a Google proxy thumbnail, fetch the article HTML to extract og:image
                    if (fixedUrl && (!imageUrl || imageUrl.includes('googleusercontent.com'))) {
                        try {
                            const { image: extracted } = await checkArticleContent(fixedUrl, item.title || '');
                            if (extracted) imageUrl = extracted;
                        } catch {
                            // Best-effort only; continue without image if extraction fails
                        }
                    }

                    const mediaItem: MediaItem = {
                        type: 'article',
                        source: 'Google News',
                        title: stripHtml(item.title || ''),
                        description: stripHtml(item.contentSnippet || item.description || ''),
                        url: fixedUrl,
                        date: item.pubDate || new Date().toISOString(),
                        sourceType: 'Other' as const,
                        ...(imageUrl && {
                            image: {
                                url: imageUrl,
                                alt: stripHtml(item.title || '')
                            }
                        })
                    };

                    return mediaItem;
                })
        );

        return articles;
    } catch (error) {
        logError('Error fetching Google News articles', error);
        return [];
    }
});

// Update Guardian article filter
export const fetchGuardianArticles = cache(async (): Promise<MediaItem[]> => {
    const data = await fetchWithRetry<GuardianResponse>(
        `https://content.guardianapis.com/search?q="Rummer"&show-fields=headline,trailText,thumbnail,bodyText&api-key=${process.env.THE_GUARDIAN_API_KEY}`
    );

    if (!data?.response?.results) {
        logWarn('No results found in Guardian response');
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
            
            const hasRummer = doesArticleMentionRummer(bodyText, headline, trailText);
            const isNotBlog = !isBlogExclude;
            
            return hasRummer && isNotBlog;
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

                const hasRummer = doesArticleMentionRummer(content, title, description);
                
                if (hasRummer) {
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
        logError('Error fetching Townsville Bulletin articles', error);
        return [];
    }
});

// Function to prioritize sources and remove duplicates
function prioritizeAndDeduplicateArticles(articles: MediaItem[]): MediaItem[] {
    // Define source priorities (lower number = higher priority)
    const sourcePriorities: Record<string, number> = {
        'The Conversation': 1,
        'The Guardian': 2,
        'Cosmos Magazine': 3,
        'ABC News': 4,
        'Lab Down Under': 5,
        "It's Rocket Science": 6,
        'Ocean Conservancy': 7,
        'Ocean Acidification ICC': 8,
        'Oceanic Society': 9,
        'Google News': 10,
        'NewsAPI': 11,
        'Other': 12
    };

    // Create a map to track articles by title (normalized) and URL
    const articleMap = new Map<string, MediaItem>();
    const titleMap = new Map<string, MediaItem>();

    articles.forEach(article => {
        // Better title normalization that removes source suffixes
        let normalizedTitle = article.title.toLowerCase();
        // Remove trailing "- Source Name" patterns
        normalizedTitle = normalizedTitle.replace(/\s*-\s*[^-]+$/, '');
        normalizedTitle = normalizedTitle.replace(/\s*–\s*[^–]+$/, ''); // en dash
        normalizedTitle = normalizedTitle.replace(/\s*—\s*[^—]+$/, ''); // em dash
        normalizedTitle = normalizedTitle.replace(/[^\w\s]/g, '').trim();
        const url = article.url;
        const sourcePriority = sourcePriorities[article.source] || sourcePriorities['Other'];

        // Check if we already have this article by URL
        if (articleMap.has(url)) {
            const existing = articleMap.get(url)!;
            const existingPriority = sourcePriorities[existing.source] || sourcePriorities['Other'];
            
            // Keep the one with higher priority (lower number)
            if (sourcePriority < existingPriority) {
                articleMap.set(url, article);
                titleMap.set(normalizedTitle, article);
            }
        } else {
            // Check if we have a similar title from a different source
            if (titleMap.has(normalizedTitle)) {
                const existing = titleMap.get(normalizedTitle)!;
                const existingPriority = sourcePriorities[existing.source] || sourcePriorities['Other'];
                
                // Keep the one with higher priority (lower number)
                if (sourcePriority < existingPriority) {
                    articleMap.delete(existing.url);
                    titleMap.set(normalizedTitle, article);
                    articleMap.set(url, article);
                }
            } else {
                // New article, add to both maps
                articleMap.set(url, article);
                titleMap.set(normalizedTitle, article);
            }
        }
    });

    // Convert back to array and sort by priority and date
    const uniqueArticles = Array.from(articleMap.values()).sort((a, b) => {
        const aPriority = sourcePriorities[a.source] || sourcePriorities['Other'];
        const bPriority = sourcePriorities[b.source] || sourcePriorities['Other'];
        
        // First sort by priority
        if (aPriority !== bPriority) {
            return aPriority - bPriority;
        }
        
        // Then sort by date (newest first)
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return uniqueArticles;
}

// Main function to fetch all news
export const fetchAllNews = cache(async (): Promise<MediaItem[]> => {
    // Prioritize sources: The Conversation, Guardian, ABC News first
    const priorityFetchFunctions = [
        fetchConversationArticles,
        fetchGuardianArticles,
        fetchABCNewsArticles,
    ];

    const secondaryFetchFunctions = [
        fetchNewsAPIArticles,
        fetchGoogleNewsArticles,
        fetchYahooNewsArticles,
        fetchScienceDailyArticles,
        fetchNewsComAuArticles,
        fetchABCScienceArticles,
        fetchNewsComAuScienceArticles,
        fetchSMHScienceArticles,
        fetchSBSScienceArticles,
        fetchTownsvilleBulletinArticles,
        fetchCairnsNewsArticles,
        fetchCosmosMagazineArticles,
        fetchLabDownUnderArticles,
        fetchItsRocketScienceArticles,
        fetchOceanConservancyArticles,
        fetchOceanAcidificationArticles,
        fetchOceanicSocietyArticles
    ];

    try {
        // Fetch priority sources first
        const priorityResults = await Promise.allSettled(
            priorityFetchFunctions.map(fn => fn())
        );

        const secondaryResults = await Promise.allSettled(
            secondaryFetchFunctions.map(fn => fn())
        );

        const allResults = [...priorityResults, ...secondaryResults];
        const allFunctions = [...priorityFetchFunctions, ...secondaryFetchFunctions];

        const successfulResults = allResults.filter((result): result is PromiseFulfilledResult<MediaItem[]> => 
            result.status === 'fulfilled'
        );

        const failedSources = allResults
            .map((result, index) => ({ result, source: allFunctions[index].name }))
            .filter(({ result }) => result.status === 'rejected')
            .map(({ source, result }) => {
                if (result.status === 'rejected') {
                    logError(`Failed to fetch from ${source}`, result.reason);
                    return source;
                }
                return null;
            })
            .filter((source): source is string => source !== null);

        if (failedSources.length > 0) {
            logWarn(`Failed to fetch from the following sources: ${failedSources.join(', ')}`);
        }

        const allArticles = successfulResults.flatMap(result => result.value);

        // Use the new prioritization and deduplication function
        const prioritizedArticles = prioritizeAndDeduplicateArticles(allArticles);

        // Keep only the last two years
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
        const recentArticles = prioritizedArticles.filter(article => {
            const articleDate = new Date(article.date);
            return !Number.isNaN(articleDate.getTime()) && articleDate >= twoYearsAgo;
        });

        // Log summary of results
        const articlesWithImages = recentArticles.filter(article => article.image);
        logInfo(`Found ${recentArticles.length} articles (${articlesWithImages.length} with images) from ${successfulResults.length} sources`);

        return recentArticles;
    } catch (error) {
        logError('Error in fetchAllNews', error);
        return [];
    }
}); 
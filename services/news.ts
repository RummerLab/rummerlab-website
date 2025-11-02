import Parser from 'rss-parser';
import { MediaItem, RSSItem } from '@/types/media';
import { cache } from 'react';

// Common constants
const RSS_REVALIDATE_TIME = 7 * 24 * 60 * 60; // 7 days in seconds
const ARTICLE_REVALIDATE_TIME = 30 * 24 * 60 * 60; // 30 days in seconds

// Simple logging function to reduce noise
const logInfo = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`[News Service] ${message}`);
    }
};

const logWarn = (message: string) => {
    console.warn(`[News Service] ${message}`);
};

const logError = (message: string, error?: unknown) => {
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

// Function to extract image from HTML content
// Currently unused but kept for potential future use
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            next: { revalidate: RSS_REVALIDATE_TIME }
        });
        
        if (!response.ok) {
            console.warn(`Fetch failed for ${url} with status: ${response.status}`);
            return null;
        }
        
        const data = await response.json();
        return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        if (retries > 0) {
            console.warn(`Retrying fetch for ${url}, ${retries} attempts remaining`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            return fetchWithRetry(url, options, retries - 1);
        }
        console.error(`Final fetch error for ${url}`);
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
            next: { revalidate: RSS_REVALIDATE_TIME }
        });

        if (!response.ok) {
            console.warn(`${source} RSS feed returned status: ${response.status}`);
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        console.error(`Error fetching ${source} articles`);
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
        'dr jodie rummer',
        'dr. jodie rummer',
        'dr jodie l. rummer',
        'dr. jodie l. rummer',
        'professor rummer',
        'prof rummer',
        'prof jodie rummer',
        'jodie rummer',
        'jodie l. rummer'
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

interface NewsAPIAIResponse {
    articles?: Array<{
        title: string;
        description: string;
        url: string;
        publishedAt: string;
        urlToImage?: string;
        source: {
            name: string;
        };
        content?: string;
    }>;
    error?: string;
}

interface NewsAPIComResponse {
    articles: Array<{
        title: string;
        description: string;
        url: string;
        publishedAt: string;
        urlToImage?: string;
        source: {
            name: string;
        };
        content?: string;
    }>;
}

// Enhanced English detection function to filter out non-English articles
const isLikelyEnglish = (text: string | undefined): boolean => {
    if (!text) return false;
    const isNonEnglish = (text.includes('«') && text.includes('»')) || (text.includes('¿') && text.includes('?'));
    return !isNonEnglish;
};

// Function to check if article might be marine-related based on title/description
function mightBeMarineRelated(title: string, description: string): boolean {
    const text = `${title} ${description}`.toLowerCase();
    
    // Special case: Always allow The Conversation articles to pass through for HTML fetching
    if (text.includes('the conversation')) {
        return true;
    }
    
    // Broader set of terms that might indicate marine/science content
    const potentialMarineTerms = [
        'shark', 'fish', 'reef', 'coral', 'ocean', 'marine', 'sea', 'underwater',
        'climate', 'warming', 'acidification', 'ecosystem', 'biology', 'science',
        'research', 'study', 'university', 'jcu', 'james cook', 'great barrier',
        'conservation', 'environment', 'species', 'wildlife', 'aquatic'
    ];
    
    return potentialMarineTerms.some(term => text.includes(term));
}

// URL validation and sanitization functions
function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

function isAllowedHost(url: string): boolean {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();
        
        // Define allowed hosts
        const allowedHosts = [
            'news.google.com',
            'theconversation.com',
            'theguardian.com',
            'abc.net.au',
            'au.news.yahoo.com',
            'sciencedaily.com',
            'news.com.au',
            'smh.com.au',
            'sbs.com.au',
            'cairnsnews.org',
            'cosmosmagazine.com',
            'oceanographic-magazine.com',
            'labdownunder.com',
            'itsrocketscience.com.au',
            'oceanconservancy.org',
            'news-oceanacidification-icc.org',
            'oceanicsociety.org',
            'forbes.com',
            'townsvillebulletin.com.au'
        ];
        
        return allowedHosts.some(allowedHost => 
            hostname === allowedHost || hostname.endsWith('.' + allowedHost)
        );
    } catch {
        return false;
    }
}

// Function to fix Google News URLs with proper validation
function fixGoogleNewsUrl(url: string): string {
    if (!url || !isValidUrl(url)) return '';
    
    try {
        // Handle Google News redirect URLs
        if (url.includes('news.google.com/rss/articles/')) {
            // Extract the actual URL from the Google News redirect
            const urlMatch = url.match(/url=([^&]+)/);
            if (urlMatch) {
                try {
                    const decodedUrl = decodeURIComponent(urlMatch[1]);
                    return isValidUrl(decodedUrl) && isAllowedHost(decodedUrl) ? decodedUrl : url;
                } catch {
                    // If decoding fails, use the cleaned up version
                    return url.replace('/rss/articles/', '/articles/');
                }
            }
            return url.replace('/rss/articles/', '/articles/');
        }
        
        // Handle relative URLs from Google News
        if (url.startsWith('./')) {
            const fullUrl = `https://news.google.com/${url.slice(2)}`;
            return isValidUrl(fullUrl) ? fullUrl : url;
        }
        if (!url.startsWith('http')) {
            const fullUrl = `https://news.google.com/${url}`;
            return isValidUrl(fullUrl) ? fullUrl : url;
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
        // Validate the URL before processing
        if (!isValidUrl(googleNewsUrl) || !isAllowedHost(googleNewsUrl)) {
            return googleNewsUrl;
        }

        const response = await fetch(googleNewsUrl, {
            headers: {
                ...DEFAULT_HEADERS,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            },
            next: { revalidate: RSS_REVALIDATE_TIME }
        });

        if (!response.ok) {
            return googleNewsUrl;
        }

        const html = await response.text();

        // meta refresh redirect
        const metaRefreshMatch = html.match(/<meta[^>]*http-equiv=["']refresh["'][^>]*content=["'][^"']*url=([^"']+)["'][^>]*>/i);
        if (metaRefreshMatch?.[1]) {
            try {
                const decodedUrl = decodeURIComponent(metaRefreshMatch[1]);
                return isValidUrl(decodedUrl) && isAllowedHost(decodedUrl) ? decodedUrl : googleNewsUrl;
            } catch {
                return metaRefreshMatch[1];
            }
        }

        // JS redirect patterns
        const jsRedirectMatch = html.match(/location\.(?:replace|href)\(['"]([^'"]+)['"]\)/i);
        if (jsRedirectMatch?.[1]) {
            const redirectUrl = jsRedirectMatch[1];
            return isValidUrl(redirectUrl) && isAllowedHost(redirectUrl) ? redirectUrl : googleNewsUrl;
        }

        // Fallback: first absolute external link that is not a Google domain
        const anchorMatches = html.match(/<a[^>]*href=["']([^"']+)["'][^>]*>/gi) || [];
        for (const anchor of anchorMatches) {
            const hrefMatch = anchor.match(/href=["']([^"']+)["']/i);
            const href = hrefMatch?.[1];
            if (!href) continue;
            if (!/^https?:\/\//i.test(href)) continue;
            try {
                if (isValidUrl(href) && isAllowedHost(href)) {
                    const { hostname } = new URL(href);
                    const lowerHost = hostname.toLowerCase();
                    const isGoogle = lowerHost.endsWith('google.com') || lowerHost.endsWith('googleusercontent.com') || lowerHost.includes('news.google.com');
                    if (!isGoogle) {
                        return href;
                    }
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

// Improved HTML sanitization function
function sanitizeHtmlContent(html: string): string {
    // Use a more robust approach to remove HTML tags
    let sanitized = html;
    
    // Remove script tags with case-insensitive matching
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    
    // Remove style tags with case-insensitive matching
    sanitized = sanitized.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
    
    // Remove all remaining HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, ' ');
    
    // Normalize whitespace
    sanitized = sanitized.replace(/\s+/g, ' ');
    
    return sanitized.trim();
}

// Function to extract image from HTML content
function extractImageFromHtml(html: string, baseUrl: string): string | null {
    try {
        // Look for various image patterns - prioritize og:image meta tags
        const imagePatterns = [
            // Open Graph image (highest priority - check first)
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
                    imageUrl.includes('google.com') ||
                    imageUrl.startsWith('data:image/svg+xml') ||
                    imageUrl.includes('placeholder')) {
                    continue;
                }
                
                // Additional validation: ensure we're not returning SVG placeholders
                if (imageUrl.startsWith('data:image/svg+xml') || imageUrl.includes('placeholder')) {
                    continue;
                }

                // Special handling for Oceanographic Magazine: prioritize their image patterns
                if (baseUrl.includes('oceanographic-magazine.com') && imageUrl.includes('oceanographic')) {
                    return imageUrl;
                }
                
                return imageUrl;
            }
        }

        // No image found
        return null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        logWarn('Error extracting image from HTML');
        return null;
    }
}

// Function to fetch and check article content
async function checkArticleContent(url: string, title: string): Promise<{ hasRummer: boolean; hasMarineKeywords: boolean; content: string; image?: string }> {
    try {
        // Validate URL before fetching
        if (!isValidUrl(url) || !isAllowedHost(url)) {
            return { hasRummer: false, hasMarineKeywords: false, content: '' };
        }

        const response = await fetch(url, {
            headers: {
                ...DEFAULT_HEADERS,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            next: { revalidate: ARTICLE_REVALIDATE_TIME }
        });

        if (!response.ok) {
            logWarn(`Failed to fetch article content for "${title}": ${response.status}`);
            return { hasRummer: false, hasMarineKeywords: false, content: '' };
        }

        const html = await response.text();
        
        // Use improved HTML sanitization
        const textContent = sanitizeHtmlContent(html).toLowerCase();

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

        // Special handling for Cosmos Magazine: check for specific article about Dr. Rummer
        if (!hasRummer && url.includes('cosmosmagazine.com')) {
            // Check for specific article about Dr. Rummer's fish physiology career
            if (url.includes('jodie-rummer-fish-physiology') || 
                textContent.includes('jodie rummer') || 
                textContent.includes('dr rummer') ||
                textContent.includes('professor rummer')) {
                hasRummer = true;
            }
        }

        // Special handling for Oceanographic Magazine: check for Dr. Rummer articles
        if (!hasRummer && url.includes('oceanographic-magazine.com')) {
            if (textContent.includes('jodie rummer') || 
                textContent.includes('dr rummer') ||
                textContent.includes('professor rummer') ||
                title.toLowerCase().includes('jodie rummer')) {
                hasRummer = true;
            }
        }

        // Extract image from HTML
        let image = extractImageFromHtml(html, url);
        
        // Special handling for the specific Dr. Rummer Cosmos article
        if (url.includes('cosmosmagazine.com') && url.includes('jodie-rummer-fish-physiology')) {
            // Look specifically for the expected image URL in meta tags
            const expectedImageMatch = html.match(/<meta[^>]*?(?:property|name)=['\"]og:image['\"][^>]*?content=['\"]([^'\"]*Dr\.-Jodie-Rummer-with-blacktip-reef-shark[^'\"]*)['\"][^>]*?>/i);
            if (expectedImageMatch && expectedImageMatch[1]) {
                image = expectedImageMatch[1];
            } else {
                // Fallback: look for the image URL in the HTML content
                const imageUrlMatch = html.match(/https:\/\/cosmosmagazine\.com\/wp-content\/uploads\/[^'\"]*Dr\.-Jodie-Rummer-with-blacktip-reef-shark[^'\"]*\.jpg/);
                if (imageUrlMatch) {
                    image = imageUrlMatch[0];
                }
            }
        }

        // Special handling for Oceanographic Magazine articles
        if (url.includes('oceanographic-magazine.com')) {
            // Look for Oceanographic's specific image patterns
            const oceanographicImageMatch = html.match(/<meta[^>]*?(?:property|name)=['\"]og:image['\"][^>]*?content=['\"]([^'\"]*oceanographic[^'\"]*)['\"][^>]*?>/i);
            if (oceanographicImageMatch && oceanographicImageMatch[1]) {
                image = oceanographicImageMatch[1];
            } else {
                // Fallback: look for Oceanographic's image URLs in the HTML content
                const oceanographicUrlMatch = html.match(/https:\/\/[^'\"]*oceanographic[^'\"]*\.(?:jpg|jpeg|png|webp)/i);
                if (oceanographicUrlMatch) {
                    image = oceanographicUrlMatch[0];
                }
            }
        }
        
        // Log debugging info for Cosmos Magazine articles (reduced logging)
        if (process.env.NODE_ENV === 'development' && url.includes('cosmosmagazine.com')) {
            logInfo(`Cosmos article "${title}": hasRummer=${hasRummer}, image=${image ? 'found' : 'none'}`);
        }

        // Log debugging info for Oceanographic Magazine articles
        if (process.env.NODE_ENV === 'development' && url.includes('oceanographic-magazine.com')) {
            logInfo(`Oceanographic article "${title}": hasRummer=${hasRummer}, image=${image ? 'found' : 'none'}`);
        }
        
        return { 
            hasRummer, 
            hasMarineKeywords, 
            content: textContent.substring(0, 200) + '...',
            ...(image && { image })
        };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        logWarn(`Error fetching article content for "${title}"`);
        return { hasRummer: false, hasMarineKeywords: false, content: '' };
    }
}

export const fetchConversationArticles = cache(async (): Promise<MediaItem[]> => {
    const articles = await fetchRSSFeed(
        'https://theconversation.com/profiles/jodie-l-rummer-711270/articles.atom',
        'The Conversation',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (_item: RSSItem): boolean => true,
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
        (item: RSSItem): boolean => {
            // Return articles that might be marine-related or about Dr. Rummer
            const hasRummer = doesArticleMentionRummer(item.content || '', item.title || '', item.contentSnippet || '');
            const hasMarineKeywords = containsMarineKeywords(item);
            const mightBeMarine = mightBeMarineRelated(item.title || '', item.contentSnippet || '');
            
            return hasRummer || hasMarineKeywords || mightBeMarine;
        },
        DEFAULT_HEADERS
    );

    return articles;
});

export const fetchYahooNewsArticles = cache(async (): Promise<MediaItem[]> => {
    const articles = await fetchRSSFeed(
        'https://au.news.yahoo.com/rss',
        'Yahoo News AU',
        (item: RSSItem): boolean => {
            // Return articles that might be marine-related or about Dr. Rummer
            const hasRummer = doesArticleMentionRummer(item.content || '', item.title || '', item.contentSnippet || '');
            const hasMarineKeywords = containsMarineKeywords(item);
            const mightBeMarine = mightBeMarineRelated(item.title || '', item.contentSnippet || '');
            
            return hasRummer || hasMarineKeywords || mightBeMarine;
        },
        DEFAULT_HEADERS
    );

    return articles;
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
export const fetchCosmosMagazineArticles = cache(async (): Promise<MediaItem[]> => {
    const articles = await fetchRSSFeed(
        'https://cosmosmagazine.com/feed',
        'Cosmos Magazine',
        (item: RSSItem): boolean => {
            // Return articles that might be marine-related or about Dr. Rummer
            const hasRummer = doesArticleMentionRummer(item.content || '', item.title || '', item.contentSnippet || '');
            const hasMarineKeywords = containsMarineKeywords(item);
            const mightBeMarine = mightBeMarineRelated(item.title || '', item.contentSnippet || '');
            
            return hasRummer || hasMarineKeywords || mightBeMarine;
        },
        DEFAULT_HEADERS
    );

    return articles;
});

// Direct Oceanographic Magazine RSS feed
export const fetchOceanographicMagazineArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const articles = await fetchRSSFeed(
            'https://oceanographic-magazine.com/feed/',
            'Oceanographic Magazine',
            (item: RSSItem): boolean => {
                // Return articles that might be marine-related or about Dr. Rummer
                const hasRummer = doesArticleMentionRummer(item.content || '', item.title || '', item.contentSnippet || '');
                const hasMarineKeywords = containsMarineKeywords(item);
                const mightBeMarine = mightBeMarineRelated(item.title || '', item.contentSnippet || '');
                
                return hasRummer || hasMarineKeywords || mightBeMarine;
            },
            DEFAULT_HEADERS
        );

        logInfo(`Oceanographic Magazine RSS: Found ${articles.length} relevant articles`);
        return articles;
    } catch (error) {
        logError('Error fetching Oceanographic Magazine articles', error);
        return [];
    }
});

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

// Forbes RSS feed
export const fetchForbesArticles = cache(async (): Promise<MediaItem[]> => {
    if (process.env.NODE_ENV === 'development') {
        logInfo('Forbes RSS: Starting fetch...');
    }
    
    const articles = await fetchRSSFeed(
        'https://www.forbes.com/feed/',
        'Forbes',
        (item: RSSItem): boolean => {
            // Return articles that might be marine-related or about Dr. Rummer
            const hasRummer = doesArticleMentionRummer(item.content || '', item.title || '', item.contentSnippet || '');
            const hasMarineKeywords = containsMarineKeywords(item);
            const mightBeMarine = mightBeMarineRelated(item.title || '', item.contentSnippet || '');
            
            // Debug logging for Forbes articles
            if (process.env.NODE_ENV === 'development') {
                logInfo(`Forbes RSS: "${item.title}" - hasRummer=${hasRummer}, hasMarineKeywords=${hasMarineKeywords}, mightBeMarine=${mightBeMarine}`);
            }
            
            return hasRummer || hasMarineKeywords || mightBeMarine;
        },
        DEFAULT_HEADERS
    );

    if (process.env.NODE_ENV === 'development') {
        logInfo(`Forbes RSS: Found ${articles.length} relevant articles`);
    }

    return articles;
});

// Special case handlers
export const fetchNewsAPIOrgArticles = cache(async (): Promise<MediaItem[]> => {
    if (!process.env.NEWS_API_ORG_KEY) {
        logError('NEWS_API_ORG_KEY is not defined in environment variables');
        return [];
    }

    // Fetch articles about Dr. Rummer specifically
    const rummerData = await fetchWithRetry<NewsAPIResponse>(
        `https://newsapi.org/v2/everything?q="Rummer"&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_ORG_KEY}`
    );

    // Fetch articles about marine biology and shark research that might be relevant
    const marineData = await fetchWithRetry<NewsAPIResponse>(
        `https://newsapi.org/v2/everything?q="shark research" OR "marine biology" OR "coral reef" OR "ocean acidification" OR "fish physiology" OR "tonic immobility"&language=en&sortBy=publishedAt&apiKey=${process.env.NEWS_API_ORG_KEY}`
    );

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.org: Rummer articles found: ${rummerData?.articles?.length || 0}`);
        logInfo(`NewsAPI.org: Marine articles found: ${marineData?.articles?.length || 0}`);
        
        // Log all Forbes articles from Rummer search
        if (rummerData?.articles) {
            const forbesRummerArticles = rummerData.articles.filter(article => article.source.name === 'Forbes');
            logInfo(`NewsAPI.org: Found ${forbesRummerArticles.length} Forbes articles in Rummer search`);
            forbesRummerArticles.forEach((article, index) => {
                logInfo(`Forbes Rummer ${index + 1}: ${article.title}`);
            });
        }
        
        // Log all Forbes articles for debugging
        if (marineData?.articles) {
            const forbesArticles = marineData.articles.filter(article => article.source.name === 'Forbes');
            logInfo(`NewsAPI.org: Found ${forbesArticles.length} Forbes articles`);
            forbesArticles.forEach((article, index) => {
                logInfo(`Forbes ${index + 1}: ${article.title}`);
            });
        }
    }

    // Combine and deduplicate results
    const allArticles = [
        ...(rummerData?.articles || []),
        ...(marineData?.articles || [])
    ];

    // Remove duplicates based on URL
    const uniqueArticles = allArticles.filter((article, index, self) => 
        index === self.findIndex(a => a.url === article.url)
    );

    //save to file for testing
    //const fs = require('fs');
    //fs.writeFileSync('newsapi.json', JSON.stringify(uniqueArticles, null, 2));

    type NewsAPIArticle = NonNullable<NewsAPIAIResponse['articles']>[number];
    
    const filteredArticles = uniqueArticles
        .filter((article: NewsAPIArticle) => {
            const title = article.title ?? '';
            const description = article.description ?? '';
            const content = `${title} ${description}`.toLowerCase();
            const hasRummer = doesArticleMentionRummer(content, title, description);
            const hasMarineKeywords = containsMarineKeywords(article as RSSItem); // Cast to RSSItem for compatibility
            
            // Debug logging for Forbes articles
            if (article.source.name === 'Forbes' && process.env.NODE_ENV === 'development') {
                logInfo(`Forbes article "${title}": hasRummer=${hasRummer}, hasMarineKeywords=${hasMarineKeywords}`);
            }
            
            // Include articles that mention Dr. Rummer OR are marine-related
            return hasRummer || hasMarineKeywords;
        });

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.org: After filtering: ${filteredArticles.length} articles`);
    }

    return filteredArticles
        .map((article: NewsAPIArticle) => ({
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

// NewsAPI.AI integration
// Note: NewsAPI.AI is currently returning "IsStr()" errors, but we keep it for potential future fixes
export const fetchNewsAPIAIArticles = cache(async (): Promise<MediaItem[]> => {
    if (!process.env.NEWSAPI_AI_KEY) {
        logError('NEWSAPI_AI_KEY is not defined in environment variables');
        return [];
    }

    // Debug: Check if API key is available
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.AI Key available: ${process.env.NEWSAPI_AI_KEY ? 'Yes' : 'No'}`);
    }

    // Fetch articles about Dr. Rummer specifically
    let rummerData: NewsAPIAIResponse | null = null;
    try {
        rummerData = await fetchWithRetry<NewsAPIAIResponse>(
            `https://newsapi.ai/api/v1/article/getArticles?query={"$query":{"keyword":"Jodie Rummer"},"$filter":{"forceMaxDataTimeWindow":"38","hasDuplicate":false,"isDuplicate":false},"$dataType":["news","blog"]}&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${process.env.NEWSAPI_AI_KEY}`
        );
    } catch (error) {
        logWarn(`NewsAPI.AI Rummer query failed: ${error}`);
    }

    // Debug: Log the raw response
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.AI Rummer response: ${JSON.stringify(rummerData, null, 2).substring(0, 500)}...`);
    }

    // Fetch articles about marine biology and shark research
    let marineData: NewsAPIAIResponse | null = null;
    try {
        marineData = await fetchWithRetry<NewsAPIAIResponse>(
            `https://newsapi.ai/api/v1/article/getArticles?query={"$query":{"keyword":"shark research OR marine biology OR coral reef OR ocean acidification OR fish physiology OR tonic immobility OR tonic limp response OR chondrichthyans OR sharks play dead"},"$filter":{"forceMaxDataTimeWindow":"38","hasDuplicate":false,"isDuplicate":false},"$dataType":["news","blog"]}&resultType=articles&articlesSortBy=date&articlesCount=50&articleBodyLen=-1&apiKey=${process.env.NEWSAPI_AI_KEY}`
        );
    } catch (error) {
        logWarn(`NewsAPI.AI Marine query failed: ${error}`);
    }

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.AI: Rummer articles found: ${rummerData?.articles?.length || 0}`);
        logInfo(`NewsAPI.AI: Marine articles found: ${marineData?.articles?.length || 0}`);
        
        // Check for error responses
        if (rummerData?.error) {
            logWarn(`NewsAPI.AI Rummer query error: ${rummerData.error}`);
        }
        if (marineData?.error) {
            logWarn(`NewsAPI.AI Marine query error: ${marineData.error}`);
        }
        
        // Log Forbes articles from NewsAPI.AI
        if (rummerData?.articles) {
            const forbesRummerArticles = rummerData.articles.filter(article => article.source.name === 'Forbes');
            logInfo(`NewsAPI.AI: Found ${forbesRummerArticles.length} Forbes articles in Rummer search`);
            forbesRummerArticles.forEach((article, index) => {
                logInfo(`NewsAPI.AI Forbes Rummer ${index + 1}: ${article.title}`);
            });
        }
        
        if (marineData?.articles) {
            const forbesMarineArticles = marineData.articles.filter(article => article.source.name === 'Forbes');
            logInfo(`NewsAPI.AI: Found ${forbesMarineArticles.length} Forbes articles in marine search`);
            forbesMarineArticles.forEach((article, index) => {
                logInfo(`NewsAPI.AI Forbes Marine ${index + 1}: ${article.title}`);
            });
        }
    }

    // Combine and deduplicate results
    const allArticles = [
        ...(rummerData?.articles || []),
        ...(marineData?.articles || [])
    ];

    // Remove duplicates based on URL
    const uniqueArticles = allArticles.filter((article, index, self) => 
        index === self.findIndex(a => a.url === article.url)
    );

    type NewsAPIArticle = NonNullable<NewsAPIAIResponse['articles']>[number];
    
    return uniqueArticles
        .filter((article: NewsAPIArticle) => {
            const title = article.title ?? '';
            const description = article.description ?? '';
            const content = article.content ?? '';
            const fullContent = `${title} ${description} ${content}`.toLowerCase();
            const hasRummer = doesArticleMentionRummer(fullContent, title, description);
            const hasMarineKeywords = containsMarineKeywords({ 
                title, 
                content: fullContent, 
                contentSnippet: description 
            } as RSSItem);
            
            // Debug logging for Forbes articles
            if (article.source.name === 'Forbes' && process.env.NODE_ENV === 'development') {
                logInfo(`NewsAPI.AI Forbes article "${title}": hasRummer=${hasRummer}, hasMarineKeywords=${hasMarineKeywords}`);
            }
            
            // Include articles that mention Dr. Rummer OR are marine-related
            return hasRummer || hasMarineKeywords;
        })
        .map((article: NewsAPIArticle) => ({
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

// NewsAPI.com integration (thenewsapi.com)
export const fetchNewsAPIComArticles = cache(async (): Promise<MediaItem[]> => {
    if (!process.env.NEWSAPI_COM_KEY) {
        logError('NEWSAPI_COM_KEY is not defined in environment variables');
        return [];
    }

    // Debug: Check if API key is available
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.com Key available: ${process.env.NEWSAPI_COM_KEY ? 'Yes' : 'No'}`);
    }

    // Fetch articles about Dr. Rummer specifically
    const rummerData = await fetchWithRetry<NewsAPIComResponse>(
        `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWSAPI_COM_KEY}&search=Jodie+Rummer&language=en&sort=published_at&limit=50`
    );

    // Fetch articles about marine biology and shark research
    const marineData = await fetchWithRetry<NewsAPIComResponse>(
        `https://api.thenewsapi.com/v1/news/all?api_token=${process.env.NEWSAPI_COM_KEY}&search=Forbes+shark&language=en&sort=published_at&limit=50`
    );

    // Debug logging
    if (process.env.NODE_ENV === 'development') {
        logInfo(`NewsAPI.com: Rummer articles found: ${rummerData?.articles?.length || 0}`);
        logInfo(`NewsAPI.com: Marine articles found: ${marineData?.articles?.length || 0}`);
        
        // Log Forbes articles from NewsAPI.com
        if (rummerData?.articles) {
            const forbesRummerArticles = rummerData.articles.filter(article => article.source.name === 'Forbes');
            logInfo(`NewsAPI.com: Found ${forbesRummerArticles.length} Forbes articles in Rummer search`);
            forbesRummerArticles.forEach((article, index) => {
                logInfo(`NewsAPI.com Forbes Rummer ${index + 1}: ${article.title}`);
            });
        }
        
        if (marineData?.articles) {
            const forbesMarineArticles = marineData.articles.filter(article => article.source.name === 'Forbes');
            logInfo(`NewsAPI.com: Found ${forbesMarineArticles.length} Forbes articles in marine search`);
            forbesMarineArticles.forEach((article, index) => {
                logInfo(`NewsAPI.com Forbes Marine ${index + 1}: ${article.title}`);
            });
        }
    }

    // Combine and deduplicate results
    const allArticles = [
        ...(rummerData?.articles || []),
        ...(marineData?.articles || [])
    ];

    // Remove duplicates based on URL
    const uniqueArticles = allArticles.filter((article, index, self) => 
        index === self.findIndex(a => a.url === article.url)
    );

    type NewsAPIComArticle = NewsAPIComResponse['articles'][number];
    
    return uniqueArticles
        .filter((article: NewsAPIComArticle) => {
            const title = article.title ?? '';
            const description = article.description ?? '';
            const content = article.content ?? '';
            const fullContent = `${title} ${description} ${content}`.toLowerCase();
            const hasRummer = doesArticleMentionRummer(fullContent, title, description);
            const hasMarineKeywords = containsMarineKeywords({ 
                title, 
                content: fullContent, 
                contentSnippet: description 
            } as RSSItem);
            
            // Debug logging for Forbes articles
            if (article.source.name === 'Forbes' && process.env.NODE_ENV === 'development') {
                logInfo(`NewsAPI.com Forbes article "${title}": hasRummer=${hasRummer}, hasMarineKeywords=${hasMarineKeywords}`);
            }
            
            // Include articles that mention Dr. Rummer OR are marine-related
            return hasRummer || hasMarineKeywords;
        })
        .map((article: NewsAPIComArticle) => ({
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

// Add Google News fetcher
export const fetchGoogleNewsArticles = cache(async (): Promise<MediaItem[]> => {
    try {
        const response = await fetch(
            'https://news.google.com/rss/search?q=Jodie+Rummer+OR+Dr+Rummer+OR+RummerLab+OR+Physioshark&hl=en-AU&gl=AU&ceid=AU:en',
            {
                headers: DEFAULT_HEADERS,
                next: { revalidate: RSS_REVALIDATE_TIME }
            }
        );

        if (!response.ok) {
            logWarn(`Google News RSS feed returned status: ${response.status}`);
            return [];
        }

        logInfo(`Google News RSS feed: Starting fetch...`);

        const xmlText = await response.text();
        const feed = await parser.parseString(xmlText);

        // Process articles and fix URLs without fetching HTML content
        const articles = await Promise.allSettled(
            feed.items.map(async (item) => {
                const content = (item.content || '').toLowerCase();
                const title = (item.title || '').toLowerCase();
                const description = (item.contentSnippet || '').toLowerCase();
                
                // Check if article might be relevant
                const hasRummer = doesArticleMentionRummer(content, title, description);
                const hasMarineKeywords = containsMarineKeywords(item);
                const mightBeMarine = mightBeMarineRelated(title, description);
                
                if (hasRummer || hasMarineKeywords || mightBeMarine) {
                    // Fix the URL
                    const descriptionUrl = item.description?.match(/href="([^"]+)"/)?.[1];
                    const itemUrl = item.link || descriptionUrl || item.guid || '';
                    let fixedUrl = fixGoogleNewsUrl(itemUrl);
                    
                    // Only resolve Google News URLs, don't fetch HTML content yet
                    if (fixedUrl.includes('news.google.com')) {
                        try {
                            fixedUrl = await resolveGoogleNewsFinalUrl(fixedUrl);
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        } catch (_error) {
                            logWarn(`Failed to resolve Google News URL: ${fixedUrl}`);
                            // Keep the original URL if resolution fails
                        }
                    }

                    // Check if we have a valid image from RSS
                    let imageUrl: string | undefined;
                    if (item.enclosure?.url && 
                        !item.enclosure.url.includes('googleusercontent.com') && 
                        !item.enclosure.url.includes('news.google.com') && 
                        !item.enclosure.url.includes('google.com')) {
                        imageUrl = item.enclosure.url;
                    }

                    // Extract the actual source name from the title
                    const title = stripHtml(item.title || '');
                    let actualSource = 'Google News';
                    
                    // Look for source name patterns like "- Source Name" or " - Source Name"
                    // Fixed regex to avoid exponential backtracking - simplified pattern
                    const sourceMatch = title.match(/\s*[-–—]\s*([^-–—]+?)$/);
                    if (sourceMatch) {
                        actualSource = sourceMatch[1].trim();
                    }
                    
                    const mediaItem: MediaItem = {
                        type: 'article',
                        source: actualSource,
                        title: title,
                        description: stripHtml(item.contentSnippet || item.description || ''),
                        url: fixedUrl,
                        date: item.pubDate || new Date().toISOString(),
                        sourceType: 'Other' as const,
                        ...(imageUrl && {
                            image: {
                                url: imageUrl,
                                alt: title
                            }
                        })
                    };

                    return mediaItem;
                }
                
                return null;
            })
        );

        const validArticles = articles
            .filter((result): result is PromiseFulfilledResult<MediaItem | null> => 
                result.status === 'fulfilled' && result.value !== null
            )
            .map(result => result.value!);

        logInfo(`Google News RSS feed: Found ${validArticles.length} relevant articles`);
        return validArticles;
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
            next: { revalidate: RSS_REVALIDATE_TIME }
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        console.error('Error fetching Townsville Bulletin articles');
        return [];
    }
});

// Phase 1: Fetch all articles from sources
async function fetchAllArticlesFromSources(): Promise<MediaItem[]> {
    const fetchFunctions = [
        fetchConversationArticles,
        fetchGuardianArticles,
        fetchABCNewsArticles,
        fetchNewsAPIOrgArticles,
        fetchNewsAPIAIArticles,
        fetchNewsAPIComArticles,
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
        fetchOceanographicMagazineArticles,
        fetchForbesArticles,
        fetchLabDownUnderArticles,
        fetchItsRocketScienceArticles,
        fetchOceanConservancyArticles,
        fetchOceanAcidificationArticles,
        fetchOceanicSocietyArticles
    ];

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
                logError(`Failed to fetch from ${source}`, result.reason);
                return source;
            }
            return null;
        })
        .filter((source): source is string => source !== null);

    if (failedSources.length > 0) {
        logWarn(`Failed to fetch from: ${failedSources.join(', ')}`);
    }

    const allArticles = successfulResults.flatMap(result => result.value);
    logInfo(`Phase 1: Fetched ${allArticles.length} articles from ${successfulResults.length} sources`);
    
    return allArticles;
}

// Phase 2: Deduplicate and prioritize articles
function deduplicateAndPrioritizeArticles(articles: MediaItem[]): MediaItem[] {
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
        'Oceanographic Magazine': 10,
        'Google News': 11,
        'NewsAPI': 12,
        'Other': 13
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

    logInfo(`Phase 2: Deduplicated to ${uniqueArticles.length} articles`);
    return uniqueArticles;
}

// Phase 3: Verify content for uncertain articles
async function verifyArticleContent(articles: MediaItem[]): Promise<MediaItem[]> {
    const verifiedArticles: MediaItem[] = [];
    const uncertainArticles: MediaItem[] = [];

    // Separate articles into certain and uncertain
    articles.forEach(article => {
        const hasRummer = doesArticleMentionRummer(
            article.description || '', 
            article.title, 
            article.description || ''
        );
        
        if (hasRummer) {
            verifiedArticles.push(article);
        } else {
            uncertainArticles.push(article);
        }
    });

    logInfo(`Phase 3: ${verifiedArticles.length} certain articles, ${uncertainArticles.length} uncertain articles`);

    // Check uncertain articles by fetching their HTML content (with rate limiting)
    const verificationResults = await Promise.allSettled(
        uncertainArticles.map(async (article, index) => {
            try {
                // Add delay to prevent rate limiting (200ms between requests)
                if (index > 0) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                
                const { hasRummer } = await checkArticleContent(article.url, article.title);
                return hasRummer ? article : null;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error) {
                logWarn(`Failed to verify article: ${article.title}`);
                return null;
            }
        })
    );

    const verifiedUncertainArticles = verificationResults
        .filter((result): result is PromiseFulfilledResult<MediaItem | null> => 
            result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value!);

    const finalArticles = [...verifiedArticles, ...verifiedUncertainArticles];
    logInfo(`Phase 3: Verified ${finalArticles.length} total articles`);
    
    return finalArticles;
}

// Phase 4: Extract images for articles without thumbnails
async function extractMissingImages(articles: MediaItem[]): Promise<MediaItem[]> {
    const articlesWithoutImages = articles.filter(article => !article.image);
    const articlesWithImages = articles.filter(article => article.image);

    logInfo(`Phase 4: ${articlesWithImages.length} articles with images, ${articlesWithoutImages.length} without images`);

    // Extract images for articles that don't have them (with rate limiting)
    const imageExtractionResults = await Promise.allSettled(
        articlesWithoutImages.map(async (article, index) => {
            try {
                // Add delay to prevent rate limiting (200ms between requests)
                if (index > 0) {
                    await new Promise(resolve => setTimeout(resolve, 200));
                }
                
                const { image } = await checkArticleContent(article.url, article.title);
                if (image) {
                    article.image = { url: image, alt: article.title };
                }
                return article;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_error) {
                logWarn(`Failed to extract image for: ${article.title}`);
                return article;
            }
        })
    );

    const processedArticles = imageExtractionResults
        .filter((result): result is PromiseFulfilledResult<MediaItem> => 
            result.status === 'fulfilled'
        )
        .map(result => result.value);

    const finalArticles = [...articlesWithImages, ...processedArticles];
    const articlesWithImagesAfter = finalArticles.filter(article => article.image);
    
    logInfo(`Phase 4: ${articlesWithImagesAfter.length} articles now have images`);
    
    return finalArticles;
}

// Main function to fetch all news
export const fetchAllNews = cache(async (): Promise<MediaItem[]> => {
    try {
        // Phase 1: Fetch all articles from sources
        const allArticles = await fetchAllArticlesFromSources();
        
        // Phase 2: Deduplicate and prioritize
        const deduplicatedArticles = deduplicateAndPrioritizeArticles(allArticles);
        
        // Phase 3: Verify content for uncertain articles
        const verifiedArticles = await verifyArticleContent(deduplicatedArticles);
        
        // Phase 4: Extract images for articles without thumbnails
        const articlesWithImages = await extractMissingImages(verifiedArticles);
        
        // Use all articles (no date filtering)
        const finalArticles = articlesWithImages;
        
        // Log articles count
        if (process.env.NODE_ENV === 'development') {
            logInfo(`Total articles: ${finalArticles.length} articles`);
        }

        logInfo(`Final result: ${finalArticles.length} articles from ${verifiedArticles.length} sources`);
        
        // Log the final articles for debugging
        if (process.env.NODE_ENV === 'development') {
            logInfo(`Final articles: ${finalArticles.length} articles`);
        }
        
        return finalArticles;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
        console.error('Error in fetchAllNews');
        return [];
    }
});

 
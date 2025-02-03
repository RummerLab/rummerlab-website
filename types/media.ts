export interface MediaItem {
    type: 'article' | 'interview' | 'podcast' | 'press';
    source: string;
    title: string;
    description: string;
    url: string;
    date: string;
    sourceType: 'The Conversation' | 'ABC News' | 'CNN' | 'Science Podcast' | 'Research Highlight' | 'The Guardian' | 'Other';
    image?: {
        url: string;
        alt: string;
    };
}

export interface RSSItem {
    title?: string;
    contentSnippet?: string;
    link?: string;
    pubDate?: string;
    content?: string;
    enclosure?: {
        url?: string;
        type?: string;
    };
    'media:content'?: {
        $: {
            url: string;
            type: string;
        };
    };
} 
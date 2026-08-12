export type MediaSourceType =
    | 'The Conversation'
    | 'ABC News'
    | 'CNN'
    | 'Science Podcast'
    | 'Research Highlight'
    | 'The Guardian'
    | 'Other';

export interface MediaSource {
    name: string;
    url?: string;
    sourceType?: MediaSourceType;
    title?: string;
}

export interface MediaItem {
    type: 'article' | 'interview' | 'podcast' | 'press';
    source: string;
    title: string;
    description: string;
    url?: string;
    date: string;
    sourceType: MediaSourceType;
    sources?: MediaSource[];
    image?: {
        url: string;
        alt: string;
    };
}

export const getMediaSources = (item: MediaItem): MediaSource[] => {
    const primary: MediaSource = {
        name: item.source,
        url: item.url,
        sourceType: item.sourceType,
        title: item.title,
    };

    return [primary, ...(item.sources ?? [])];
};

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

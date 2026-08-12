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

    const outlets = [primary, ...(item.sources ?? [])];
    const seenExact = new Set<string>();
    const seenNames = new Set<string>();

    // Keep same-name outlets when they have distinct URLs (e.g. Conversation language editions).
    // Drop duplicates that only repeat the outlet name without a new link.
    return outlets.filter((outlet) => {
        const url = outlet.url?.trim() || '';
        const exactKey = `${outlet.name}::${url}`;

        if (seenExact.has(exactKey)) {
            return false;
        }

        if (!url && seenNames.has(outlet.name)) {
            return false;
        }

        seenExact.add(exactKey);
        seenNames.add(outlet.name);
        return true;
    });
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

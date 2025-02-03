interface MediaItem {
    type: 'article' | 'interview' | 'podcast' | 'press';
    source: string;
    title: string;
    description: string;
    url: string;
    date: string;
    sourceType: 'The Conversation' | 'ABC News' | 'CNN' | 'Science Podcast' | 'Research Highlight' | 'Other';
}

export const mediaItems: MediaItem[] = [
    {
        type: 'article',
        source: 'The Conversation',
        title: 'How fish can still be part of a more sustainable food future',
        description: 'Exploring sustainable fishing practices and the future of marine food sources.',
        url: 'https://theconversation.com/profiles/jodie-rummer-98570/articles',
        date: '2024-01-15',
        sourceType: 'The Conversation'
    },
    {
        type: 'interview',
        source: 'ABC News',
        title: 'Climate Change Impact on Great Barrier Reef Fish',
        description: 'Discussion on how rising ocean temperatures affect fish populations in the Great Barrier Reef.',
        url: 'https://www.abc.net.au/news/',
        date: '2023-12-10',
        sourceType: 'ABC News'
    },
    {
        type: 'podcast',
        source: 'Science Friday',
        title: 'Marine Science and Conservation',
        description: 'Discussion on latest research findings and conservation efforts in marine biology.',
        url: 'https://www.sciencefriday.com/',
        date: '2023-11-20',
        sourceType: 'Science Podcast'
    },
    {
        type: 'press',
        source: 'JCU News',
        title: 'New Findings on Shark Nursery Habitats',
        description: 'Latest research findings on shark nursery habitats in Moorea, French Polynesia.',
        url: 'https://www.jcu.edu.au/news',
        date: '2023-10-05',
        sourceType: 'Research Highlight'
    }
];

// Group media items by type
export const getMediaByType = (type: MediaItem['type']) => {
    return mediaItems.filter(item => item.type === type);
};

// Get featured media (most recent items)
export const getFeaturedMedia = (count: number = 3) => {
    return mediaItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, count);
}; 
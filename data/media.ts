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
    },
    {
        type: 'article',
        source: 'ABC News',
        title: 'Highest number of January shark attacks in NSW for a decade, according to national database',
        description: 'Jodie Rummer, a marine biology professor at James Cook University, says the recent spate of attacks "is even shocking to me".',
        url: 'https://www.abc.net.au/news/2026-01-21/shark-attack-numbers-in-nsw-australian-shark-incident-database/106249078',
        date: '2026-01-21',
        sourceType: 'ABC News'
    },
    {
        type: 'article',
        source: 'Phys.org',
        title: 'Walking sharks break biology reproduction rules',
        description: "JCU's shark physiology research team, led by Professor Jodie Rummer, finds that walking sharks can reproduce and lay eggs without any measurable rise in energy use.",
        url: 'https://phys.org/news/2026-01-sharks-biology-reproduction.html',
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: 'Australasian Leisure Management Magazine',
        title: 'NSW shark incidents highlight challenges for Coastal Safety, Risk Communication and Beach Management',
        description: 'Professor Rummer highlighted "It is important to frame these as shark–human interactions rather than deliberate attacks. Sharks do not target people."',
        url: 'https://www.ausleisure.com.au/news/nsw-shark-incidents-highlight-challenges-for-coastal-safety-risk-communication-and-beach-management',
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: 'Tech Explorist',
        title: 'Walking sharks break the rules of reproductive energy costs',
        description: 'Research by Professor Jodie Rummer assessing the metabolic and physiological costs of oviparity in the epaulette shark (Hemiscyllium ocellatum).',
        url: 'https://www.techexplorist.com/walking-sharks-break-rules-reproductive-energy-costs/101872/',
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: 'Green Matters',
        title: "These Walking Sharks Defy Biology's Reproduction Rules, Scientists Reveal",
        description: "Professor Rummer, who led James Cook University's shark physiology research team, said there was no uptick in energy use during reproduction.",
        url: 'https://www.greenmatters.com/pn/these-walking-sharks-defy-biologys-reproduction-rules-scientists-reveal',
        date: '2026-01-21',
        sourceType: 'Other'
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
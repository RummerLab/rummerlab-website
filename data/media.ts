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
        source: "The Conversation",
        title: "How fish can still be part of a more sustainable food future",
        description: "Exploring sustainable fishing practices and the future of marine food sources.",
        url: "https://theconversation.com/profiles/jodie-rummer-98570/articles",
        date: '2024-01-15',
        sourceType: 'The Conversation'
    },
    {
        type: 'interview',
        source: "ABC News",
        title: "Climate Change Impact on Great Barrier Reef Fish",
        description: "Discussion on how rising ocean temperatures affect fish populations in the Great Barrier Reef.",
        url: "https://www.abc.net.au/news/",
        date: '2023-12-10',
        sourceType: 'ABC News'
    },
    {
        type: 'podcast',
        source: "Science Friday",
        title: "Marine Science and Conservation",
        description: "Discussion on latest research findings and conservation efforts in marine biology.",
        url: "https://www.sciencefriday.com/",
        date: '2023-11-20',
        sourceType: 'Science Podcast'
    },
    {
        type: 'press',
        source: "JCU News",
        title: "New Findings on Shark Nursery Habitats",
        description: "Latest research findings on shark nursery habitats in Moorea, French Polynesia.",
        url: "https://www.jcu.edu.au/news",
        date: '2023-10-05',
        sourceType: 'Research Highlight'
    },
    {
        type: 'article',
        source: "ABC News",
        title: "Highest number of January shark attacks in NSW for a decade, according to national database",
        description: "Jodie Rummer, a marine biology professor at James Cook University, says the recent spate of attacks \"is even shocking to me\".",
        url: "https://www.abc.net.au/news/2026-01-21/shark-attack-numbers-in-nsw-australian-shark-incident-database/106249078",
        date: '2026-01-21',
        sourceType: 'ABC News'
    },
    {
        type: 'article',
        source: "Phys.org",
        title: "Walking sharks break biology reproduction rules",
        description: "JCU's shark physiology research team, led by Professor Jodie Rummer, finds that walking sharks can reproduce and lay eggs without any measurable rise in energy use.",
        url: "https://phys.org/news/2026-01-sharks-biology-reproduction.html",
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Australasian Leisure Management Magazine",
        title: "NSW shark incidents highlight challenges for Coastal Safety, Risk Communication and Beach Management",
        description: "Professor Rummer highlighted \"It is important to frame these as shark–human interactions rather than deliberate attacks. Sharks do not target people.\"",
        url: "https://www.ausleisure.com.au/news/nsw-shark-incidents-highlight-challenges-for-coastal-safety-risk-communication-and-beach-management",
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Tech Explorist",
        title: "Walking sharks break the rules of reproductive energy costs",
        description: "Research by Professor Jodie Rummer assessing the metabolic and physiological costs of oviparity in the epaulette shark (Hemiscyllium ocellatum).",
        url: "https://www.techexplorist.com/walking-sharks-break-rules-reproductive-energy-costs/101872/",
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Green Matters",
        title: "These Walking Sharks Defy Biology's Reproduction Rules, Scientists Reveal",
        description: "Professor Rummer, who led James Cook University's shark physiology research team, said there was no uptick in energy use during reproduction.",
        url: "https://www.greenmatters.com/pn/these-walking-sharks-defy-biologys-reproduction-rules-scientists-reveal",
        date: '2026-01-21',
        sourceType: 'Other'
    },
    {
        type: 'podcast',
        source: "Where The Ocean Meets",
        title: "Climate Change is Destroying the Great Barrier Reef | Here's Why",
        description: "There's a short interactive quiz built into this episode—take a moment to test your knowledge about fish physiology. Witness firsthand the devastating impact of 31-degree water temperatures as Dr. Jodie Rummer describes the beginning of coral bleaching on the Great Barrier Reef. This episode dives into the physiology of the climate crisis—VO2 max, heart rate, oxygen levels, and how fish adapt when the ocean gets too hot—and what it means for the future of ocean life.",
        url: "https://www.youtube.com/watch?v=uD67tHh3RWA",
        date: '2026-02-26',
        sourceType: 'Science Podcast'
    },
    {
        type: 'article',
        source: "Cairns Post",
        title: "Cairns Post coverage",
        description: "Media coverage featuring Dr. Jodie Rummer",
        url: "",
        date: '2026-01-16',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Cairns Post",
        title: "Far North Qld shark attack victim at Hull Heads identified as Michael Jensz",
        description: "Professor Jodie Rummer said shark management needs to be evidence-based, not driven by fear or retaliation, after the fatal Hull Heads shark attack.",
        url: "https://www.cairnspost.com.au/news/cassowary-coast/far-north-qld-shark-attack-victim-at-hull-heads-identified-as-michael-jensz/news-story/17a46d4315b000c949c1a45c73b14bbf",
        date: '2026-05-25',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "news.com.au",
        title: "Bob Katter calls for shark culling after horror attack leaves Cairns spearfisherman dead",
        description: "Jodie Rummer said there is no scientifically robust justification for shark culling after the fatal Hull Heads shark-human interaction.",
        url: "https://www.news.com.au/travel/travel-updates/incidents/bob-katter-calls-for-shark-culling-after-horror-attack-leaves-cairns-spearfisherman-dead/news-story/56ecba20db4aacb882e84930e8df0d33",
        date: '2026-05-25',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "ABC News",
        title: "Death of Michael Jensz in Qld shark attack brings dangers of spearfishing 'close to home'",
        description: "Jodie Rummer disputed claims that shark numbers are increasing and said culling is not a solution after the fatal Far North Queensland spearfishing incident.",
        url: "https://www.abc.net.au/news/2026-05-25/queensland-spearfisher-shark-attack-victim-identified/106718104",
        date: '2026-05-25',
        sourceType: 'ABC News'
    },
    {
        type: 'article',
        source: "WEB OZ Arab Media",
        title: "Shark Attack Claims Life of Queensland Spearfisher",
        description: "Online coverage of the Michael Jensz shark fatality, part of the JCU media monitoring summary that also tracked Jodie Rummer's comments on evidence-based shark management.",
        url: "",
        date: '2026-05-25',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "This is Money",
        title: "Pictured: Spearfisher tragically killed in horrific shark attack near Queensland's Great Barrier Reef",
        description: "Syndicated online coverage of the Kennedy Shoal spearfishing fatality included in the JCU media monitoring summary alongside Jodie Rummer's shark-management commentary.",
        url: "",
        date: '2026-05-25',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Daily Mail Australia",
        title: "Pictured: Spearfisher tragically killed in horrific shark attack on Queensland's Great Barrier Reef",
        description: "Daily Mail Australia coverage of the Michael Jensz shark fatality included in the JCU online media summary alongside Jodie Rummer's shark-management commentary.",
        url: "",
        date: '2026-05-25',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "DIVE Magazine",
        title: "Great Barrier Reef spearfisher killed by shark bite",
        description: "DIVE Magazine cited Jodie Rummer on evidence around shark-culling programmes after the fatal Kennedy Shoal spearfishing incident.",
        url: "https://divemagazine.com/scuba-diving-news/great-barrier-reef-spearfisher-killed-by-shark-bite",
        date: '2026-05-27',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Courier Mail",
        title: "Shark victim an action man",
        description: "Print coverage of the Michael Jensz shark fatality quoting Jodie Rummer on evidence-based shark management and shark-human interactions.",
        url: "",
        date: '2026-05-26',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Cairns Post",
        title: "DIED WITH MATES",
        description: "Print coverage of the Hull Heads shark fatality quoting Jodie Rummer on shark behaviour, shark-human interactions, and evidence-based management.",
        url: "",
        date: '2026-05-26',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Townsville Bulletin",
        title: "Cairns man identified as shark attack victim",
        description: "Print coverage of the Kennedy Shoal shark fatality quoting Jodie Rummer on bull sharks, seasonal shark activity, and evidence-based shark management.",
        url: "",
        date: '2026-05-26',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Discover Wildlife",
        title: "Walking sharks found off Australian coast",
        description: "\"Walking sharks\" found off Australian coast. A closer look reveals extraordinary new discovery about epaulette shark reproduction.",
        url: "https://www.discoverwildlife.com/animal-facts/marine-animals/epaulette-shark-reproduction",
        date: '2026-01-15',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "ABC News",
        title: "Captive epaulette sharks lay eggs using no extra energy, JCU research finds",
        description: "Captive epaulette sharks lay eggs using no extra energy, JCU research finds",
        url: "https://www.abc.net.au/news/2026-01-16/captive-epaulette-sharks-make-lay-eggs-using-no-extra-energy-jcu/106231990",
        date: '2026-01-16',
        sourceType: 'ABC News'
    },
    {
        type: 'article',
        source: "ABC News",
        title: "Epaulette sharks are breaking the rules of biology",
        description: "Epaulette sharks are breaking the rules of biology",
        url: "https://www.abc.net.au/news/2026-01-16/epaulette-sharks-are-breaking-the-rules-of-biology/106229708",
        date: '2026-01-16',
        sourceType: 'ABC News'
    },
    {
        type: 'article',
        source: "The Conversation",
        title: "Sharks freeze when you turn them upside down – and there's no good reason why",
        description: "Research explores tonic immobility in sharks, rays and their relatives.",
        url: "https://theconversation.com/sharks-freeze-when-you-turn-them-upside-down-and-theres-no-good-reason-why-259448",
        date: '2025-06-23',
        sourceType: 'The Conversation'
    },
    {
        type: 'article',
        source: "Oceanographic Magazine",
        title: "Epaulette shark research in Oceanographic Magazine",
        description: "Feature coverage of RummerLab epaulette shark research highlighting the team's long-running work on climate change, reef sharks, and accessible ocean science.",
        url: "https://oceanographicmagazine.com/",
        date: '2021-10-22',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Sydney Morning Herald",
        title: "Science trails the tales of city's bull sharks",
        description: "Syndicated coverage quoting Jodie Rummer on warming waters, bull shark movements, and the importance of healthy shark populations in healthy marine ecosystems.",
        url: "",
        date: '2024-02-01',
        sourceType: 'Other'
    },
    {
        type: 'article',
        source: "Brisbane Times / SMH / The Age / WA Today",
        title: "Shark diaries: Where did Lucy, Bruce and Paulie the bull sharks go this week?",
        description: "Online syndicated coverage quoting Jodie Rummer on bull shark migration, warm Sydney waters, and shark conservation.",
        url: "",
        date: '2024-01-31',
        sourceType: 'Other'
    },
    {
        type: 'interview',
        source: "ABC Radio Queensland",
        title: "Professor Jodie Rummer on Cyclone Kirrily and reef climate impacts",
        description: "ABC Radio Queensland interview discussing Cyclone Kirrily, climate impacts, and the Great Barrier Reef.",
        url: "https://www.youtube.com/watch?v=G0Khf32LHEQ",
        date: '2024-01-31',
        sourceType: 'ABC News'
    },
    {
        type: 'interview',
        source: "WIN News",
        title: "Coral reefs and conference coverage featuring Dr Jodie Rummer",
        description: "Regional WIN News coverage from the Australian Coral Reef Society conference in Townsville, featuring Jodie Rummer as ACRS President on coral reefs and climate action.",
        url: "",
        date: '2025-09-17',
        sourceType: 'Other'
    },
    {
        type: 'interview',
        source: "ABC Radio Queensland",
        title: "Professor Jodie Rummer on ocean warming and the Great Barrier Reef",
        description: "ABC Queensland statewide radio interview giving the Copernicus report a Queensland perspective, with a focus on oceans, the Reef, emissions cuts, and the limits of adaptation alone.",
        url: "",
        date: '2026-01-15',
        sourceType: 'ABC News'
    },
    {
        type: 'interview',
        source: "ABC Radio Queensland",
        title: "Dr Jodie Rummer warns shark culling will not address risks",
        description: "ABC radio coverage after the fatal Kennedy Shoal shark incident, quoting Jodie Rummer on using science to protect people and sharks rather than relying on culling.",
        url: "",
        date: '2026-05-26',
        sourceType: 'ABC News'
    },
    {
        type: 'interview',
        source: "ABC Far North",
        title: "Dr Jodie Rummer discusses shark populations and culling on Breakfast",
        description: "ABC Far North Breakfast interview discussing shark population complexity, depleted shark populations, human-shark interactions, and why culling does not address the underlying risks.",
        url: "",
        date: '2026-05-26',
        sourceType: 'ABC News'
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

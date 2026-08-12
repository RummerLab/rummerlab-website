export interface SourceTagColors {
  bgColor: string;
  textColor: string;
}

const GREY: SourceTagColors = {
  bgColor: "bg-gray-100 dark:bg-gray-700",
  textColor: "text-gray-700 dark:text-gray-200",
};

/** Soft brand-inspired palettes for major / quality outlets. Unknown names fall back to grey. */
const OUTLET_COLORS: Record<string, SourceTagColors> = {
  // ABC family
  "ABC News": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },
  "ABC Far North": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },
  "ABC Gold Coast": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },
  "ABC North Queensland": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },
  "ABC Radio": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },
  "ABC Radio Queensland": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },
  "ABC Tropical North": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-800 dark:text-blue-200",
  },

  // National / broadsheet
  "The Conversation": {
    bgColor: "bg-rose-100 dark:bg-rose-900",
    textColor: "text-rose-800 dark:text-rose-200",
  },
  "The Guardian": {
    bgColor: "bg-indigo-100 dark:bg-indigo-900",
    textColor: "text-indigo-900 dark:text-indigo-200",
  },
  "The Age": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-900 dark:text-sky-200",
  },
  "Sydney Morning Herald": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-900 dark:text-sky-200",
  },
  "Brisbane Times": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-900 dark:text-sky-200",
  },
  "WA Today": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-900 dark:text-sky-200",
  },
  "The Australian": {
    bgColor: "bg-blue-200 dark:bg-blue-950",
    textColor: "text-blue-950 dark:text-blue-100",
  },
  "The Independent": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "RNZ": {
    bgColor: "bg-cyan-100 dark:bg-cyan-900",
    textColor: "text-cyan-900 dark:text-cyan-200",
  },

  // TV / broadcast
  "9News": {
    bgColor: "bg-amber-100 dark:bg-amber-900",
    textColor: "text-amber-900 dark:text-amber-200",
  },
  "WIN News": {
    bgColor: "bg-violet-100 dark:bg-violet-900",
    textColor: "text-violet-800 dark:text-violet-200",
  },
  "WIN News Central Queensland": {
    bgColor: "bg-violet-100 dark:bg-violet-900",
    textColor: "text-violet-800 dark:text-violet-200",
  },
  "WIN News Darling Downs": {
    bgColor: "bg-violet-100 dark:bg-violet-900",
    textColor: "text-violet-800 dark:text-violet-200",
  },
  "WGBH": {
    bgColor: "bg-fuchsia-100 dark:bg-fuchsia-900",
    textColor: "text-fuchsia-800 dark:text-fuchsia-200",
  },
  "Science Friday": {
    bgColor: "bg-fuchsia-100 dark:bg-fuchsia-900",
    textColor: "text-fuchsia-800 dark:text-fuchsia-200",
  },

  // News Corp / metro tabloids
  "news.com.au": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Herald Sun": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "The Courier Mail": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Daily Telegraph": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Adelaide Now": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "PerthNow": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Geelong Advertiser": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Gold Coast Bulletin": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "The Mercury": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Townsville Bulletin": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Cairns Post": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Northern Territory News": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Weekly Times Now": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "Toowoomba Chronicle": {
    bgColor: "bg-red-100 dark:bg-red-900",
    textColor: "text-red-800 dark:text-red-200",
  },
  "West Australian": {
    bgColor: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-900 dark:text-orange-200",
  },
  "Daily Mail Australia": {
    bgColor: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-900 dark:text-blue-200",
  },
  "This is Money": {
    bgColor: "bg-blue-100 dark:bg-blue-950",
    textColor: "text-blue-900 dark:text-blue-200",
  },

  // Science / research
  Nature: {
    bgColor: "bg-red-100 dark:bg-red-950",
    textColor: "text-red-900 dark:text-red-200",
  },
  "Phys.org": {
    bgColor: "bg-violet-100 dark:bg-violet-900",
    textColor: "text-violet-800 dark:text-violet-200",
  },
  ScienceDaily: {
    bgColor: "bg-cyan-100 dark:bg-cyan-900",
    textColor: "text-cyan-900 dark:text-cyan-200",
  },
  ScienceDirect: {
    bgColor: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-900 dark:text-orange-200",
  },
  "Frontiers in Fish Science": {
    bgColor: "bg-teal-100 dark:bg-teal-900",
    textColor: "text-teal-900 dark:text-teal-200",
  },
  "Marine Pollution Bulletin": {
    bgColor: "bg-teal-100 dark:bg-teal-900",
    textColor: "text-teal-900 dark:text-teal-200",
  },
  "Cosmos Magazine": {
    bgColor: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-800 dark:text-purple-200",
  },
  "Oceanographic Magazine": {
    bgColor: "bg-teal-100 dark:bg-teal-900",
    textColor: "text-teal-800 dark:text-teal-200",
  },
  IFLScience: {
    bgColor: "bg-pink-100 dark:bg-pink-900",
    textColor: "text-pink-800 dark:text-pink-200",
  },
  "Popular Science": {
    bgColor: "bg-yellow-100 dark:bg-yellow-900",
    textColor: "text-yellow-900 dark:text-yellow-200",
  },
  "Popular Mechanics": {
    bgColor: "bg-orange-100 dark:bg-orange-900",
    textColor: "text-orange-900 dark:text-orange-200",
  },
  Forbes: {
    bgColor: "bg-emerald-100 dark:bg-emerald-900",
    textColor: "text-emerald-900 dark:text-emerald-200",
  },
  "Discover Wildlife": {
    bgColor: "bg-lime-100 dark:bg-lime-900",
    textColor: "text-lime-900 dark:text-lime-200",
  },
  "Green Matters": {
    bgColor: "bg-green-100 dark:bg-green-900",
    textColor: "text-green-800 dark:text-green-200",
  },
  "DIVE Magazine": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-800 dark:text-sky-200",
  },

  // Universities / institutions
  "James Cook University": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-900 dark:text-blue-200",
  },
  "JCU News": {
    bgColor: "bg-blue-100 dark:bg-blue-900",
    textColor: "text-blue-900 dark:text-blue-200",
  },
  "Australian Marine Conservation Society": {
    bgColor: "bg-teal-100 dark:bg-teal-900",
    textColor: "text-teal-900 dark:text-teal-200",
  },

  // Aggregators / lifestyle
  "Yahoo News Australia": {
    bgColor: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-800 dark:text-purple-200",
  },
  "Yahoo Lifestyle Australia": {
    bgColor: "bg-purple-100 dark:bg-purple-900",
    textColor: "text-purple-800 dark:text-purple-200",
  },
  "MSN Australia": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-800 dark:text-sky-200",
  },
  "MSN UK": {
    bgColor: "bg-sky-100 dark:bg-sky-900",
    textColor: "text-sky-800 dark:text-sky-200",
  },
};

const PREFIX_COLORS: { prefix: string; colors: SourceTagColors }[] = [
  {
    prefix: "ABC ",
    colors: {
      bgColor: "bg-blue-100 dark:bg-blue-900",
      textColor: "text-blue-800 dark:text-blue-200",
    },
  },
  {
    prefix: "WIN News",
    colors: {
      bgColor: "bg-violet-100 dark:bg-violet-900",
      textColor: "text-violet-800 dark:text-violet-200",
    },
  },
];

export function getSourceTagColors(outletName: string): SourceTagColors {
  const exact = OUTLET_COLORS[outletName];
  if (exact) {
    return exact;
  }

  const prefixMatch = PREFIX_COLORS.find(({ prefix }) => outletName.startsWith(prefix));
  if (prefixMatch) {
    return prefixMatch.colors;
  }

  return GREY;
}

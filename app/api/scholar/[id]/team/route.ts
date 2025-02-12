import { NextResponse } from 'next/server';
import teamData from '@/data/team.json';
import { type TeamMember } from '@/types/team';

const ensureHttps = (url: string | undefined): string => {
  if (!url) return '';
  return url.startsWith('http') ? url : `https://${url}`;
};

const constructServiceUrls = (links: any = {}) => {
  if (!links) return {};
  
  return {
    personalWebsite: ensureHttps(links.personalWebsite),
    labWebsite: ensureHttps(links.labWebsite),
    projectWebsite: ensureHttps(links.projectWebsite),
    // Construct full URLs from IDs/slugs
    researchGate: links.researchGateSlug ? `https://www.researchgate.net/profile/${links.researchGateSlug}` : '',
    googleScholar: links.googleScholarId ? `https://scholar.google.com/citations?user=${links.googleScholarId}` : '',
    orcid: links.orcid ? `https://orcid.org/${links.orcid}` : '',
    // Keep original social media URLs
    x: links.x ? `https://x.com/${links.x}` : '',
    bluesky: links.bluesky || '',
    facebook: ensureHttps(links.facebook),
    instagram: ensureHttps(links.instagram),
    linkedin: ensureHttps(links.linkedin),
    github: ensureHttps(links.github)
  };
};

const processDescription = (description: string | undefined, baseUrl: string): string => {
  if (!description) return '';
  
  // Update image and link URLs in the description
  return description.replace(
    /(src="|href=")\/(?!http|https)/g,
    `$1${baseUrl}/`
  );
};

export async function GET() {
  try {
    const baseUrl = 'https://rummerlab.com';
    
    // Add full URLs to images and handle all links
    const teamWithFullUrls = (teamData as TeamMember[]).map(member => {
      try {
        // Handle image URL
        let imageUrl = '';
        if (member.image && typeof member.image === 'string' && member.image !== 'null') {
          imageUrl = `${baseUrl}${member.image}`;
        }

        return {
          ...member,
          image: imageUrl,
          description: processDescription(member.description, baseUrl),
          links: constructServiceUrls(member.links)
        };
      } catch (memberError) {
        console.error('Error processing team member:', memberError);
        return member;
      }
    });

    return NextResponse.json(teamWithFullUrls);
  } catch (error) {
    console.error('Error in team API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
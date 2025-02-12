import { NextResponse } from 'next/server';
import teamData from '@/data/team.json';
import { type TeamMember } from '@/types/team';
import { NextRequest } from 'next/server';

// https://rummerlab.com/api/scholar/ynWS968AAAAJ/team

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

export async function GET(request: NextRequest) {
  try {
    const baseUrl = 'https://rummerlab.com';
    const scholarId = request.nextUrl.searchParams.get('id');

    if (scholarId !== 'ynWS968AAAAJ') {
      return NextResponse.json({ error: 'Invalid scholar ID' }, { status: 400 });
    }
    
    const teamWithFullUrls = (teamData as TeamMember[]).map(member => {
      try {
        let imageUrl = '';
        
        if (member.image && typeof member.image === 'string' && member.image !== 'null') {
          imageUrl = `${baseUrl}${member.image}`;
        } else {
          // Use the avatar endpoint
          const params = new URLSearchParams({
            name: member.name
          });
          
          if (member.email) {
            params.set('email', member.email);
          }
          
          if (scholarId) {
            params.set('scholarId', scholarId);
          }
          
          imageUrl = `${baseUrl}/api/avatar?${params.toString()}`;
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
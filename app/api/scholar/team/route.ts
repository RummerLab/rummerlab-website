import { NextResponse } from 'next/server';
import teamData from '@/data/team.json';
import { type TeamMember } from '@/types/team';

export async function GET() {
  const baseUrl = 'https://rummerlab.com';
  
  // Add full URLs to images and process HTML in descriptions
  const teamWithFullUrls = (teamData as TeamMember[]).map(member => ({
    ...member,
    image: `${baseUrl}${member.image}`,
    // Also update any image URLs in the description if they exist
    description: member.description.replace(
      /(src="|href=")\/images\//g,
      `$1${baseUrl}/images/`
    )
  }));

  return NextResponse.json(teamWithFullUrls);
}
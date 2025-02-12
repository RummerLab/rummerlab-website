import { NextResponse } from 'next/server';
import teamData from '@/data/team.json';
import { type TeamMember } from '@/types/team';

export async function GET() {
  const baseUrl = 'https://rummerlab.com';
  
  // Add full URLs to images and handle null images
  const teamWithFullUrls = (teamData as TeamMember[]).map(member => ({
    ...member,
    image: member.image ? `${baseUrl}${member.image}` : ''
  }));

  return NextResponse.json(teamWithFullUrls);
} 
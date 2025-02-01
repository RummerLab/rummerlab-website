import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import teamData from '@/data/team.json';

export async function GET(request: NextRequest) {
  return NextResponse.json(teamData);
}
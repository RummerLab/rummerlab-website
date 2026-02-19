import { NextRequest, NextResponse } from 'next/server';

interface AvatarAPIResponse {
  Image: string;
  Success: boolean;
  error?: string;
}

interface ScholarProfile {
  avatar?: string;
  coauthors?: Array<{
    name: string;
    scholarId: string;
    avatar?: string;
  }>;
  [key: string]: unknown;
}

function cleanName(name: string): string {
  return name
    .replace(/^(dr\.|dr|professor|prof\.|prof|mr\.|mr|mrs\.|mrs|ms\.|ms|mx\.|mx)\s+/i, '')
    .trim();
}

function buildValidatedImageUrl(imageUrl: string): string {
  try {
    // Minimal path validation
    if (imageUrl.includes('/../') || /\/%2e%2e\//i.test(imageUrl)) {
      throw new Error('Invalid path');
    }
    
    const url = new URL(imageUrl);
    
    // Protocol check
    if (!['http:', 'https:'].includes(url.protocol)) {
      throw new Error('Invalid protocol');
    }
    
    return url.href;
  } catch {
    throw new Error('Invalid URL');
  }
}

// Validate scholarId to prevent SSRF
function validateScholarId(scholarId: string | null): string | null {
  if (!scholarId) return null;
  
  // Only allow alphanumeric characters and common punctuation used in Google Scholar IDs
  const validScholarIdPattern = /^[a-zA-Z0-9_-]+$/;
  
  if (!validScholarIdPattern.test(scholarId)) {
    console.warn('Invalid scholarId format detected:', scholarId);
    return null;
  }
  
  return scholarId;
}

async function findCoauthorScholarId(name: string): Promise<string | null> {
  try {
    // Fetch Jodie Rummer's profile
    const response = await fetch('https://rummerlab.com/api/scholar/ynWS968AAAAJ');
    if (!response.ok) return null;

    const data: ScholarProfile = await response.json();
    if (!data.coauthors?.length) return null;

    // Clean the search name
    const cleanedSearchName = cleanName(name).toLowerCase();
    
    // Search through coauthors
    const coauthor = data.coauthors.find(author => 
      cleanName(author.name).toLowerCase() === cleanedSearchName
    );

    return coauthor?.scholarId || null;
  } catch (error) {
    console.error('Error searching coauthors:', error);
    return null;
  }
}

async function tryGetScholarAvatar(scholarId: string | null, name: string): Promise<Response | null> {
  try {
    // If no scholarId provided, try to find it from coauthors
    const finalScholarId = scholarId || await findCoauthorScholarId(name);
    if (!finalScholarId) return null;
    
    // Validate the scholarId to prevent SSRF
    const validatedScholarId = validateScholarId(finalScholarId);
    if (!validatedScholarId) return null;
    
    const response = await fetch(`https://rummerlab.com/api/scholar/${validatedScholarId}`);
    if (!response.ok) return null;

    const data: ScholarProfile = await response.json();
    if (!data.avatar) return null;

    const avatarResponse = await fetch(data.avatar);
    if (!avatarResponse.ok) return null;

    return avatarResponse;
  } catch (error) {
    console.error('Error fetching scholar avatar:', error);
    return null;
  }
}

async function getAvatarImage(email: string, name: string, scholarId: string | null): Promise<Response> {
  try {
    // Try scholar profile picture first
    const scholarAvatar = await tryGetScholarAvatar(scholarId, name);
    if (scholarAvatar) {
      return scholarAvatar;
    }

    // https://gravatar.com/

    // Try AvatarAPI second
    const response = await fetch('https://avatarapi.com/v2/api.aspx', {
      method: 'POST',
      body: JSON.stringify({
        username: process.env.AVATARAPI_USERNAME,
        password: process.env.AVATARAPI_PASSWORD,
        email,
        provider: 'Cache,Microsoft,Gravatar'
      })
    });

    const data: AvatarAPIResponse = await response.json();
    console.log(data);

    if (data.Success && data.Image) {
      const validatedImageUrl = buildValidatedImageUrl(data.Image);
      const imageResponse = await fetch(validatedImageUrl);
      return imageResponse;
    }

    // Try DiceBear third
    const cleanedName = cleanName(name);
    const dicebearUrl = `https://api.dicebear.com/7.x/initials/png?seed=${encodeURIComponent(cleanedName)}&backgroundColor=0284c7&textColor=ffffff&size=256`;

    try {
      const dicebearResponse = await fetch(dicebearUrl);
      if (dicebearResponse.ok) {
        return dicebearResponse;
      }
    } catch (dicebearError) {
      console.error('Error fetching DiceBear avatar:', dicebearError);
    }

    // Fallback to UI Avatars
    const uiAvatarUrl = `https://ui-avatars.com/api/?format=png&name=${encodeURIComponent(cleanedName)}&background=0284c7&color=ffffff`;
    const uiAvatarResponse = await fetch(uiAvatarUrl);
    return uiAvatarResponse;
  } catch (error) {
    console.error('Error in avatar generation:', error);
    const cleanedName = cleanName(name);
    const uiAvatarUrl = `https://ui-avatars.com/api/?format=png&name=${encodeURIComponent(cleanedName)}&background=0284c7&color=ffffff`;
    const uiAvatarResponse = await fetch(uiAvatarUrl);
    return uiAvatarResponse;
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const name = searchParams.get('name');
    const scholarId = searchParams.get('scholarId');

    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // Validate scholarId if provided
    const validatedScholarId = validateScholarId(scholarId);

    // If we have an email or scholarId or name, try the full avatar generation chain
    if (email || validatedScholarId || name) {
      const response = await getAvatarImage(email || '', name, validatedScholarId);
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours
      
      return new NextResponse(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
      });
    }

    // If no email or scholarId, directly return UI Avatar
    const cleanedName = cleanName(name);
    const uiAvatarUrl = `https://ui-avatars.com/api/?format=png&name=${encodeURIComponent(cleanedName)}&background=0284c7&color=ffffff`;
    const response = await fetch(uiAvatarUrl);
    
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 24 hours

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  } catch (error) {
    console.error('Error serving avatar:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 
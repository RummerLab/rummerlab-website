import { NextResponse } from 'next/server';
import { getCoAuthors, getScholarById } from '@/lib/scholarly';
import { headers } from 'next/headers';

// Helper function to check if the origin is allowed
const isAllowedOrigin = (origin: string | null) => {
  const allowedOrigins = [
    'https://rummerlab.com',
    'https://www.rummerlab.com',
    'http://localhost:3000',
    'null' // Allow null origin for file:// protocol
  ];
  return !origin || allowedOrigins.includes(origin);
};

// Helper function to get CORS headers
const getCorsHeaders = (origin: string | null) => {
  // For null origin (file:// protocol), we'll use '*'
  const accessControlAllowOrigin = !origin || origin === 'null' ? '*' : origin;
  
  return {
    'Access-Control-Allow-Origin': accessControlAllowOrigin,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin'
  };
};

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const origin = request.headers.get('origin');
  
  try {
    const id = decodeURIComponent(params.id);
    
    const jodie = "ynWS968AAAAJ";
    // allowed at Jodie's coauthors/collaborators
    const coAuthors = await getCoAuthors(jodie);
    const allowedIds = coAuthors.map((author: any) => author.scholar_id)
    allowedIds.push(jodie);
    allowedIds.push("g9B1IoQAAAAJ"); // Brock Bergseth

    if (!id || !allowedIds.includes(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid scholar id" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            ...(isAllowedOrigin(origin) ? getCorsHeaders(origin) : {})
          }
        }
      );
    }

    const scholar = await getScholarById(id);

    // Return the response with proper CORS headers
    return new NextResponse(
      JSON.stringify(scholar),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...(isAllowedOrigin(origin) ? getCorsHeaders(origin) : {})
        }
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({ message: "Error fetching data" }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...(isAllowedOrigin(origin) ? getCorsHeaders(origin) : {})
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');

  if (isAllowedOrigin(origin)) {
    return new NextResponse(null, {
      status: 204,
      headers: getCorsHeaders(origin)
    });
  }

  return new NextResponse(null, { status: 204 });
}
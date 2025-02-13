import { NextResponse } from 'next/server';
import { getCoAuthors, getScholarById } from '@/lib/scholarly';

// Helper function to get CORS headers - allowing all origins
const getCorsHeaders = () => {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
  };
};

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
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
            ...getCorsHeaders()
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
          ...getCorsHeaders()
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
          ...getCorsHeaders()
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders()
  });
}
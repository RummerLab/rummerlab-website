import { NextResponse } from 'next/server';
import { getCoAuthors, getScholarById } from '@/lib/scholarly';
import { CoAuthor } from '@/types/scholarly';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  try {
    const id = decodeURIComponent(params.id);
    
    const jodie = "ynWS968AAAAJ";
    // allowed at Jodie's coauthors/collaborators
    const coAuthors = await getCoAuthors(jodie);
    const allowedIds = coAuthors.map((author: CoAuthor) => author.scholar_id)
    allowedIds.push(jodie);
    allowedIds.push("g9B1IoQAAAAJ"); // Brock Bergseth

    if (!id || !allowedIds.includes(id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid scholar id" }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    }

    const scholar = await getScholarById(id);

    return new NextResponse(
      JSON.stringify(scholar),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
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
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

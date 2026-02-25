export async function getScholarByName(name: string) {
  try {
    if (!name) {
      throw new Error('Name is empty');
    }
    const url = `https://scholarly.rummerlab.com/search_author?name=${encodeURIComponent(name)}`
    const response = await fetch(url, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok. URL: ${url}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error fetching scholar data:', error);
    throw error;
  }
}

/** Safe default when external scholarly API is unreachable (e.g. at build time on Vercel). */
const EMPTY_SCHOLAR = { coauthors: [] as { scholar_id: string; name: string }[], publications: [] };

export async function getScholarById(id: string) {
  try {
    if (!id) {
      throw new Error('Id is empty.');
    }
    const url = `https://scholarly.rummerlab.com/search_author_id?id=${encodeURIComponent(id)}`;
    const response = await fetch(url, {
      next: { revalidate: 604800 }, // 1 week
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error(`Scholarly API returned ${response.status} for ${url}`);
      return EMPTY_SCHOLAR;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching scholar data:', error);
    return EMPTY_SCHOLAR;
  }
}

export async function getPublications(scholarId: string) {
  try {
    if (!scholarId) {
      throw new Error('Scholar ID is empty');
    }
    /*const url = `https://scholarly.rummerlab.com/author_publications?author_id=${encodeURIComponent(scholarId)}`
    const response = await fetch(url, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok. URL: ${url}`);
    }

    const json = await response.json();
*/
    const json = await getScholarById(scholarId);
    const publications = json.publications;
    return publications;
  } catch (error) {
    console.error('Error fetching publication data:', error);
    throw error;
  }
}

export async function getCoAuthors(id: string) {
  if (!id) {
    return [];
  }
  const scholar = await getScholarById(id);
  return Array.isArray(scholar?.coauthors) ? scholar.coauthors : [];
}

/** Scholar IDs allowed for API access (Jodie's coauthors + Jodie + Brock Bergseth + Nicholas C. Wu). */
export async function getAllowedScholarIds(): Promise<string[]> {
  const jodie = 'ynWS968AAAAJ';
  const coAuthors = await getCoAuthors(jodie);
  const allowedIds = coAuthors.map((author: { scholar_id: string }) => author.scholar_id);
  allowedIds.push(jodie);
  allowedIds.push('g9B1IoQAAAAJ'); // Brock Bergseth
  allowedIds.push('cXDRggIAAAAJ'); // Nicholas C. Wu
  return allowedIds;
}

export async function searchPublication(query: string) {
  try {
    if (!query) {
      throw new Error('Query is empty');
    }
    const url = `https://scholarly.rummerlab.com/search_publications?query=${encodeURIComponent(query)}`
    const response = await fetch(url, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok. URL: ${url}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error searching publication data:', error);
    throw error;
  }
}

export async function publicationRelated(publicationId: string) {
  try {
    if (!publicationId) {
      throw new Error('Publication ID is empty');
    }
    const url = `https://scholarly.rummerlab.com/get_related_publications?pub_id=${encodeURIComponent(publicationId)}`;
    const response = await fetch(url, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok. URL: ${url}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error getting related publication data:', error);
    throw error;
  }
}


export async function publicationCitedBy(publicationId: string) {
  try {
    if (!publicationId) {
      throw new Error('Publication ID is empty');
    }
    const url = `https://scholarly.rummerlab.com/cited_by?pub_id=${encodeURIComponent(publicationId)}`;
    const response = await fetch(url, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error(`Network response was not ok. URL: ${url}`);
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error getting cited_by data:', error);
    throw error;
  }
}


// https://scholarly.readthedocs.io/en/stable/quickstart.html
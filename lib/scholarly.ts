export async function getScholar(name: string) {
  try {
    if (!name) {
      throw new Error('Name is empty');
    }

    const response = await fetch(`https://scholarly.rummerlab.com/search_author?name=${encodeURIComponent(name)}`, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error fetching scholar data:', error);
    throw error;
  }
}

export async function getPublications(scholarId: string) {
  try {
    if (!scholarId) {
      throw new Error('Scholar ID is empty');
    }

    const response = await fetch(`https://scholarly.rummerlab.com/author_publications?author_id=${encodeURIComponent(scholarId)}`, { 
      next: { 
        revalidate: 604800 // 1 week
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();

    return json;
  } catch (error) {
    console.error('Error fetching publication data:', error);
    throw error;
  }
}

export async function getCoAuthors(name: string) {
  try {
    if (!name) {
      throw new Error('Name is empty');
    }
    const scholar = await getScholar(name);
    const coauthors = scholar.coauthors;

    return coauthors;
  } catch (error) {
    console.error('Error fetching coauthors data:', error);
    throw error;
  }
}

// TO DO:
// get_related_publications
// get_cited_by
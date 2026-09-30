export interface CollaboratorLocation {
  university: string;
  country: string;
  lon: number;
  lat: number;
  n: number;
}

/**
 * Institution coordinates for the collaborators map.
 * Seeded from RummerLab partner affiliations plus Google Scholar coauthor institutions
 * (Jodie L. Rummer, ynWS968AAAAJ) and curated paper coauthor homes (e.g. Brazil).
 */
export const collaboratorLocations: CollaboratorLocation[] = [
  // Australia
  { university: 'James Cook University', country: 'Australia', lon: 146.761, lat: -19.329, n: 30 },
  { university: 'Australian Institute of Marine Science', country: 'Australia', lon: 147.055, lat: -19.267, n: 4 },
  { university: 'University of Queensland', country: 'Australia', lon: 153.0137, lat: -27.4975, n: 3 },
  { university: 'University of Sydney', country: 'Australia', lon: 151.1873, lat: -33.8886, n: 2 },
  { university: 'Macquarie University', country: 'Australia', lon: 151.113, lat: -33.7738, n: 2 },
  { university: 'University of Tasmania', country: 'Australia', lon: 147.3248, lat: -42.9041, n: 2 },
  { university: 'Griffith University', country: 'Australia', lon: 153.052, lat: -27.963, n: 1 },
  { university: 'University of New South Wales', country: 'Australia', lon: 151.2313, lat: -33.9173, n: 1 },
  { university: 'Deakin University', country: 'Australia', lon: 144.36, lat: -38.144, n: 1 },
  {
    university: 'South Australian Research and Development Institute',
    country: 'Australia',
    lon: 138.621,
    lat: -34.928,
    n: 1,
  },

  // Pacific / New Zealand
  { university: "CRIOBE / Mo'orea", country: 'French Polynesia', lon: -149.83, lat: -17.49, n: 4 },
  { university: 'University of Auckland', country: 'New Zealand', lon: 174.769, lat: -36.852, n: 2 },
  { university: 'University of Otago', country: 'New Zealand', lon: 170.5144, lat: -45.8647, n: 1 },
  { university: 'Hawaii Institute of Marine Biology', country: 'USA', lon: -157.795, lat: 21.433, n: 1 },

  // Americas
  { university: 'University of British Columbia', country: 'Canada', lon: -123.25, lat: 49.2667, n: 3 },
  { university: 'Carleton University', country: 'Canada', lon: -75.696, lat: 45.3876, n: 1 },
  { university: 'University of Montreal', country: 'Canada', lon: -73.612, lat: 45.503, n: 1 },
  { university: 'University of Saskatchewan', country: 'Canada', lon: -106.635, lat: 52.133, n: 2 },
  { university: 'Dalhousie University', country: 'Canada', lon: -63.591, lat: 44.636, n: 1 },
  { university: 'University of Miami', country: 'USA', lon: -80.2746, lat: 25.7179, n: 2 },
  { university: 'University of Massachusetts Boston', country: 'USA', lon: -71.039, lat: 42.314, n: 1 },
  { university: 'New England Aquarium', country: 'USA', lon: -71.05, lat: 42.359, n: 1 },
  { university: 'University of Texas at Austin', country: 'USA', lon: -97.738, lat: 30.285, n: 1 },
  { university: 'Brown University', country: 'USA', lon: -71.4025, lat: 41.8268, n: 1 },
  { university: 'University of South Florida', country: 'USA', lon: -82.4139, lat: 28.0587, n: 1 },
  { university: 'Stanford University', country: 'USA', lon: -122.169, lat: 37.4275, n: 1 },
  { university: 'University of California Santa Barbara', country: 'USA', lon: -119.848, lat: 34.414, n: 1 },
  { university: 'University of California Davis', country: 'USA', lon: -121.752, lat: 38.538, n: 1 },
  { university: 'University of Delaware', country: 'USA', lon: -75.752, lat: 39.678, n: 1 },
  { university: 'University of Alaska Anchorage', country: 'USA', lon: -149.867, lat: 61.19, n: 1 },
  { university: 'University of West Florida', country: 'USA', lon: -87.216, lat: 30.549, n: 1 },
  { university: 'Desert Botanical Garden', country: 'USA', lon: -111.944, lat: 33.461, n: 1 },
  // Brazil — paper coauthors / Brazilian network (Camilo M. Ferreira at UFBA;
  // Ana Barbosa Martins trained at UFMA and coauthored with RummerLab)
  {
    university: 'Universidade Federal da Bahia',
    country: 'Brazil',
    lon: -38.503,
    lat: -12.998,
    n: 1,
  },
  {
    university: 'Universidade Federal do Maranhão',
    country: 'Brazil',
    lon: -44.307,
    lat: -2.556,
    n: 1,
  },

  // Europe
  { university: 'University of Glasgow', country: 'UK', lon: -4.2899, lat: 55.8728, n: 2 },
  { university: 'University of Exeter', country: 'UK', lon: -3.5351, lat: 50.7371, n: 1 },
  { university: 'University of Oslo', country: 'Norway', lon: 10.7207, lat: 59.9399, n: 2 },
  { university: 'University of Antwerp', country: 'Belgium', lon: 4.401, lat: 51.222, n: 1 },
  { university: 'Université de Perpignan / CNRS', country: 'France', lon: 2.898, lat: 42.683, n: 2 },
  { university: 'Université de Montpellier / MARBEC', country: 'France', lon: 3.876, lat: 43.611, n: 2 },
  { university: 'University of Copenhagen', country: 'Denmark', lon: 12.572, lat: 55.703, n: 1 },
  { university: 'University of Lisbon (FCUL)', country: 'Portugal', lon: -9.156, lat: 38.756, n: 2 },

  // Middle East / Asia
  {
    university: 'King Abdullah University of Science and Technology',
    country: 'Saudi Arabia',
    lon: 39.104,
    lat: 22.302,
    n: 1,
  },
  { university: 'New York University Abu Dhabi', country: 'United Arab Emirates', lon: 54.434, lat: 24.524, n: 1 },
  { university: 'University of Hong Kong', country: 'Hong Kong', lon: 114.1366, lat: 22.2831, n: 1 },
];

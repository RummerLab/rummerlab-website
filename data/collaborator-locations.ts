export interface CollaboratorLocation {
  university: string;
  country: string;
  lon: number;
  lat: number;
  n: number;
}

/**
 * Institution coordinates for the team collaborators map.
 * Counts reflect co-located collaborators / partner affiliations.
 */
export const collaboratorLocations: CollaboratorLocation[] = [
  { university: 'James Cook University', country: 'Australia', lon: 146.761, lat: -19.329, n: 30 },
  { university: 'CRIOBE / Mo\'orea', country: 'French Polynesia', lon: -149.83, lat: -17.49, n: 4 },
  { university: 'Australian Institute of Marine Science', country: 'Australia', lon: 147.055, lat: -19.267, n: 4 },
  { university: 'University of Queensland', country: 'Australia', lon: 153.0137, lat: -27.4975, n: 3 },
  { university: 'University of Sydney', country: 'Australia', lon: 151.1873, lat: -33.8886, n: 2 },
  { university: 'Macquarie University', country: 'Australia', lon: 151.113, lat: -33.7738, n: 2 },
  { university: 'University of Tasmania', country: 'Australia', lon: 147.3248, lat: -42.9041, n: 2 },
  { university: 'University of Auckland', country: 'New Zealand', lon: 174.769, lat: -36.852, n: 2 },
  { university: 'University of Otago', country: 'New Zealand', lon: 170.5144, lat: -45.8647, n: 1 },
  { university: 'University of British Columbia', country: 'Canada', lon: -123.25, lat: 49.2667, n: 3 },
  { university: 'University of Miami', country: 'USA', lon: -80.2746, lat: 25.7179, n: 2 },
  { university: 'University of Massachusetts Boston', country: 'USA', lon: -71.039, lat: 42.314, n: 1 },
  { university: 'New England Aquarium', country: 'USA', lon: -71.05, lat: 42.359, n: 1 },
  { university: 'University of Texas at Austin', country: 'USA', lon: -97.738, lat: 30.285, n: 1 },
  { university: 'Brown University', country: 'USA', lon: -71.4025, lat: 41.8268, n: 1 },
  { university: 'University of South Florida', country: 'USA', lon: -82.4139, lat: 28.0587, n: 1 },
  { university: 'University of Glasgow', country: 'UK', lon: -4.2899, lat: 55.8728, n: 2 },
  { university: 'University of Antwerp', country: 'Belgium', lon: 4.401, lat: 51.222, n: 1 },
  { university: 'University of Oslo', country: 'Norway', lon: 10.7207, lat: 59.9399, n: 2 },
  { university: 'Université de Perpignan / CNRS', country: 'France', lon: 2.898, lat: 42.683, n: 2 },
  { university: 'Griffith University', country: 'Australia', lon: 153.052, lat: -27.963, n: 1 },
  { university: 'University of Exeter', country: 'UK', lon: -3.5351, lat: 50.7371, n: 1 },
  { university: 'Stanford University', country: 'USA', lon: -122.169, lat: 37.4275, n: 1 },
  { university: 'University of California Santa Barbara', country: 'USA', lon: -119.848, lat: 34.414, n: 1 },
  { university: 'King Abdullah University of Science and Technology', country: 'Saudi Arabia', lon: 39.104, lat: 22.302, n: 1 },
  { university: 'University of Hong Kong', country: 'Hong Kong', lon: 114.1366, lat: 22.2831, n: 1 },
];

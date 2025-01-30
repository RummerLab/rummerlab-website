import { TeamSection } from '@/types/team';

export const teamSections: TeamSection[] = [
  {
    title: 'Current Post-docs',
    members: [
      {
        name: 'Dr. Björn Illing',
        role: 'postdoc',
        email: '',
        description: 'Originally from Germany, where I earned my diploma (2009) at the University of Hamburg conducting eco-morphological research on spawning aggregations of a temperate clupeid fish species. Now, I investigate the effects of environmental stressors on coral reef fish larvae, funded in part by the Company of Biologists.',
        links: {
          researchGate: '#',
          twitter: '#'
        }
      }
    ]
  },
  {
    title: 'Current PhD Students',
    members: [
      {
        name: 'Sybille Hess',
        role: 'phd',
        email: 'sybille.hess@my.jcu.edu.au',
        description: 'Originally from Switzerland but did my MSc here at JCU. My PhD research investigates how poor water quality affects fish metabolic performance, the consequences for swimming, and potential changes in fish community structure.',
        links: {
          twitter: '#'
        },
        publications: [
          {
            title: 'Exposure of clownfish larvae to suspended sediment levels found on the Great Barrier Reef: Impacts on gill structure and microbiome',
            url: '#'
          }
        ]
      },
      {
        name: 'Tiffany Nay',
        role: 'phd',
        email: 'tiffany.nay@my.jcu.edu.au',
        description: 'Earned my BSc in Marine Biology from the University of West Florida. My research investigates how/why fish utilize microhabitats with fluctuating water quality in coral reefs and mangrove ecosystems.',
        links: {
          twitter: '#'
        },
        publications: [
          {
            title: 'Behavioural thermoregulation in a temperature-sensitive coral reef fish, the five-lined cardinalfish',
            url: '#'
          }
        ]
      },
      {
        name: 'Ian Bouyoucos',
        role: 'phd',
        email: 'ian.bouyoucos@my.jcu.edu',
        description: 'Investigating the capacity for juvenile blacktip and lemon sharks to balance processes related to energy expenditure and acquisition while managing stressors across environmental conditions in nursery habitats around Moorea.',
        links: {
          googleScholar: '#',
          twitter: '#'
        }
      }
      // Add more PhD students...
    ]
  }
  // Add more sections...
];

export const physiosharkProject = {
  title: 'Physioshark Project',
  description: `In collaboration with the RummerLab and the Centre de Recherches Insulaires et Observatoire de l'Environnement (CRIOBE), 
  the Physioshark Project was conceived in 2013. We work on the Island of Moorea in French Polynesia where we have identified 
  11 potential shark nurseries. Here, mother sharks give birth to blacktip reef and sicklefin lemon sharks during the months 
  of October - February every year.`,
  links: {
    instagram: '#',
    facebook: '#'
  }
}; 
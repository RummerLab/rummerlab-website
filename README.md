# Rummerlab Website

RummerLab, led by Professor Jodie Rummer at James Cook University, is a world-leading marine biology research laboratory focused on understanding how fish and sharks respond to environmental change. The lab combines cutting-edge physiological research with ecological and conservation approaches to address critical questions about the future of marine ecosystems in a changing climate. Through innovative research techniques and international collaborations, RummerLab investigates how marine species maintain performance during environmental stress and their capacity for adaptation.

A flagship initiative of RummerLab is the Physioshark Project, which studies the physiological responses of sharks to climate change stressors in French Polynesia. The project represents a unique collaboration between international researchers and has made significant contributions to our understanding of shark conservation physiology. To learn more about Dr. Rummer's research and initiatives, visit her personal website at [jodierummer.com](https://jodierummer.com) or explore the dedicated [Physioshark Project website](https://physioshark.org).

## Updating Team Data

The team member information is stored in [`data/team.json`](data/team.json). To update team information:

1. Navigate to the [team.json file](data/team.json) on GitHub
2. Click the edit (pencil) icon
3. Update the JSON file with the new team member information
4. Each team member should have the following fields:
   ```json
   {
     "name": "Full Name",
     "title": "Academic Title",
     "role": "Role in the Team",
     "email": "email@example.com",
     "startDate": "YYYY-MM-DD",
     "endDate": null,
     "description": "Bio text...",
     "image": "/images/profile-image.jpg",
     "alt": "Image description",
     "links": {
       "website": "personal website",
       "lab": "lab website",
       "researchGate": "ResearchGate URL",
       "googleScholar": "Google Scholar URL",
       "twitter": "Twitter URL",
       "bluesky": "@handle.bsky.social",
       "orcid": "ORCID ID",
       "linkedin": "LinkedIn URL",
       "github": "GitHub URL"
     },
     "affiliations": [
       {
         "institution": "University Name",
         "department": "Department Name",
         "role": "Role Title",
         "location": "City, Country"
       }
     ],
     "researchInterests": [
       "Interest 1",
       "Interest 2"
     ],
     "education": [
       {
         "degree": "Degree Type",
         "field": "Field of Study",
         "institution": "Institution Name",
         "year": "YYYY"
       }
     ],
     "awards": [
       {
         "name": "Award Name",
         "year": "YYYY",
         "description": "Award Description"
       }
     ],
     "languages": ["Language 1", "Language 2"],
     "currentProjects": [
       "Project 1",
       "Project 2"
     ]
   }
   ```
5. For fields without information, use `null` for single values or `[]` for arrays
6. Commit the changes with a descriptive message (e.g., "Update Dr. Smith's profile information")
7. Create a pull request if you don't have direct write access

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Linting

```bash
npm run lint
```

## Updating Dependencies

```bash
npx npm-check-updates -u
npm install
```

## Environment Setup

Set up the environment variables

Get short-lived access token from https://developers.facebook.com/tools/explorer/362219269878369/?method=GET&path=me%3Ffields%3Did%2Cname%26transport%3Dcors&version=v18.0

## To Do

- Twitter
- Google News
- NewsAPI Key
- Media - Research impact, audience, reach, numbers
- YouTube videos
- Citizen science for both epaulettes and blacktip reefs https://www.instagram.com/p/C0yY3ffPFue/?igsh=OGpoZjRhbnRiNXI4
- Collaborators and Publications via Google Scholar. See also https://researchonline.jcu.edu.au/view/jcu/CBA8B0D9ADB294061C51967BAC225DFA.html and https://researchdata.edu.au/search/#!/rows=15/sort=score%20desc/class=collection/p=1/q=jodie%20rummer/
- Publication DOI
- Journal Impact Factor
- Collaborators map (which Universities Jodie has worked with via Google Scholar Collaborator title or via research online JCU site)
- Instagram posts
- Twitter posts
- Media Releases - written and audio interviews, News articles, videos
- About, Awards and current funding - https://research.jcu.edu.au/portfolio/jodie.rummer/
- Update Current PhD students page
- Update RummerLab page https://rummerlab.com/rummerlab
- Update physioshark page https://rummerlab.com/physioshark-project
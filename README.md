# RummerLab Website

RummerLab, led by Professor Jodie Rummer at James Cook University, is a world-leading marine biology research laboratory focused on understanding how fish and sharks respond to environmental change. The lab combines cutting-edge physiological research with ecological and conservation approaches to address critical questions about the future of marine ecosystems in a changing climate. Through innovative research techniques and international collaborations, RummerLab investigates how marine species maintain performance during environmental stress and their capacity for adaptation.

A flagship initiative of RummerLab is the Physioshark Project, which studies the physiological responses of sharks to climate change stressors in French Polynesia. The project represents a unique collaboration between international researchers and has made significant contributions to our understanding of shark conservation physiology. To learn more about Dr. Rummer's research and initiatives, visit her personal website at [jodierummer.com](https://jodierummer.com) or explore the dedicated [Physioshark Project website](https://physioshark.org).

## Features

- Modern, responsive design
- Team profiles
- Publications and Research updates
- Media and News
- Social media integration:
  - Bluesky
  - Instagram
  - YouTube

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
       "bluesky": "Bluesky URL",
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

Note that this can break the code.

```bash
npx npm-check-updates -u
npm install
```

## Environment Setup

Set up the environment variables

Get short-lived access token from https://developers.facebook.com/tools/explorer/362219269878369/?method=GET&path=me%3Ffields%3Did%2Cname%26transport%3Dcors&version=v18.0

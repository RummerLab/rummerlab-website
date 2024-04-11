class ScholarEmbed {
    constructor(scholarId, container) {
        this.scholarId = scholarId
        this.container = container
        this.baseUrl = 'https://rummerlab.com/api/scholar' // Assuming the API URL
        this.init()
    }

    async init() {
        const scholarData = await this.fetchScholar()
        if (!scholarData) {
            console.error('Failed to fetch scholar data')
            return
        }

        this.displayScholar(scholarData)
    }

    async fetchScholar() {
        try {
            const response = await fetch(`${this.baseUrl}/${this.scholarId}`)

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()

            // Store the last modified date
            const lastModified = response.headers.get('Last-Modified')
            data.lastModified = lastModified
                ? new Date(lastModified).toLocaleDateString()
                : new Date().toLocaleDateString()

            return data
        } catch (error) {
            console.error('Error fetching publications:', error)
            return null
        }
    }
    formatPublicationCitation(data) {
        const { bib, pub_url, num_citations } = data

        const container = document.createElement('div')

        if (bib.author) {
            const authorsFormatted = bib.author
                .split(' and ')
                .map((author, index, array) => {
                    return index === array.length - 1 && array.length > 1
                        ? `& ${author}`
                        : author
                })
                .join(', ')

            const authorsText = document.createTextNode(authorsFormatted + ' ')
            container.appendChild(authorsText)
        }
        // Add publication year
        if (bib.pub_year) {
            const pubYearText = document.createTextNode(`(${bib.pub_year}) `)
            container.appendChild(pubYearText)
        }

        // Add title
        if (bib.title) {
            const titleText = document.createTextNode(`${bib.title}. `)
            container.appendChild(titleText)
        }

        // Add journal
        if (bib.journal) {
            const journalText = document.createTextNode(`${bib.journal}, `)
            container.appendChild(journalText)
        }

        // Add volume and number
        if (bib.volume || bib.number) {
            const volumeNumberText = document.createTextNode(
                `${bib.volume ? bib.volume : ''}${
                    bib.number ? `(${bib.number}),` : ''
                } `
            )
            container.appendChild(volumeNumberText)
        }

        // Add pages
        if (bib.pages) {
            const pagesText = document.createTextNode(`${bib.pages}. `)
            container.appendChild(pagesText)
        }

        // Add citation count
        if (num_citations) {
            const citationsText = document.createTextNode(
                `(${num_citations} citations) `
            )
            container.appendChild(citationsText)
        }

        // Add URL as a hyperlink
        if (pub_url) {
            const urlElement = document.createElement('a')
            urlElement.href = pub_url
            urlElement.textContent = '[link]'
            urlElement.target = '_blank' // Open in new tab
            container.appendChild(urlElement)
        }

        return container
    }

    generateProfileSummary(data) {
        const {
            lastModified,
            name,
            affiliation,
            organization,
            citedby,
            publications,
            hindex,
            i10index,
        } = data

        // Publications count
        const publicationsCount = publications ? publications.length : 0

        // Create container element for the profile summary
        const container = document.createElement('div')

        const tile = document.createElement('h2')
        tile.textContent = name
        container.appendChild(tile)

        const subtile = document.createElement('h3')
        //const organizationLink = document.createElement('a')
        //organizationLink.href = `https://scholar.google.com/citations?view_op=view_org&hl=en&org=${organization}`
        //organizationLink.textContent = affiliation
        //organizationLink.target = '_blank'
        //subtile.appendChild(organizationLink)
        subtile.textContent = affiliation
        container.appendChild(subtile)

        // Create and append the Google Scholar profile link
        // Create the h2 element for the heading
        const heading = document.createElement('p')
        // Create the text node for the non-link part of the heading
        /*const textNode = document.createTextNode('Click here for my ')
        // Append the text node to the h2 element
        heading.appendChild(textNode)
        // Create and configure the link for the Google Scholar profile part
        const scholarLink = document.createElement('a')
        scholarLink.href = `https://scholar.google.com/citations?user=${this.scholarId}`
        scholarLink.textContent = 'Google Scholar profile'
        scholarLink.target = '_blank'
        // Append the link to the h2 element
        heading.appendChild(scholarLink)*/
        // Append the h2 element to the container
        container.appendChild(heading)

        // Add the publications text
        const profileContainer = document.createElement('div')
        profileContainer.className = 'profile-summary'
        const summaryText = document.createElement('p')
        summaryText.textContent = `${publicationsCount} publications, ${citedby} citations, h-index: ${hindex}, i10-index: ${i10index}`
        profileContainer.appendChild(summaryText)
        const collaborators = this.generateCollaborators(data)
        profileContainer.appendChild(collaborators)
        const fetchDataInfo = document.createElement('p')
        fetchDataInfo.textContent = 'Data fetched from '
        const scholarLink = document.createElement('a')
        scholarLink.href = `https://scholar.google.com/citations?user=${this.scholarId}`
        scholarLink.textContent = 'Google Scholar'
        scholarLink.target = '_blank'
        fetchDataInfo.appendChild(scholarLink)
        fetchDataInfo.textContent += ` on ${lastModified}`
        profileContainer.appendChild(fetchDataInfo)
        // Append the profile summary to the main container
        container.appendChild(profileContainer)

        // The container has all the elements safely added.
        return container
    }

    generateCollaborators(data) {
        const coAuthors = data.coauthors
        const collaboratorNames = coAuthors.map((author) => author.name)
        const container = document.createElement('p')
        container.textContent = `Collaborator: ${collaboratorNames.join('')}`
        if (collaboratorNames.length > 1) {
            // Separate all but the last collaborator with commas, and add "and" before the last one
            const allButLast = collaboratorNames.slice(0, -1).join(', ')
            const last = collaboratorNames[collaboratorNames.length - 1]
            container.textContent = `Collaborators: ${allButLast}, and ${last}`
        }

        return container
    }

    generatePublicationCitation(data) {
        const container = document.createElement('p')
        const publicationData = data.publications
        if (publicationData) {
            publicationData.sort((a, b) => b.bib.pub_year - a.bib.pub_year)

            publicationData.forEach((publication) => {
                const formattedCitation =
                    this.formatPublicationCitation(publication)
                container.appendChild(formattedCitation)
                container.appendChild(document.createElement('br'))
            })
        }
        return container
    }

    displayScholar(scholarData) {
        this.container.innerHTML = '' // Clear any existing content

        const profileSummary = this.generateProfileSummary(scholarData)
        this.container.appendChild(profileSummary)

        this.container.appendChild(document.createElement('br'))
        this.container.appendChild(document.createElement('hr'))
        this.container.appendChild(document.createElement('br'))

        const publicationCitation =
            this.generatePublicationCitation(scholarData)
        this.container.appendChild(publicationCitation)
    }
}

window.onload = function () {
    const scholarContainer = document.getElementById('scholar-embed')
    const scholarId = scholarContainer.getAttribute('scholar-id')
    new ScholarEmbed(scholarId, scholarContainer)
}

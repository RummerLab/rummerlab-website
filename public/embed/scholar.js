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
            return data
        } catch (error) {
            console.error('Error fetching publications:', error)
            return null
        }
    }
    formatPublicationCitation(data) {
        const { bib, pub_url, num_citations } = data

        const citationElement = document.createElement('div')

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
            citationElement.appendChild(authorsText)
        }
        // Add publication year
        if (bib.pub_year) {
            const pubYearText = document.createTextNode(`(${bib.pub_year}) `)
            citationElement.appendChild(pubYearText)
        }

        // Add title
        if (bib.title) {
            const titleText = document.createTextNode(`${bib.title}. `)
            citationElement.appendChild(titleText)
        }

        // Add journal
        if (bib.journal) {
            const journalText = document.createTextNode(`${bib.journal}, `)
            citationElement.appendChild(journalText)
        }

        // Add volume and number
        if (bib.volume || bib.number) {
            const volumeNumberText = document.createTextNode(
                `${bib.volume ? bib.volume : ''}${
                    bib.number ? `(${bib.number}),` : ''
                } `
            )
            citationElement.appendChild(volumeNumberText)
        }

        // Add pages
        if (bib.pages) {
            const pagesText = document.createTextNode(`${bib.pages}. `)
            citationElement.appendChild(pagesText)
        }

        // Add citation count
        if (num_citations) {
            const citationsText = document.createTextNode(
                `(${num_citations} citations) `
            )
            citationElement.appendChild(citationsText)
        }

        // Add URL as a hyperlink
        if (pub_url) {
            const urlElement = document.createElement('a')
            urlElement.href = pub_url
            urlElement.textContent = '[link]'
            urlElement.target = '_blank' // Open in new tab
            citationElement.appendChild(urlElement)
        }

        return citationElement
    }

    generateProfileSummary(data) {
        const { name, citedby: publicationsCitations, hindex, i10index } = data

        // Create container element for the profile summary
        const container = document.createElement('div')

        // Create and append the Google Scholar profile link
        // Create the h2 element for the heading
        const heading = document.createElement('h3')
        // Create the text node for the non-link part of the heading
        const textNode = document.createTextNode('Click here for my ')
        // Append the text node to the h2 element
        heading.appendChild(textNode)
        // Create and configure the link for the Google Scholar profile part
        const scholarLink = document.createElement('a')
        scholarLink.href = `https://scholar.google.com/citations?user=${this.scholarId}`
        scholarLink.textContent = 'Google Scholar profile'
        scholarLink.target = '_blank'
        // Append the link to the h2 element
        heading.appendChild(scholarLink)
        // Append the h2 element to the container
        container.appendChild(heading)

        // Add the publications text
        const publicationsText = document.createElement('p')
        publicationsText.textContent = `Publications: ${publicationsCitations} citations, h-index = ${hindex}, i10-index = ${i10index}; Google Scholar on ${new Date().toLocaleDateString()}`
        container.appendChild(publicationsText)

        // Add a line break
        container.appendChild(document.createElement('br'))

        // Add the summary text
        const summaryText = document.createElement('p')
        summaryText.textContent =
            'Summary: Book chapters, journal articles, conference proceedings, editorial commentaries/perspectives'
        container.appendChild(summaryText)

        // Append line breaks and horizontal line for spacing
        container.appendChild(document.createElement('br'))
        container.appendChild(document.createElement('hr'))
        container.appendChild(document.createElement('br'))

        // The container has all the elements safely added.
        return container
    }
    displayScholar(scholarData) {
        this.container.innerHTML = '' // Clear existing content

        const profileSummary = this.generateProfileSummary(scholarData)
        const publicationData = scholarData.publications

        if (publicationData) {
            publicationData.sort((a, b) => b.bib.pub_year - a.bib.pub_year)

            publicationData.forEach((publication) => {
                const formattedCitation =
                    this.formatPublicationCitation(publication)
                this.container.appendChild(formattedCitation)
                this.container.appendChild(document.createElement('br'))
            })
        }
    }
}

window.onload = function () {
    const scholarContainer = document.getElementById('scholar-embed')
    const scholarId = scholarContainer.getAttribute('scholar-id')
    new ScholarEmbed(scholarId, scholarContainer)
}

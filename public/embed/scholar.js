/* Example embeddable Scholar widget

<!-- Container where the Scholar widget will be displayed -->
<div id="scholar-container" data-scholar-widget data-scholar-name="brock-bergseth"></div>

<!-- Script to load and initialize the Scholar widget -->
<script src="https://rummerlab.com/embed/scholar.js" async></script>

*/

(function() {
    function fetchAndDisplayScholarData(containerSelector, scholarName) {
        const container = document.querySelector(containerSelector);
        if (!container) {
            console.error('Scholar widget error: Container not found');
            return;
        }
        fetch(`https://rummerlab.com/api/scholar/${scholarName}`)
            .then(response => response.json())
            .then(data => displayData(data, container))
            .catch(error => console.error('Error fetching data:', error));
    }

    function displayData(data, container) {
        container.style.margin = '0 auto';
        container.style.maxWidth = '800px';

        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.style.marginBottom = '20px';
            itemDiv.style.padding = '10px';
            itemDiv.style.border = '1px solid #ddd';
            itemDiv.style.borderRadius = '5px';
            
            const affiliation = document.createElement('p');
            affiliation.textContent = `Affiliation: ${item.affiliation}`;
            affiliation.style.margin = '0';
            affiliation.style.padding = '0';

            const citedBy = document.createElement('p');
            citedBy.textContent = `Cited by: ${item.citedby}`;
            citedBy.style.margin = '5px 0 0 0';
            citedBy.style.padding = '0';

            itemDiv.appendChild(affiliation);
            itemDiv.appendChild(citedBy);
            
            container.appendChild(itemDiv);
        });
    }

    // Find all elements that should initialize a scholar widget
    document.querySelectorAll('[data-scholar-widget]').forEach(el => {
        const scholarName = el.getAttribute('data-scholar-name');
        const containerSelector = '#' + el.id; // Assuming the widget container has an ID
        fetchAndDisplayScholarData(containerSelector, scholarName);
    });
})();
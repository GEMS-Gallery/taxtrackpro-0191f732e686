import { backend } from 'declarations/backend';

// Function to add a new TaxPayer
async function addTaxPayer(event) {
    event.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    try {
        await backend.addTaxPayer(tid, firstName, lastName, address);
        alert('TaxPayer added successfully');
        document.getElementById('addTaxPayerForm').reset();
        displayAllTaxPayers();
    } catch (error) {
        console.error('Error adding TaxPayer:', error);
        alert('Failed to add TaxPayer');
    }
}

// Function to display all TaxPayers
async function displayAllTaxPayers() {
    try {
        const taxPayers = await backend.getAllTaxPayers();
        const taxPayerList = document.getElementById('taxPayerList');
        taxPayerList.innerHTML = '';

        taxPayers.forEach(taxPayer => {
            const div = document.createElement('div');
            div.innerHTML = `
                <p><strong>TID:</strong> ${taxPayer.tid}</p>
                <p><strong>Name:</strong> ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p><strong>Address:</strong> ${taxPayer.address}</p>
                <hr>
            `;
            taxPayerList.appendChild(div);
        });
    } catch (error) {
        console.error('Error fetching TaxPayers:', error);
        alert('Failed to fetch TaxPayers');
    }
}

// Function to search for a TaxPayer
async function searchTaxPayer() {
    const searchTid = document.getElementById('searchTid').value;
    const searchResult = document.getElementById('searchResult');

    try {
        const taxPayer = await backend.searchTaxPayer(searchTid);
        if (taxPayer) {
            searchResult.innerHTML = `
                <h3>Search Result:</h3>
                <p><strong>TID:</strong> ${taxPayer.tid}</p>
                <p><strong>Name:</strong> ${taxPayer.firstName} ${taxPayer.lastName}</p>
                <p><strong>Address:</strong> ${taxPayer.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with the given TID.</p>';
        }
    } catch (error) {
        console.error('Error searching TaxPayer:', error);
        alert('Failed to search TaxPayer');
    }
}

// Event listeners
document.getElementById('addTaxPayerForm').addEventListener('submit', addTaxPayer);

// Initial display of all TaxPayers
displayAllTaxPayers();
const fs = require('fs');
const path = require('path');
const mappingsPath = path.join(__dirname, '../shared/chromagenProfile.json');

function readMappings() {
    let rawdata = fs.readFileSync(mappingsPath);
    let jsonData = JSON.parse(rawdata);
    return jsonData.mappings;
}

// This function reads the mappings and populates the checking table
function populateCheckingTable(mappings) {


    

    
    const tableCheckingBody = document.getElementById('table-checking');

    tableCheckingBody.innerHTML = ''; // Clear any existing rows

    mappings.forEach(mapping => {
        const row = document.createElement('tr');
        const targetCell = document.createElement('td');
        const dataCheckCell = document.createElement('td');
        const resultsCheckCell = document.createElement('td');

        targetCell.textContent = mapping.targetName;
        dataCheckCell.textContent = ''; // Placeholder for future data
        resultsCheckCell.textContent = ''; // Placeholder for future data

        row.appendChild(targetCell);
        row.appendChild(dataCheckCell);
        row.appendChild(resultsCheckCell);

        tableCheckingBody.appendChild(row);
    });
}

module.exports = { populateCheckingTable };

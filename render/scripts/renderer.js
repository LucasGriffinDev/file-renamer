const fs = require('fs');
const path = require('path');
const mappingsPath = path.join(__dirname, 'renameMappings.json');
const { ipcRenderer } = require('electron');








function readMappings() {
    let rawdata = fs.readFileSync(mappingsPath);
    return JSON.parse(rawdata);
}

function writeMappings(mappings) {
    let data = JSON.stringify(mappings, null, 2);
    fs.writeFileSync(mappingsPath, data);
}

function deleteVariation(parentIndex, variationIndex) {
    let mappings = readMappings();
    mappings[parentIndex].variations.splice(variationIndex, 1);
    writeMappings(mappings);
    populateTable(mappings); // Repopulate the table after deletion
}

function updateVariation(parentIndex, variationIndex, newValue) {
    let mappings = readMappings();
    mappings[parentIndex].variations[variationIndex] = newValue;
    writeMappings(mappings);
}
function addVariation(parentIndex) {
    console.log("Parent Index:", parentIndex)
    ipcRenderer.invoke('show-prompt', 'Enter the new variation name:', '')
        .then((newVariationName) => {
            if (newVariationName) {
                let mappings = readMappings();
                mappings[parentIndex].variations.push(newVariationName);
                writeMappings(mappings);
                populateTable(mappings); // Refresh the table
            }
        })
        .catch(error => {
            console.error('Prompt error:', error);
        });


}

function ensureMappingsFileExists() {
    if (!fs.existsSync(mappingsPath)) {
        let initialData = []; // Your default data or an empty array
        writeMappings(initialData);
    }
}

function createButtons(parentIndex, variationIndex) {
    const buttonCell = document.createElement('td');
    const editButton = document.createElement('button');


    editButton.textContent = 'Edit';
    editButton.className = 'edit';
    editButton.onclick = function() {
        let mappings = readMappings();
        const currentText = mappings[parentIndex].variations[variationIndex];
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = currentText;

        // When user presses Enter, save the new text
        inputField.onkeypress = function(event) {
            if (event.key === 'Enter') {
                updateVariation(parentIndex, variationIndex, inputField.value);
                populateTable(readMappings()); // Refresh the table
            }
        };

        // Replace the text cell with the input field
        const variationCell = this.parentNode.previousSibling;
        variationCell.innerHTML = '';
        variationCell.appendChild(inputField);
        inputField.focus();
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteVariation(parentIndex, variationIndex); // Delete the variation
    };


    buttonCell.appendChild(editButton);
    buttonCell.appendChild(deleteButton);
    return buttonCell;
}

function createAddButton(parentIndex) {
    const addButtonCell = document.createElement('td');
    addButtonCell.colSpan = 3; // Span across all columns, adjust as needed

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Variation';
    addButton.className = 'add-button'; // Assign a class for styling if needed
    addButton.onclick = function() {
        addVariation(parentIndex);
    };
    addButtonCell.appendChild(addButton);
    return addButtonCell;
}


function populateTable(mappings) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear the table before repopulating

    mappings.forEach((mapping, parentIndex) => {
        const totalRows = mapping.variations.length + 1;

        mapping.variations.forEach((variation, variationIndex) => {
            const variationRow = document.createElement('tr');

            if (variationIndex === 0) {
                const targetCell = document.createElement('td');
                targetCell.textContent = mapping.targetName;
                targetCell.rowSpan = totalRows;
                variationRow.appendChild(targetCell);
            }

            const variationCell = document.createElement('td');
            variationCell.textContent = variation;
            variationRow.appendChild(variationCell);

            variationRow.appendChild(createButtons(parentIndex, variationIndex));
            tableBody.appendChild(variationRow);
        });

        // Add the extra empty row if needed
        const emptyRow = document.createElement('tr');
        const emptyVariationCell = document.createElement('td');
        emptyRow.appendChild(emptyVariationCell);
        emptyRow.appendChild(createAddButton(parentIndex)); // Implement createAddButton as needed
        tableBody.appendChild(emptyRow);
    });
}

ensureMappingsFileExists();

document.addEventListener('DOMContentLoaded', () => {
    populateTable(readMappings());
});

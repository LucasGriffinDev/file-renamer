const fs = require('fs');
const path = require('path');
const mappingsPath = path.join(__dirname, '../profiles/chromagenProfile.json');
const { ipcRenderer } = require('electron');
const {readJson } = require('../scripts/CRUD/readJson.js');
const checkForUpdates  = require('../main/update/update.js');


function writeMappings(updatedJsonData) {
    console.log('Writing mappings to file:', updatedJsonData); // Debugging
    let data = JSON.stringify(updatedJsonData, null, 2);
    fs.writeFileSync(mappingsPath, data);
    console.log('Write complete'); // Debugging
}



function deleteVariation(dataType, parentIndex, variationIndex) {
    let jsonData = readJson();
    jsonData[dataType][parentIndex].variations.splice(variationIndex, 1);

    writeMappings(jsonData); // Write the entire jsonData back to the file

    if (dataType === 'mappings') {
        populateTable(jsonData.mappings);
    } else {
        populateDeleteTable(jsonData.deleteMappings);
    }
}


function updateVariation(parentIndex, variationIndex, newValue) {
    let jsonData = readJson();
    jsonData.mappings[parentIndex].variations[variationIndex] = newValue;
    writeMappings(jsonData); // Pass the entire jsonData object
}

function addVariation(dataType, parentIndex) {
    ipcRenderer.invoke('show-prompt', 'Enter the new variation name:', '')
        .then((newVariationName) => {
            if (newVariationName) {
                let jsonData = readJson();

                if (jsonData[dataType] && jsonData[dataType][parentIndex]) {

                    jsonData[dataType][parentIndex].variations.push(newVariationName);

                    writeMappings(jsonData); // Call this function to save changes

                    if (dataType === 'mappings') {
                        populateTable(jsonData.mappings);
                    } else {
                        populateDeleteTable(jsonData.deleteMappings);
                    }
                } else {
                    console.error('Invalid dataType or parentIndex');
                }
            }
        })
        .catch(error => {
            console.error('Prompt error:', error);
        });
}

function openUserGuide() {
    ipcRenderer.invoke('open-user-guide');
}





function ensureMappingsFileExists() {
    if (!fs.existsSync(mappingsPath)) {
        let initialData = {}; // Use an empty object or the initial structure of your JSON
        (initialData);
    } else {
        console.log('File exists'); // Correct message
    }
}


function createDeleteButton(dataType, parentIndex, variationIndex) {
    const buttonCell = document.createElement('td');
    buttonCell.className = 'action-buttons';


    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';
    deleteButton.onclick = function() {
        deleteVariation(dataType, parentIndex, variationIndex);
    };



    buttonCell.appendChild(deleteButton);
    return buttonCell;
}

function createAddButton(dataType, parentIndex) {
    const addButtonCell = document.createElement('td');
    const addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.className = 'add-button';
    addButton.onclick = function() {
        addVariation(dataType, parentIndex);
    };
    addButtonCell.appendChild(addButton);
    addButtonCell.classList = 'action-buttons';
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
            variationCell.className = 'editable';
            variationCell.addEventListener('click', function() {
                // Only if it's not already an input field
                if (!this.firstChild || this.firstChild.nodeName !== 'INPUT') {
                    const inputField = document.createElement('input');
                    inputField.type = 'text';
                    inputField.value = variation;

                    // Save on Enter key
                    inputField.onkeypress = function(event) {
                        if (event.key === 'Enter') {
                            updateVariation(parentIndex, variationIndex, inputField.value);
                            populateTable(readJson().mappings); // Refresh the table
                        }
                    };

                    // Replace text with input field
                    variationCell.innerHTML = '';
                    variationCell.appendChild(inputField);
                    inputField.focus();
                }
            });
            variationRow.appendChild(variationCell);

            variationRow.appendChild(createDeleteButton('mappings', parentIndex, variationIndex)); // In populateTable
            tableBody.appendChild(variationRow);
        });

        // Add the extra empty row if needed
        const emptyRow = document.createElement('tr');
        const emptyVariationCell = document.createElement('td');
        emptyRow.appendChild(emptyVariationCell);
        emptyRow.appendChild(createAddButton('mappings', parentIndex));


        tableBody.appendChild(emptyRow);
    });
}

function populateDeleteTable(deleteMappings) {
    const deleteTableBody = document.getElementById('delete-table-body');
    deleteTableBody.innerHTML = ''; // Clear the table before repopulating

    deleteMappings.forEach((mapping, parentIndex) => {
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
            variationCell.className = 'editable';
            variationRow.appendChild(variationCell);

            variationRow.appendChild(createDeleteButton('deleteMappings', parentIndex, variationIndex)); // Corrected here
            deleteTableBody.appendChild(variationRow);
        });

        // Add the extra empty row for adding new variations, adjust if needed
        const emptyRow = document.createElement('tr');
        const emptyVariationCell = document.createElement('td');
        emptyRow.appendChild(emptyVariationCell);
        emptyRow.appendChild(createAddButton('deleteMappings', parentIndex));
        deleteTableBody.appendChild(emptyRow);
    });
}



ensureMappingsFileExists();

document.addEventListener('DOMContentLoaded', () => {

    let jsonData = JSON.parse(fs.readFileSync(mappingsPath));
    document.getElementById('targetFolder').textContent = jsonData.settings.targetDirectory;
    populateTable(jsonData.mappings);
    populateDeleteTable(jsonData.deleteMappings);
});

document.getElementById('folder-picker').addEventListener('click', () => {
    ipcRenderer.send('open-folder-dialog');
});

document.getElementById("update-app").addEventListener('click', () => {
        checkForUpdates()
}
);

ipcRenderer.on('folder-selected', (event, folderPath) => {
    document.getElementById('targetFolder').textContent = folderPath;
    let jsonData = JSON.parse(fs.readFileSync(mappingsPath));
    jsonData.settings.targetDirectory = folderPath;
    fs.writeFileSync(mappingsPath, JSON.stringify(jsonData, null, 2));
    // Call the renaming function with the selected folder path
    const { processFoldersForRenaming } = require('./scripts/naming/renaming');
    processFoldersForRenaming(folderPath);
});

document.getElementById('guide-app').addEventListener('click', () => {
    openUserGuide();
});


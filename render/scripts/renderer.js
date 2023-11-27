console.log('test')
const renameMappings = require('../shared/constants.js');
console.log(renameMappings)



function populateTable(mappings) {
    const tableBody = document.getElementById('table-body');

    mappings.forEach(mapping => {
        // Determine if we need to span the target name cell across multiple rows
        const rowspan = mapping.variations.length;



        // Function to create buttons
        const createButtons = () => {
            const buttonCell = document.createElement('td');
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = function() {
                // Logic to handle editing
                alert('Edit button clicked');

            };

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function() {
                // Logic to handle deletion
                alert('delete button clicked');

            };

            buttonCell.appendChild(editButton);
            buttonCell.appendChild(deleteButton);
            return buttonCell;
        };

        



        // Create the first row for each mapping
        const firstRow = document.createElement('tr');
        const targetCell = document.createElement('td');
        targetCell.textContent = mapping.targetName;
        targetCell.rowSpan = rowspan; // Set the rowspan to the number of variations
        firstRow.appendChild(targetCell);

        // Add the first variation in the second cell of the first row
        if (rowspan > 0) {
            const firstVariationCell = document.createElement('td');
            firstVariationCell.textContent = mapping.variations[0];
            firstRow.appendChild(firstVariationCell);
            firstRow.appendChild(createButtons()); // Add buttons for the first variation
        }

        // Append the first row to the table body
        tableBody.appendChild(firstRow);

        // Add subsequent rows for the remaining variations
        for (let i = 1; i < rowspan; i++) {
            const variationRow = document.createElement('tr');
            const variationCell = document.createElement('td');
            variationCell.textContent = mapping.variations[i];
            variationRow.appendChild(variationCell);
            variationRow.appendChild(createButtons()); // Add buttons for each variation
            tableBody.appendChild(variationRow);
        }
    });
}

// Call `populateTable` when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    populateTable(renameMappings);
});

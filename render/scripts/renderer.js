console.log('test')
const renameMappings = require('../shared/constants.js');
console.log(renameMappings)



function populateTable(mappings) {
    const tableBody = document.getElementById('table-body');

    mappings.forEach(mapping => {
        // Determine the total number of rows needed, including the extra empty row
        const totalRows = mapping.variations.length + 1;

        // Function to create edit and delete buttons
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
                alert('Delete button clicked');
            };



            buttonCell.appendChild(editButton);
            buttonCell.appendChild(deleteButton);
            return buttonCell;
        };

        const createAddButton = () => {
            const addButtonCell = document.createElement('td');
            const addButton = document.createElement('button');
            addButton.textContent = 'Add Variation';
            addButton.onclick = function() {
                alert('Add Variation clicked');
            };
            addButtonCell.appendChild(addButton);
            return addButtonCell;
        };

        // Create rows for each variation
        mapping.variations.forEach((variation, index) => {
            const variationRow = document.createElement('tr');

            // For the first variation, add the target name cell
            if (index === 0) {
                const targetCell = document.createElement('td');
                targetCell.textContent = mapping.targetName;
                targetCell.rowSpan = totalRows; // Span across all variation rows plus the extra empty row
                variationRow.appendChild(targetCell);
            }

            // Variation cell
            const variationCell = document.createElement('td');
            variationCell.textContent = variation;
            variationRow.appendChild(variationCell);

            // Edit and Delete buttons
            variationRow.appendChild(createButtons());

            // Append the variation row to the table body
            tableBody.appendChild(variationRow);
        });

        // Add the extra empty row
        const emptyRow = document.createElement('tr');
        const emptyVariationCell = document.createElement('td'); // This will be the empty cell
        emptyRow.appendChild(emptyVariationCell);
        emptyRow.appendChild(createAddButton()); // Add buttons for the empty row
        tableBody.appendChild(emptyRow);
    });
}

// Call `populateTable` when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    populateTable(renameMappings);
});


// Call `populateTable` when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    populateTable(renameMappings);
});

const fs = require('fs');
const path = require('path');

// Path to the JSON file
const mappingsPath = path.join(__dirname, '../../profiles/chromagenProfile.json');

// Read the delete mappings JSON file
const deleteMappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8')).deleteMappings;
console.log('Delete Mappings:', deleteMappings);

// Function to delete files in a given folder based on mappings
function deleteFilesInFolder(folderPath) {
    fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the folder:', err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(folderPath, entry.name);

            // If entry is a directory, recursively call this function
            if (entry.isDirectory()) {
                deleteFilesInFolder(fullPath);
            } else {
                // Process file deletion
                deleteMappings.forEach(mapping => {
                    if (mapping.variations.some(variation => entry.name.includes(variation))) {
                        fs.unlink(fullPath, err => {
                            if (err) {
                                console.error(`Error deleting ${entry.name}:`, err);
                            } else {
                                console.log(`Deleted ${entry.name}`);
                            }
                        });
                    }
                });
            }
        });
    });
}

// Function to process each folder in the target directory
function processFoldersForDeletion(folderPath) {
    fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the target directory:', err);
            return;
        }

        // Process each folder and file within the target directory
        entries.forEach(folder => {
            const innerFolderPath = path.join(folderPath, folder.name);
            console.log(`Processing folder/file: ${folder.name}`);
            deleteFilesInFolder(innerFolderPath);
        });
    });
}

module.exports = { processFoldersForDeletion };

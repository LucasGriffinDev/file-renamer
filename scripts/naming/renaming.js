
const os = require('os');
const path = require('path');
const fs = require('fs');



// Get the path to the user's Downloads directory from json file
const mappingsPath = path.join(__dirname, '../../profiles/chromagenProfile.json');

// Read the rename mappings JSON file
const renameMappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8')).mappings;

// Regex to match folders with six-digit names
const folderRegex = /\d{6}/;

// Function to rename files in a given folder based on mappings
function renameFilesInFolder(folderPath) {
    fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the folder:', err);
            return;
        }

        entries.forEach(entry => {
            const fullPath = path.join(folderPath, entry.name);

            // If entry is a directory, recursively call this function
            if (entry.isDirectory()) {
                renameFilesInFolder(fullPath);
            } else {
                // Process file renaming
                renameMappings.forEach(mapping => {
                    if (mapping.variations.some(variation => entry.name.includes(variation))) {
                        const newFileName = mapping.targetName + path.extname(entry.name);
                        const newFilePath = path.join(folderPath, newFileName);

                        fs.rename(fullPath, newFilePath, err => {
                            if (err) {
                                console.error(`Error renaming ${entry.name} to ${newFileName}:`, err);
                            } else {
                                console.log(`Renamed ${entry.name} to ${newFileName}`);
                            }
                        });
                    }
                });
            }
        });
    });
}


// Function to process each folder in the Downloads directory
function processFoldersForRenaming(folderPath) {
    fs.readdir(folderPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the Downloads directory:', err);
            return;
        }

        // Filter for directories that match the regex and call renameFilesInFolder on each
        entries
            .filter(entry => entry.isDirectory() && folderRegex.test(entry.name))
            .forEach(folder => {
                const innerFolderPath = path.join(folderPath, folder.name);
                console.log(`Processing folder: ${folder.name}`);
                renameFilesInFolder(innerFolderPath);
            });
    });
}

module.exports = { processFoldersForRenaming };

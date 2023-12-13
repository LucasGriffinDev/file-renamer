
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
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            console.error('Error reading the folder:', err);
            return;
        }

        files.forEach(file => {
            // Ignore directories
            if (fs.statSync(path.join(folderPath, file)).isDirectory()) {
                return;
            }

            // Check each file against the rename mappings
            renameMappings.forEach(mapping => {
                // Check if the file name includes any variation from the mapping
                if (mapping.variations.some(variation => file.includes(variation))) {
                    const newFileName = mapping.targetName + path.extname(file);
                    const newFilePath = path.join(folderPath, newFileName);

                    // Rename the file
                    fs.rename(path.join(folderPath, file), newFilePath, err => {
                        if (err) {
                            console.error(`Error renaming ${file} to ${newFileName}:`, err);
                        } else {
                            console.log(`Renamed ${file} to ${newFileName}`);
                        }
                    });
                }
            });
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

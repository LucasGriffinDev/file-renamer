const os = require('os');


// Get the path to the user's Downloads directory
const downloadsPath = path.join(os.homedir(), 'Downloads');

const targetFolder = document.getElementById('targetFolder');
targetFolder.textContent = downloadsPath;


const renameMappings = JSON.parse(fs.readFileSync(mappingsPath, 'utf8'));

// Regex to match folders with six-digit names
const folderRegex = /\d{6}/;

// Function to print contents of all folders that match the regex

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

            renameMappings.forEach(mapping => {
                mapping.variations.forEach(variation => {
                    if (file.includes(variation)) {
                        const newFileName = mapping.targetName + path.extname(file);
                        const newFilePath = path.join(folderPath, newFileName);

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
    });
}

function printFolderContents() {




    if (fs.existsSync(mappingsPath)) {
        console.log('mappingsPath:', readMappings());
    } else {
        console.error('mappingsPath does not exist:', mappingsPath);
    }
    // Read the contents of the Downloads directory
    fs.readdir(downloadsPath, { withFileTypes: true }, (err, entries) => {
        if (err) {
            console.error('Error reading the Downloads directory:', err);
            return;
        }

        // Filter for directories that match the regex
        const folders = entries.filter(entry => entry.isDirectory() && folderRegex.test(entry.name));

        // Loop through each matching folder and rename its contents
        folders.forEach(folder => {
            const folderPath = path.join(downloadsPath, folder.name);
            console.log(`Processing folder: ${folder.name}`);

            // Call renameFilesInFolder for each folder
            renameFilesInFolder(folderPath);
        });
    });
}

// Call the function to print folder contents
// printFolderContents();

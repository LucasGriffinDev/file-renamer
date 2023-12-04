

const os = require('os');


// Get the path to the user's Downloads directory
const downloadsPath = path.join(os.homedir(), 'Downloads');

const targetFolder = document.getElementById('targetFolder');
targetFolder.textContent = downloadsPath;

// Regex to match folders with six-digit names
const folderRegex = /\d{6}/;

// Function to print contents of all folders that match the regex
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

        // Loop through each matching folder and print its contents
        folders.forEach(folder => {
            const folderPath = path.join(downloadsPath, folder.name);
            console.log(`Contents of folder: ${folder.name}`);

            // Read the contents of the folder
            fs.readdir(folderPath, (err, files) => {
                if (err) {
                    console.error(`Error reading the folder ${folder.name}:`, err);
                } else {
                    // Print out each file in the folder
                    files.forEach(file => {
                        console.log(`- ${file}`);
                    });
                }
            });
        });
    });
}

// Call the function to print folder contents
printFolderContents();

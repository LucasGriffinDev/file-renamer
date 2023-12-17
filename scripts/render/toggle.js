const { processFoldersForRenaming } = require('../scripts/naming/renaming.js');

let appStatus = false

document.getElementById('start-app').addEventListener('click', () => {
    const slider = document.getElementById('start-app');
    const targetFolderPath = document.getElementById('targetFolder').textContent; // Get the current target folder path
    processFoldersForRenaming(targetFolderPath); // Pass the target folder path to the function

});

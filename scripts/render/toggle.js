const { processFoldersForRenaming } = require('../scripts/naming/renaming.js');

let appStatus = false

document.getElementById('toggleButton').addEventListener('click', () => {
    const slider = document.getElementById('slider');
    const targetFolderPath = document.getElementById('targetFolder').textContent; // Get the current target folder path

    if (appStatus === false) {
        appStatus = !appStatus;
        processFoldersForRenaming(targetFolderPath); // Pass the target folder path to the function
        slider.style.backgroundColor = 'green';
        slider.innerText = 'ON';
    } else {
        appStatus = !appStatus;
        slider.style.backgroundColor = 'red';
        slider.innerText = 'OFF';
    }
});

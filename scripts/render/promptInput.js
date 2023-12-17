const { ipcRenderer } = require('electron');

document.getElementById('inputField').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the default action (form submission)
        const value = document.getElementById('inputField').value;
        ipcRenderer.send('prompt-response', value);
    }
});

document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault();
    const value = document.getElementById('inputField').value;
    ipcRenderer.send('prompt-response', value);
});

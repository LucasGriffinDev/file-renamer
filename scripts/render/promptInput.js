const { ipcRenderer } = require('electron');
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault()
    const value = document.getElementById('inputField').value;
    ipcRenderer.send('prompt-response', value);
});


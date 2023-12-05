const { ipcRenderer } = require('electron');
document.getElementById('submitButton').addEventListener('click', (e) => {
    e.preventDefault()
    console.log('clicked')
    const value = document.getElementById('inputField').value;
    console.log(value)
    ipcRenderer.send('prompt-response', value);
});


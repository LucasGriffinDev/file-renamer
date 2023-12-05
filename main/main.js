const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const userPrompt = require('electron-osx-prompt');
const path = require('path');


ipcMain.handle('show-prompt',
    async (event, message, defaultValue) => {
        const win = new BrowserWindow({
            width: 400,
            height: 300,
            webPreferences: {
                preload: path.join(__dirname, './preload.js'),
                nodeIntegration: true,
                contextIsolation: false
            }
        })
        win.loadFile('./render/prompt.html');

        return new Promise((resolve) => {
            ipcMain.once('prompt-response', (_, value) => {
                resolve(value);
                win.close();
            });
        });
    });

ipcMain.on('open-folder-dialog', (event) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }).then(result => {
        if (!result.canceled) {
            event.sender.send('folder-selected', result.filePaths[0]);
        }
    }).catch(err => {
        console.error('Failed to open folder dialog:', err);
    });
});


function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('./render/index.html');
}

app.whenReady().then(createWindow);

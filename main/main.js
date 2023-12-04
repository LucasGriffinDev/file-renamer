const { app, BrowserWindow, ipcMain } = require('electron');
const userPrompt = require('electron-osx-prompt');

ipcMain.handle('show-prompt', async (event, message, defaultValue) => {
    const win = new BrowserWindow({
        width: 400,
        height: 300,
        webPreferences: {
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

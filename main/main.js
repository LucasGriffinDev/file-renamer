const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const userPrompt = require('electron-osx-prompt');
const path = require('path');
const { autoUpdater } = require('electron-updater');


//prompt for new entry input
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

// to choose a new folder

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

// the main window of the app
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    console.log('loading file')
    win.loadFile('./render/index.html');
    console.log('updater started')
    autoUpdater.checkForUpdatesAndNotify();
    console.log('updater finished?')
    // Event: Update Available
    autoUpdater.on('update-available', () => {
        console.log('Update available. Downloading...');
        alert('Update available. Downloading...');
    });

    // Event: Update Downloaded
    autoUpdater.on('update-downloaded', () => {
        console.log('Update downloaded. It will be installed on restart.');
        alert('Update downloaded. It will be installed on restart.');
        autoUpdater.quitAndInstall();

    });
}

app.whenReady().then(createWindow);

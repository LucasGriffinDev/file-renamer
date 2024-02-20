const { app, BrowserWindow, ipcMain, dialog } = require('electron');
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


// user guide
ipcMain.handle('open-user-guide', (event) => {
    const win = new BrowserWindow({
        width: 700,
        height: 500,
        webPreferences: {
            nodeIntegration: false, // Changed for security
            contextIsolation: true   // Changed for security
        }
    });
    win.loadFile('./render/userGuide.html');
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
function createMainWindow() {
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

ipcMain.on('trigger-update-check', (event) => {
    console.log('ipc received')
        checkForUpdates()
});

function checkForUpdates() {
    console.log('checkForUpdates called');
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
        console.log('Update available. Downloading...');
        // Here, you would ideally inform the user that an update is available and is being downloaded.
        // This can be done through your app's UI.
    });

    autoUpdater.on('update-not-available', () => {
        console.log('No updates available.');
        // Inform the user that the application is up-to-date.
    });

    autoUpdater.on('update-downloaded', () => {
        console.log('Update downloaded. It will be installed on restart.');
        // Prompt the user to restart the app to install the update.
        autoUpdater.quitAndInstall();
    });

    autoUpdater.on('error', (err) => {
        console.error('Update error:', err);
        // Notify the user that an error occurred while trying to update.
    });
}
app.whenReady().then(createMainWindow);

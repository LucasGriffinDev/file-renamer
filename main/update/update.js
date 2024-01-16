// const { autoUpdater } = require('electron-updater');

function checkForUpdates() {
    console.log('checkForUpdates called');
    alert('updating!')
    // autoUpdater.checkForUpdatesAndNotify();
    //
    // autoUpdater.on('update-available', () => {
    //     console.log('Update available. Downloading...');
    //     win.webContents.send('update-message', 'Update available. Downloading...');
    // });
    //
    // autoUpdater.on('update-not-available', () => {
    //     console.log('No updates available.');
    //     win.webContents.send('update-message', 'No updates available.');
    // });
    //
    // autoUpdater.on('update-downloaded', () => {
    //     console.log('Update downloaded. It will be installed on restart.');
    //     win.webContents.send('update-message', 'Update downloaded. It will be installed on restart.');
    //     autoUpdater.quitAndInstall();
    // });
    //
    // autoUpdater.on('error', (err) => {
    //     console.error('Update error:', err);
    //     win.webContents.send('update-message', `Update error: ${err.message}`);
    // });
}

module.exports = checkForUpdates;
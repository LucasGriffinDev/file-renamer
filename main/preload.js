const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    triggerUpdateCheck: () => ipcRenderer.send('trigger-update-check'),
    openFolderDialog: () => ipcRenderer.send('open-folder-dialog')

});

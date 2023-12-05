const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    openFolderDialog: () => ipcRenderer.send('open-folder-dialog')
});

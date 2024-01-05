const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('BillPc', {
  newDocument: (filepath) => ipcRenderer.send('bill/new-file', filepath),
  saveDocument: (data) => ipcRenderer.sendSync('bill/save-file', data),
  openDocument: () => ipcRenderer.sendSync('bill/open-file'),

  setTitle: (title) => {
    ipcRenderer.send('document/set-title', title)
  },

  loadDocument: (filepath) => ipcRenderer.sendSync('bill/load-file', filepath)
})
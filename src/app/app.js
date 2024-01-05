const { BrowserWindow, ipcMain, Menu, MenuItem } = require('electron')
const { join } = require('path')

function Launcher() {
  const launcherWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    maximizable: false,
    center: true,
    resizable: false,
    frame: false,
    transparent: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: false,
    icon:  join(__dirname, '..', 'icons', 'setup.png'),
    webPreferences: {
      preload: join(__dirname, '..', 'app', 'preload.js'),
    },
  });
  launcherWindow.loadFile(join(__dirname, '..', 'views', 'launcher.html'));
};

function Document( filepath ) {
  const documentWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    titleBarStyle: 'hidden',
    icon:  join(__dirname, '..', 'icons', 'app.png'),
    titleBarOverlay: {
      height:48,
      color: '#fcfcfc',
      symbolColor: '#f7567c'
    },
    webPreferences: {
      preload: join(__dirname, '..', 'app', 'preload.js'),
    },
  });

  ipcMain.on('document/set-title', (event, title) => {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.setTitle(title)
  })

  const encoded_filepath = encodeURI( filepath )

  documentWindow.maximize();
  documentWindow.loadFile(join(__dirname, '..', 'views', 'document.html'), {
    query : {
      "filepath": encoded_filepath
    }
  });
};


module.exports = { Launcher, Document }
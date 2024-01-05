const { BrowserWindow, ipcMain, dialog } = require('electron')
const { join } = require('path')

function Launcher() {
  const launcherWindow = new BrowserWindow({
    width: 800,
    height: 600,
    maximizable: false,
    center: true,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height:48,
      color: '#fcfcfc',
      symbolColor: '#f7567c'
    },
    icon:  join(__dirname, '..', 'icons', 'setup.png'),
    webPreferences: {
      preload: join(__dirname, '..', 'app', 'preload.js'),
    },
  });
  launcherWindow.loadFile(join(__dirname, '..', 'views', 'launcher.html'));
};

function Document( filepath = null ) {
  const documentWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    titleBarStyle: 'hidden',
    titleBarOverlay: {
      height:48,
      color: '#fcfcfc',
      symbolColor: '#f7567c'
    },
    icon:  join(__dirname, '..', 'icons', 'app.png'),
    webPreferences: {
      preload: join(__dirname, '..', 'app', 'preload.js'),
    },
  });

  ipcMain.on('document/set-title', (event, title) => {
      const webContents = event.sender
      const win = BrowserWindow.fromWebContents(webContents)
      win.setTitle(title)
  })

  documentWindow.maximize();

  if( filepath && filepath != null){
    const encoded_filepath = encodeURI( filepath )  
    documentWindow.loadFile(join(__dirname, '..', 'views', 'document.html'), {
      query : {
        "filepath": encoded_filepath
      }
    });
  }else{  
    documentWindow.loadFile(join(__dirname, '..', 'views', 'document.html'));
  }
};


module.exports = { Launcher, Document }
const { app, BrowserWindow, dialog } = require('electron')
const { writeFile } = require('fs');

const { Launcher } = require('./app/app')

if (require('electron-squirrel-startup')) app.quit();

app.on('ready', () => {
  Launcher();
});

const filters = [ { name: 'teste', extensions: ['json'] } ];

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    Launcher();
  }
});

require('./app/remote');


async function teste(){  
  const { filePath, canceled } = await dialog.showSaveDialog({ filters });

  if (canceled) {
      return false;
  }
  
  const data = { 
    argv: process.argv, 
    argv0: process.argv0, 
    execArgv: process.execArgv, 
    execPath: process.execPath
  } 

  writeFile(filePath, JSON.stringify( data ), 'utf-8', function(err, result) {
    console.log("salvou um trem")
  });
}
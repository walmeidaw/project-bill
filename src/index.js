const { app, BrowserWindow } = require('electron')

const { Launcher } = require('./app/app')

if (require('electron-squirrel-startup')){
  app.quit();
}

app.on('ready', () => {  
  if(process.argv[1] != undefined && process.argv[1] != null){
    try{
      testeProcess().then( () => Document(process.argv[1]) )
      return;
    }catch(err){

    }
  }

  Launcher();
});

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
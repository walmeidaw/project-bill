const { ipcMain, dialog } = require('electron');
const { filters, readfile, savefile } = require('./fileHandle')

const { Document } = require('./app')

ipcMain.on('bill/new-file', async (event, filepath = null) => {
    Document( filepath );
    event.reply('main/new-file', { status: 200, msg: 'Novo documento criado' })
})

ipcMain.on('bill/save-file', async function (event, data) {
    if( data.filepath == null ){
        const { filePath, canceled } = await dialog.showSaveDialog({ filters });

        if (canceled) {
            event.reply('main/save-file', { status: 400, msg: 'Usuário cancelou' })
            return false;
        }
        
        data.filepath = filePath
    }

    savefile(data.filepath, JSON.stringify(data), {
        callback: ( result ) => {
            event.returnValue = data
            event.reply('main/save-file', { status: 200, result })
        }
    })
})

ipcMain.on('bill/open-file', async (event) => {
    const { filePaths, canceled } = await dialog.showOpenDialog({ filters });

    if (canceled) {
        event.reply('main/open-file', { status: 400, msg: 'Usuário cancelou' })
        return false;
    }

    event.returnValue = filePaths[0]
})

ipcMain.on('bill/load-file', async (event, filepath) =>{
    readfile(filepath,{
        callback : ( result )=>{
            event.returnValue = result
            event.reply('main/open-file', { status: 200, result })
        }
    })
})
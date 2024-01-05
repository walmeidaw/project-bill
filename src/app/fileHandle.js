const { app } = require('electron')
const { writeFile, readFile } = require('fs');
const { serialization, deserialization } = require('./serialization');

const filters = [ { name: 'Coleção Bill PC', extensions: ['billpc'] } ];

function readfile(
        filepath,
        options = { callback: ()=>{} }
    ){

    if(!filepath){
        throw new Error("Missing file path");
    }

    readFile( filepath, (err, result ) => {
        if(err){
            throw new Error(`Fail to read file :: ${ err }`);
        }

        try {
            const data = deserialization(result);
            options.callback( data )
        } catch (error) {
            throw new Error(error);
        }
    })
}

function savefile(
        filepath, 
        data,
        options = { callback: ()=>{} }
    ){

    if(!data){
        throw new Error("Missing data");
    }

    if(!filepath){
        throw new Error("Missing file path");
    }

    const data_result = serialization( data );

    writeFile(filepath, data_result, 'utf-8', function(err, result) {
        if(err){
            throw new Error(`Fail to save file :: ${ err }`);
        }

        try{
            app.addRecentDocument(filepath)
        }catch(err){
            console.error( err );
        }
        
        options.callback( result )
    });
}


module.exports = { savefile, readfile, filters }
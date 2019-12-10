//RETURNS A SINGLE FILE AS A PROMISE, MUST BE USED IN AN ASYNC FUNCTION
//TAKES IN TYPES OF FILES YOU ARE ALLOWING TO BE SELECTED
//EXAMPLE CALL: filePath = await openFile(['csv', 'txt']);
//DOES NOT RETURN

const {dialog} = require('electron').remote;
var request = require('request');

async function openFile(exts){
    console.log("deeeee");
    return new Promise(resolve => {
    dialog.showOpenDialog({
        properties: ['openFile'],
        filters: [{name: 'file', extensions: exts}]
    }, function(filePaths){
        console.log(filePaths);
        if(filePaths !== undefined){
            console.log("ccccc");
            resolve(filePaths[0]);
        }
        else{
            console.log("ddddd");
            return(undefined);
        }
    })
    })
}
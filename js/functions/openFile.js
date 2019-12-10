//RETURNS A SINGLE FILE AS A PROMISE, MUST BE USED IN AN ASYNC FUNCTION
//TAKES IN TYPES OF FILES YOU ARE ALLOWING TO BE SELECTED
//EXAMPLE CALL: filePath = await openFile(['csv', 'txt']);
//  popUp("Hello", document.getElementById("formSendTextMessageNumber"))
//DOES NOT RETURN

const {dialog} = require('electron').remote;
var request = require('request');

async function openFile(exts){
    return new Promise(function(resolve, reject) {
        dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{name: 'file', extensions: exts}]
        }).then(result => {
            if(result !== undefined){
                resolve(result.filePaths[0]);
            }
            else{
                return reject(undefined);
            }
        })
    });
}
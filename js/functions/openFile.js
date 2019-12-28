//TAKES IN ALLOWED EXTENSIONS AND CALLBACK FUCTION
//CALLS CALLBACK FUNCTION WITH SINGLE FILE PATH
//EXAMPLE CALL: openFile(['txt', 'csv'], interpretFile);
//DOES NOT RETURN

const {dialog} = require('electron').remote;

function openFile(exts, callb){
    options = {
        properties: ['openFile'],
        filters: [{name: 'file', extensions: exts}]
    };
    dialog.showOpenDialog(options).then(result => {
        if(result !== undefined){
            callb(result.filePaths[0]);
        }
    });
}
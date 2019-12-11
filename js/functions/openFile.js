//RETURNS A SINGLE FILE AS A PROMISE, MUST BE USED IN AN ASYNC FUNCTION
//TAKES IN TYPES OF FILES YOU ARE ALLOWING TO BE SELECTED
//EXAMPLE CALL: filePath = await openFile(['csv', 'txt']);
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
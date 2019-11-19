const remote = require('electron').remote;
const url = require('url');
const path = require('path');

function loadWindow(file){
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      autoHideMenuBar: true,
      width: 600,
      minWidth: 600,
      height: 500,
      minHeight: 500,
      webPreferences:{
          nodeIntegration: true
      }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'html/' + file),
        protocol:'file:',
        slashes:true
    }));
}
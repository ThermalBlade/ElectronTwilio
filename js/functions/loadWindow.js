//LOADS NEW WINDOW (IN SMALL FORMAT)
//TAKES IN FILE PATH (FROM CURRENT FOLDER)
//TAKES IN OPTIONAL PARAMETER WIDTH AND HEIGHT (DEFAULT 600, 500 pxiels)
//EXAMPLE CALLS: 
//  loadWindow(singleText.html)
//  loadWindow(singleText.html, 900, 900)
//DOES NOT RETURN

const remote = require('electron').remote;
const url = require('url');
const path = require('path');

function loadWindow(file, w = 600, h = 500){
    if(w < 600){w = 600;}
    if(h < 500){h = 500;}
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
      autoHideMenuBar: true,
      width: w,
      minWidth: 600,
      height: h,
      minHeight: 500,
      webPreferences:{
          nodeIntegration: true
      }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, file),
        protocol:'file:',
        slashes:true
    }));
}
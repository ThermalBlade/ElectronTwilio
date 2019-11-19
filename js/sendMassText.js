const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const client = require('twilio')(accountSid, authToken);
//Fetch colors from CSS
var bodyStyles = window.getComputedStyle(document.body);
var dzLineColor = bodyStyles.getPropertyValue('--drop-zone-line-color'); 
var dzHighlightColor = bodyStyles.getPropertyValue('--drop-zone-line-highlight');

var filePath = "";

$('#formSendTextMessageMessage').autogrow()

function sendSingleText(){
    var pnumber = document.getElementById("formSendTextMessageNumber").value;
    pnumber = pnumber.replace(/\D/g,'');
    if(pnumber.length === 10){
        pnumber = '+1' + pnumber;
    }
    else if(pnumber.length === 11 && pnumber[0] === '1'){
        pnumber = '+' + pnumber;
    }
    else if(pnumber.length !== 12){
        validPhoneNumberPop();
        return;
    }
    var mes = document.getElementById("formSendTextMessageMessage").value;
    client.messages.create({
        body: mes,
        from: process.env.TW_FROM_PHONE_NUMBER,
        statusCallback: 'https://postb.in/b/1572911748562-2505160190630',
        to: pnumber
    });
    document.getElementById("formSendTextMessage").reset();
    sentTextPop();
}

//Drop Zone Handler
function dropHandler(ev){
    ev.preventDefault();
    if(openingFile === false){
      if(ev.dataTransfer.items){
        if(ev.dataTransfer.items.length === 1){
          if(ev.dataTransfer.items[0].kind === 'file'){
            let file = ev.dataTransfer.items[0].getAsFile();
            let path = file.path;
            let fileType = path.substr(path.length - 3);
            if(fileType !== 'xlsx' && fileType !== 'csv'){
              throwFileError("Please select a .xlsx or .csv file.");
            }
            else{
              //This is the passing condition for the file, openFile.js accesses this global variable.
              filePath = path;
            }
          }
          else{
            throwFileError("Please select a valid file.");
          }
        }
        else{
          throwFileError("Please only select one document.");
        }
      }
    }
    else{
      throwFileError("Please select a .xlsx or .csv file.");
    }
}
//Glow up if file is over
function dragOverHandler(ev){
    ev.preventDefault();
    changeDivs("border: 2px dashed " + dzHighlightColor + ";");
}
//Glow down if file leaves area
function dragLeaveHandler(ev){
    changeDivs("border: 2px dashed " + dzLineColor + ";");
}
//Called if the document isn't a standard HEC-1 output
function throwFileError(message){
    dialog.showErrorBox("Invalid Document", message);
    dragLeaveHandler();
}
//Adjusts css boxes based on window size
function changeDivs(addOns = ""){
    let newDropZoneInsert = addOns;
    document.getElementById('drop_zone').setAttribute("style", newDropZoneInsert);
}
  
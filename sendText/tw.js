const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const client = require('twilio')(accountSid, authToken);

$('#formSendTextMessageMessage').autogrow()

function myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    setTimeout(function(){
        popup.classList.toggle("unshow");
    }, 2000);
  }

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

        return;
    }
    var message = document.getElementById("formSendTextMessageMessage").value;
    console.log(pnumber);
    /*client.messages.create({
        body: message,
        from: process.env.TW_FROM_PHONE_NUMBER,
        to: pnumber
    });*/
}
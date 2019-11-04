const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const client = require('twilio')(accountSid, authToken);

$('#formSendTextMessageMessage').autogrow()

function sendSingleText(){
    var pnumber = document.getElementById("formSendTextMessageNumber").value;
    var message = document.getElementById("formSendTextMessageMessage").value;
    client.messages.create({
        body: message,
        from: process.env.TW_FROM_PHONE_NUMBER,
        to: pnumber
    });
}
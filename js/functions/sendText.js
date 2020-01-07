//SENDS TEXT TO PHONE NUMBER
//TAKES IN PHONE NUMBER IN ANY FORMAT, AND MESSAGE TO SEND
//EXAMPLE CALLS: 
//  sendText("(1)3033033033", "Hello")
//  sendText("+1(303)303-3033", "Hello")
//  sendText("3033033033", "Hello")
//RETURNS TRUE IF TEXT WAS SEND AND FALSE IF THE PHONE NUMBER IS INVALID

const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendText(pnumber, message){
    pnumber = pnumber.replace(/\D/g,'');
    if(pnumber.length === 10){
        pnumber = '+1' + pnumber;
    }
    else if(pnumber.length === 11 && pnumber[0] === '1'){
        pnumber = '+' + pnumber;
    }
    else if(pnumber.length !== 12){
        return(false);
    }
    /*client.messages.create({
        body: message,
        from: process.env.TW_FROM_PHONE_NUMBER,
        statusCallback: 'https://postb.in/b/1572911748562-2505160190630',
        to: pnumber
    });*/
    console.log(pnumber, message);
    return(true);
}
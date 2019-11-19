const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const client = require('twilio')(accountSid, authToken);

$('#formSendTextMessageMessage').autogrow()

function popUp(message, element){
    var div = document.createElement("div");
    div.className = "popup";
    var span = document.createElement("span");
    span.className = "popuptext";
    span.innerHTML = message;
    div.appendChild(span);
    element.parentNode.insertBefore(div, element)
    span.classList.toggle("show");
    setTimeout(function(){
        span.classList.toggle("show");
        div.parentNode.removeChild(div);
    }, 3000);
}

function sentTextPop() {
    /*var popup = document.getElementById("sentTextPopup");
    popup.classList.toggle("show");
    setTimeout(function(){
        popup.classList.toggle("show");
    }, 3000);*/
    popUp("Sent Text", document.getElementById("formSendTextMessageNumber"));
}

function validPhoneNumberPop() {
    var popup = document.getElementById("validPhonePopup");
    popup.classList.toggle("show");
    setTimeout(function(){
        popup.classList.toggle("show");
    }, 3000);
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
        validPhoneNumberPop();
        return;
    }
    var mes = document.getElementById("formSendTextMessageMessage").value;
    /*client.messages.create({
        body: mes,
        from: process.env.TW_FROM_PHONE_NUMBER,
        statusCallback: 'https://postb.in/b/1572911748562-2505160190630',
        to: pnumber
    });*/
    document.getElementById("formSendTextMessage").reset();
    sentTextPop();
}
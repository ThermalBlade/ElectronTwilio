//FUNCTIONALITY FOR singleText.html

function singleText(){
    function sentTextPop() {
        popUp("Text Sent.", document.getElementById("formSendTextMessageMessage"));
    }
    function validPhoneNumberPop() {
        popUp("Please enter a valid phone number.", document.getElementById("formSendTextMessageNumber"));
    }
    var pnumber = document.getElementById("formSendTextMessageNumber").value;
    var mes = document.getElementById("formSendTextMessageMessage").value;
    var st = sendText(pnumber, mes);
    if(st){
        document.getElementById("formSendTextMessage").reset();
        sentTextPop();
    }
    else{
        validPhoneNumberPop();
    }
}

$('#formSendTextMessageMessage').autogrow()
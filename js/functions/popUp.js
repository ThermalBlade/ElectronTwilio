//PLACES A POP-UP MESSAGE ON SCREEN
//TAKES IN POP-UP MESSAGE AND LOCATION (LOCATION IN FORM OF HTML ELEMENT)
//EXAMPLE CALL: 
//  popUp("Hello", document.getElementById("formSendTextMessageNumber"))
//DOES NOT RETURN

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
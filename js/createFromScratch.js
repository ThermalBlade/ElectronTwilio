//FUNCTIONALITY FOR createFromScratch.html

//Autogrow the form
$('#formParameters').autogrow()

function createGroup(){
    var parms = document.getElementById('formParameters').value;
    var newParm = "";
    for(i = 0; i < parms.length; i ++){
        car = parms.charAt(i);
        if(car != ',' && i !== parms.length - 1){
            newParm += car;
        }
        else{
            if(i === parms.length - 1){
                newParm += car;
            }
            newParm = newParm.replace(/\s/g, "");
            var cell = document.createElement("td");
            var textNode = document.createTextNode(newParm);
            cell.appendChild(textNode);
            document.getElementById('showRow').appendChild(cell);
            newParm = "";
        }
    }
    var groupName = document.getElementById("formGroupName").value;
    fetchTable(groupName, createGroup2);
}

function createGroup2(sb){
    function groupNameExistsPopup() {
        popUp("Group name already exists.", document.getElementById("formGroupName"));
    }
    if(sb.includes("not found")){
        var form = document.createElement('form');
        var top = document.createElement('p');
        var topText = document.createTextNode('Confirm New Group');
        top.appendChild(topText);
        form.appendChild(top);
        var button = document.createElement('input');
        button.type = "button";
        button.value = "Confirm Group";
        button.onclick = createGroup3;
        form.appendChild(button);
        document.getElementById('container').appendChild(form);
    }
    else{
        groupNameExistsPopup();
        document.getElementById("formGroupName").value = '';
    }
}

function createGroup3(){
    var ats = [];
    var title = document.getElementById('formGroupName').value;
    var row = document.getElementById('showRow');
    for(i = 0; i < row.childElementCount; i ++){
        ats.push(row.getElementsByTagName('td')[i].innerHTML);
    }
    createEmptyTable(title, ats, createGroup4);
}

function createGroup4(){
    console.log("SUCCESS");
}
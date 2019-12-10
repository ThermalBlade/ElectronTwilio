import { kMaxLength } from "buffer";

//Fetch colors from CSS
var bodyStyles = window.getComputedStyle(document.body);
var dzLineColor = bodyStyles.getPropertyValue('--drop-zone-line-color'); 
var dzHighlightColor = bodyStyles.getPropertyValue('--drop-zone-line-highlight');

var filePath = "";

//Autogrow the textbox on this page.
$('#formSendTextMessageMessage').autogrow()

function interpretFile(filePath){
    var lineCounter = 0;
	var eachLine = Promise.promisify(lineReader.eachLine);
	var matrix = [];
    eachLine(filePath, function(line){
		var row = [];
		var char;
		var phrase = "";
		var checkNext = false;
		for(var i = 0; i < line.length; i++){
			char = line.charAt(i);
			if(checkNext){
				row.push(phrase)
				if(char == '"'){
					matrix.push(phrase);
					phrase = "";
				}
				phrase = "";
				checkkNext = false;
			}
			if(char === '"'){
				checkNext = true;
			}
			else if(char === ','){
				phrase += char;
			}
			else{
				
			}
		}
        lineCounter += 1;
    }).then(function(){
        if(lineCounter === 0){
			let err = "Invalid Document";
			let mes = "Empty";
            dialog.showErrorBox(err, mes);
        }
    });
}

//Look for a CSV file
document.querySelector('#selectBtn').addEventListener('click', async function(e){
    e.preventDefault();
	$('#selectBtn').prop('disabled', true);
	filePath = await openFile(['csv', 'txt']);
	interperetFile(filePath);
});
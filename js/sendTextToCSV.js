const lineReader = require('line-reader');
var Promise = require('bluebird');

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
		checkPrint = false;
		for(var i = 0; i < line.length; i++){
			char = line.charAt(i);
			if(checkNext){
				//console.log(char);
				if(char == ','){
					//console.log(phrase);
					row.push(phrase);
					phrase = "";
				}
				else{
					phrase = phrase + char;
				}
				checkNext = false;
			}
			else{
				if(char === '"'){
					checkNext = true;
					checkPrint = true;
				}
				else{
					phrase = phrase + char;
				}
			}
		}
		row.push(phrase);
		phrase = "";
		matrix.push(row);
		phrase = "";
		row = [];
        lineCounter += 1;
    }).then(function(){
        if(lineCounter === 0){
			let err = "Invalid Document";
			let mes = "Empty";
            dialog.showErrorBox(err, mes);
		}
		else{
			console.log(matrix);
		}
	});
	$('#selectBtn').prop('disabled', false);
}

document.querySelector('#selectBtn').addEventListener('click', async function(e){
    e.preventDefault();
	$('#selectBtn').prop('disabled', true);
	openFile(['txt', 'csv'], interpretFile);
});
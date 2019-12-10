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
	console.log("AAA");
    eachLine(filePath, function(line){
		var row = [];
		var char;
		var phrase = "";
		var checkNext = false;
		console.log(line);
		for(var i = 0; i < line.length; i++){
			char = line.charAt(i);
			if(checkNext){
				row.push(phrase)
				if(char == '"'){
					matrix.push(row);
					phrase = "";
				}
				else if(char == ','){
					row.push(phrase);
					phrase = "";
				}
				checkkNext = false;
			}
			else{
				if(char === '"'){
					checkNext = true;
				}
				else{
					phrase += char;
				}
			}
		}
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
	console.log(matrix);
	$('#selectBtn').prop('disabled', false);
}

async function loadFile(callback){
	let path = await openFile(['csv', 'txt'])
	console.log(path);
}

//Look for a CSV file
document.querySelector('#selectBtn').addEventListener('click', async function(e){
    e.preventDefault();
	$('#selectBtn').prop('disabled', true);
	loadFile(interpretFile);
});
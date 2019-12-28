//TAKES IN FILEPATH AND CALLBACK FUNCTION
//CALLS CALLBACK FUNCTION WITH MATRIX
//EXAMPLE CALL: csvToMatrix(filePath, interpretFile);
//DOES NOT RETURN

const lineReader = require('line-reader');
var Promise = require('bluebird');

function csvToMatrix(filePath, callb){
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
				if(char == ','){
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
			callb(matrix);
		}
	});
}
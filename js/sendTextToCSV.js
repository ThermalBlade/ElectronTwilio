//FUNCTIONALITY for sendTextToCSV.html

//Autogrow the textbox on this page.
$('#formSendTextMessageMessage').autogrow()

//Select CSV button, pass it to intepretFile (set up to be asyncronous)
document.querySelector('#selectBtn').addEventListener('click', function(e){
    e.preventDefault();
	$('#selectBtn').prop('disabled', true);
	openFile(['txt', 'csv'], interpretFile);
});
//Continues process, turns the CSV into a matrix
function interpretFile(filePath){
    csvToMatrix(filePath, interpretFile2);
}
//Continues process, brings back button functionality and creates a Table representing the CSV
function interpretFile2(matrix){
	$('#selectBtn').prop('disabled', false);
	var pn = document.createElement('label');
	var tn = document.createTextNode("Select Phone Number Column:");
	pn.appendChild(tn);
	pn.setAttribute("id", "selectPhone");
	document.getElementById("formSendTextMessage").appendChild(pn);
	matrixToTable(matrix, document.getElementById("formSendTextMessage"), "csvTable");
}

//Select Column from uploaded CSV
document.addEventListener("mouseover", someListener);
function someListener(e){
	$('#csvTable td').on('click', function() {
		var $currentTable = $(this).closest('table');
		var index = $(this).index();
		$currentTable.find('td').removeClass('selected');
		$currentTable.find('tr').each(function() {
			$(this).find('td').eq(index).addClass('selected');
		});
	});
}

//Called when Send Texts is pressed, will send the texts and display errors if necessary
function csvText(){
	var pnumber, mes, st;
	var failedNumbers = []
	function sentTextsPop() {
		if(failedNumbers.length !== 0){
			popUp("Some Texts Failed", document.getElementById("formSendTextMessageMessage"));
			var pn = document.createElement('label');
			var s = "Failed Phone Numbers: ";
			for(var i = 0; i < failedNumbers.length; i ++){
				s += failedNumbers[i] + ", "
			}
			var tn = document.createTextNode(s);
			pn.appendChild(tn);
			document.getElementById("selectPhone").parentNode.insertBefore(pn, document.getElementById("selectPhone"));
		}
		else{
			popUp("Texts Sent", document.getElementById("formSendTextMessageMessage"));
		}
    }
	var ls = document.getElementsByClassName('selected');
	for(var i = 0; i < ls.length; i ++){
		pnumber = ls[i].innerHTML;
		mes = document.getElementById("formSendTextMessageMessage").value;
		st = sendText(pnumber, mes);
		if(!st){
			failedNumbers.push(pnumber);
		}
	}
	document.getElementById("formSendTextMessage").reset();
	sentTextsPop();
}

//Autogrow the textbox on this page.
$('#formSendTextMessageMessage').autogrow()

function interpretFile2(matrix){
	$('#selectBtn').prop('disabled', false);
	var pn = document.createElement('label');
	var tn = document.createTextNode("Select Phone Number Column:");
	pn.appendChild(tn);
	document.getElementById("formSendTextMessage").appendChild(pn);
	matrixToTable(matrix, document.getElementById("formSendTextMessage"), "csvTable");
}

function interpretFile(filePath){
    csvToMatrix(filePath, interpretFile2);
}

document.querySelector('#selectBtn').addEventListener('click', function(e){
    e.preventDefault();
	$('#selectBtn').prop('disabled', true);
	openFile(['txt', 'csv'], interpretFile);
});

//Select Column from uploaded CSV
document.addEventListener("mouseover", someListener);
function someListener(e){
	$('#csvTable td').on('click', function() {
		console.log("aa");
		var $currentTable = $(this).closest('table');
		var index = $(this).index();
		$currentTable.find('td').removeClass('selected');
		$currentTable.find('tr').each(function() {
			$(this).find('td').eq(index).addClass('selected');
		});
	});
}
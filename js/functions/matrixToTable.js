//PLACES A TABLE IN THE HTML FROM A MATRIX
//TAKES IN A MATRIX AND AN ELEMENT TO APPEND TO AND A TABLE ID
//EXAMPLE CALL: 
//  matrixToTable(matrix, document.getElementById("form"));
//DOES NOT RETURN

function matrixToTable(matrix, element, ide){
    var newTable = document.createElement("table");
	var row, cell;
    for(let i = 0; i < matrix.length; i ++){
		row = document.createElement("tr");
        for(var j = 0; j < matrix[0].length; j ++){
            cell = document.createElement("td");
            textNode = document.createTextNode(matrix[i][j]);
            cell.appendChild(textNode);
            row.appendChild(cell);
        }
        newTable.appendChild(row);
    }
    newTable.id = ide;
	element.appendChild(newTable);
}
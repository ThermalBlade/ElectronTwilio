let dbs = new AWS.DynamoDB;

dbs.listTables({}, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else{
        displayTables(data);
    }
});

function displayTables(data){
    tables = data.TableNames;
    for(i = 0; i < tables.length; i ++){
        console.log(fetchTable(tables[i]));
    }
}
const accountId = process.env.AWS_ID;
const accountSid = process.env.AWS_SID;
const accountReg = process.env.AWS_REG;
const accountEnd = process.env.AWS_ENDPOINT

var AWS = require("aws-sdk");
let awsConfig = {
    "region": accountReg,
    "endpoint": accountEnd,
    "accessKeyId": accountId, "secretAccessKey": accountSid
};

AWS.config.update(awsConfig);
let dynamoClient = new AWS.DynamoDB;
let docClient = new AWS.DynamoDB.DocumentClient();

function checkTable(tableName, cb){
    status = "false";
    var params = {
        TableName: tableName
    };
    dynamoClient.describeTable(params, function(err, data) {
        if(err){
            status = "false";
            //console.log(err, err.stack);
        }
        else{
            status = "true";
            //console.log(data);
        }
        cb(status);
    });
}

let fetchTable = function(table, cb){
    var params = {
        TableName: table,
    };
    docClient.scan(params, function (err, data) {
        if(err){
            mes = err.message;
            cb(mes);
        }
        else{
            cb(data.Items);
        }
    })
}

let createEmptyTable = function(tn, ats, cb){
    function waitForTable(TName, atris, callb){
        checkTable(TName);
        console.log(stat);
        if(stat == "true"){
            addRow(Tname, atris, callb);
        }
        else{
            setTimeout(function(){waitForTable(TName, atris, callb);}, 1000);
        }
    }
    AtDefinitions = [];
    sKeySchem = [];
    for(i = 0; i < 2; i ++){
        var at = {
            AttributeName: ats[i],
            AttributeType: "S"
        };
        AtDefinitions.push(at);
    }
    console.log(AtDefinitions);
    var params = {
        TableName: tn,
        AttributeDefinitions: AtDefinitions,
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
        KeySchema: [
            {
                AttributeName: ats[0],
                KeyType: "HASH"
            },
            {
                AttributeName: ats[1],
                KeyType: "RANGE"
            }
        ]
    };
    dynamoClient.createTable(params, function(err, data){
        if(err){
            console.log(err, err.stack);
        }
        else{
            waitForTable(tn, ats, cb);
            //console.log(data);
            // addRow(tn, ats);
        }
    });
}

let addRow = function(table, row, cb){
    items = {};
    for(i = 0; i < row.length; i ++){
        var n = row[i]
        items[n] = "temp";
    }
    console.log(table);
    var params = {
        TableName: table,
        Item: items
    };
    docClient.put(params, function (err, data) {
        if (err) {
            console.log("users::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::update::success "+JSON.stringify(data) );
        }
        cb();
    });   
}

let fetchOneByKey = function (table, keyid, key){
    var params = {
        TableName: table,
        Key: {[keyid]: key}
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}

let save = function (){
    var input = {
        "email_id": "example-1@gmail.com", "created_by": "clientUser", "created_on": new Date().toString(),
        "updated_by": "clientUser", "updated_on": new Date().toString(), "is_deleted": false
    };
    var params = {
        TableName: "users",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("users::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("users::save::success" );                      
        }
    });
}

let remove = function () {

    var params = {
        TableName: "Master",
        Key: {
            "phone-number": "9"
        }
    };
    docClient.delete(params, function (err, data) {

        if (err) {
            console.log("users::delete::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::delete::success");
        }
    });
}


let modify = function () {
    var params = {
        TableName: "Master",
        Key: { "email_id": "example-1@gmail.com" },
        UpdateExpression: "set updated_by = :byUser, is_deleted = :boolValue",
        ExpressionAttributeValues: {
            ":byUser": "updateUser",
            ":boolValue": true
        },
        ReturnValues: "UPDATED_NEW"

    };
    docClient.update(params, function (err, data) {

        if (err) {
            console.log("users::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("users::update::success "+JSON.stringify(data) );
        }
    });
}

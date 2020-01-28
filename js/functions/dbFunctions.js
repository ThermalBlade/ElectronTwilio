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
let docClient = new AWS.DynamoDB.DocumentClient();

let fetchTable = function (table){
    var params = {
        TableName: table,
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            return(data.Items);
        }
    })
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

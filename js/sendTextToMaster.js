//FUNCTIONALITY for sendTextToCSV.html

let masterText = function(){
    docClient.scan(params, onScan);
}

const accountId = process.env.AWS_ID;
const AWSaccountSid = process.env.AWS_SID;
const accountReg = process.env.AWS_REG;
const accountEnd = process.env.AWS_ENDPOINT
var AWS = require("aws-sdk");
let awsConfig = {
    "region": accountReg,
    "endpoint": accountEnd,
    "accessKeyId": accountId, "secretAccessKey": AWSaccountSid
};
AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
var params = {
    TableName: "Master"
};
function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        var count = 0;
        data.Items.forEach(function(itemdata) {
            mes = document.getElementById("formSendTextMessageMessage").value;
            if(itemdata.cantext == "true"){
                sendText(itemdata.phonenumber, mes);
            }
        });
    }
}

//Autogrow the textbox on this page.
$('#formSendTextMessageMessage').autogrow()
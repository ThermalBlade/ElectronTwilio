require('dotenv').config();

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
let fetchOneByKey = function () {
    var params = {
        TableName: "users",
        Key: {
            "email_id": "example@gmail"
        }
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


fetchOneByKey();
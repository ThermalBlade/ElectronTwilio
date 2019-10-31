const accountSid = process.env.TW_SID;
const authToken = process.env.TW_TOKEN;
const client = require('twilio')(accountSid, authToken);

/*client.messages
  .create({
     body: 'We live in a society',
     from: process.env.TW_FROM_PHONE_NUMBER,
     to: process.env.TW_TEST_PHONE_NUMBER
   })
  .then(message => console.log(message.sid));*/
// Twilio Credentials
require("dotenv").config();
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// require the Twilio module and create a REST client
const client = require("twilio")(accountSid, authToken);

const Messaging = (PhoneNumber, ID) => {
  client.messages.create(
    {
      to: "+1" + PhoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER,
      body:
        "Hello You're now Registered Customer with Bolt Services \n click here to Sign our terms and agreements \n have a nice day thank you  Click Here to Sign : http://157.230.62.70:3000/document2:id=" +
        ID,
    },
    (err, messagee) => {
      if (err) 
      console.log("--------------ERROR-------------", err);
      else console.log("-------Message SID -----", messagee.sid);
    }
  );
};

module.exports = Messaging;

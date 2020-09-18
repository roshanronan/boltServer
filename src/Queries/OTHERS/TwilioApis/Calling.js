const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const Calling = () => {
console.log("-------calling you in a moment-------------");

try {
client.calls.create(
{
// record: true,
twiml: "<Response><Say>Hello lets get it started yeah !</Say></Response>",
// url: "https://mio.to/Ikkn",
// to: "+918076302567",
to: "+919315389865",
from: process.env.TWILIO_PHONE_NUMBER,
},
(err, call) => {
if (err) console.log("--------------ERROR-------------", err);
else console.log(" ----------- call made successfully -------- \n to:",call.sid);
}
);
} catch (err) {
console.log("--------------ERROR-------------", err);
}
};


module.exports=Calling
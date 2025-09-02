import express from "express"
import twilio from "twilio";
import request from "request";
const SendMessageRouter = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;   // from Twilio Dashboard
const authToken = process.env.TWILIO_AUTH_TOKEN;     // from Twilio Dashboard
const client = twilio(accountSid, authToken);
SendMessageRouter.post("/sendsms", async (req, res) => {
    console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    const { phoneno, name, location1, location2 } = req.body;
    // try {
    //     const message = await client.messages.create({
    //         body: `🚨 EMERGENCY ALERT! 🚨 ${name} has triggered an SOS. Current Location: https://maps.google.com/?q=${location1},${location2}. ⚠️ Immediate assistance is required. Please take action quickly.`,
    //         from: "+13345975152",  // Twilio phone number
    //         to: "+917363923402"   // Receiver phone number
    //     });
    //     console.log("Message sent:", message.sid);
    //     res.status(202).json({ "status": true })
    // } catch (error) {
    //     res.status(500).json({ "status": false, "message": "Internal Server Error" })
    //     console.log("Error sending SMS:", error);
    // }
    try {
       

        var dataString = 'From=0XXXXXX4890&To=+919635013952&Body=Hello World!';

        var options = {
            url: 'https://79b855c45c3bf775609df1aa71c8295ae487ddcf1854d78d:eea043d7461bb962201a0da3359e3d9ad1cd4e20040938b8api.exotel.com/v1/Accounts/not689/Sms/send',
            method: 'POST',
            body: dataString
        };

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }

        request(options, callback);
    } catch (error) {
        console.log(error)
        res.json({ "error": error })
    }

})
export default SendMessageRouter;
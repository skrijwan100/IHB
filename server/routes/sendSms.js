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
    try {
        const message = await client.messages.create({
            body: `🚨 EMERGENCY ALERT! 🚨 ${name} has triggered an SOS. Current Location: https://maps.google.com/?q=${location1},${location2}.`,
            from: "+13345975152",  // Twilio phone number
            to: phoneno   // Receiver phone number
        });
        console.log("Message sent:", message.sid);
        res.status(202).json({ "status": true })
    } catch (error) {
        res.status(500).json({ "status": false, "message": "Internal Server Error" })
        console.log("Error sending SMS:", error);
    }

})
export default SendMessageRouter;
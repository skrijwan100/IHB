import express from "express"
import nodemailer from "nodemailer";
import fs from "fs";
import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const PdfRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
PdfRouter.post("/sendmail", (req, res) => {
    const { fullName, passportNumber, trustemail, touristContact, familyContact, startDate, endDate, qrCode } = req.body;
    try {
        // Create PDF
        const doc = new PDFDocument();
        const uploadPath = path.join(__dirname, "../uploads");
        // Create folder if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        const filePath = path.join(uploadPath, `TouristID_${Date.now()}.pdf`);
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);
        doc.fontSize(25).text("Smart Tourist Safety ID", { align: "center" });
        doc.moveDown();
        doc.fontSize(20).text(`Full Name: ${fullName}`);
        doc.text(`Passport Number: ${passportNumber}`);
        doc.text(`Tourist Contact: ${touristContact}`);
        doc.text(`Family Contact: ${familyContact}`);
        doc.text(`Trip Duration: ${startDate} - ${endDate}`);
        doc.moveDown();
        // Add QR if sent as base64
        if (qrCode) {
            doc.image(Buffer.from(qrCode.split(",")[1], "base64"), {
                fit: [130, 130],
                align: "center",
            });
        }
        doc.moveDown();
        doc.fontSize(18).fillColor("blue").text(
            `Important: This Tourist ID will be valid only for the duration of the trip (${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}). All data is securely stored on blockchain and cannot be modified.`,
            { align: "center" }
        );
        doc.end();
        stream.on("finish", async () => {
            try {
                // Nodemailer setup
                let transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });
                let mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: trustemail,
                    subject: "Your Smart Tourist ID",
                    text: "Attached is your Smart Tourist Safety ID with blockchain security.",
                    attachments: [{ filename: `${fullName}_TouristID.pdf`, path: filePath }],
                };
                await transporter.sendMail(mailOptions);
                // Delete file after sending
                fs.unlinkSync(filePath);
                return res.status(200).json({ success: true, message: "Email sent successfully" });
            } catch (emailError) {
                console.error("Email error:", emailError);
                // Clean up file if email fails
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return res.status(500).json({ success: false, error: "Failed to send email" });
            }
        });
        
        stream.on("error", (streamError) => {
            console.error("Stream error:", streamError);
            return res.status(500).json({ success: false, error: "Failed to create PDF" });
        });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: "Failed to send email" });
    }
});
export default PdfRouter;
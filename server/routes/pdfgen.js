import express from "express";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const PdfRouter = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

PdfRouter.post("/sendmail", async (req, res) => {
    const { fullName, passportNumber, trustemail, touristContact, familyContact, startDate, endDate, nationality, qrCode, Trustid } = req.body;
    
    try {
        // Create PDF in memory
        const doc = new PDFDocument();
        const chunks = [];
        
        // Collect PDF data in memory
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', async () => {
            try {
                const pdfBuffer = Buffer.concat(chunks);
                
                // Nodemailer setup
                const transporter = nodemailer.createTransporter({
                    service: "gmail",
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                });
                
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: trustemail,
                    subject: "Your Smart Tourist ID",
                    text: "Attached is your Smart Tourist Safety ID with blockchain security.",
                    attachments: [
                        {
                            filename: `${fullName}_TouristID.pdf`,
                            content: pdfBuffer,
                            contentType: 'application/pdf'
                        }
                    ],
                };
                
                await transporter.sendMail(mailOptions);
                
                return res.status(200).json({ 
                    success: true, 
                    message: "Email sent successfully" 
                });
                
            } catch (emailError) {
                console.error("Email error:", emailError);
                return res.status(500).json({ 
                    success: false, 
                    error: "Failed to send email",
                    details: emailError.message 
                });
            }
        });
        
        doc.on('error', (docError) => {
            console.error("PDF generation error:", docError);
            return res.status(500).json({ 
                success: false, 
                error: "Failed to generate PDF",
                details: docError.message 
            });
        });
        
        // Generate PDF content
        doc.fontSize(25).text("Smart Tourist Safety ID", { align: "center" });
        doc.moveDown();
        doc.fontSize(20).text(`Full Name: ${fullName}`);
        doc.text(`Your smart ID: ${Trustid}`);
        doc.text(`Passport Number: ${passportNumber}`);
        doc.text(`Nationality: ${nationality}`);
        doc.text(`Tourist Contact: ${touristContact}`);
        doc.text(`Family Contact: ${familyContact}`);
        doc.text(`Trip Duration: ${startDate} - ${endDate}`);
        doc.moveDown();
        
        // Add QR code if provided
        if (qrCode) {
            try {
                doc.image(Buffer.from(qrCode.split(",")[1], "base64"), {
                    fit: [130, 130],
                    align: "center",
                });
            } catch (qrError) {
                console.error("QR code processing error:", qrError);
            }
        }
        
        doc.moveDown();
        doc.fontSize(18).fillColor("blue").text(
            `Important: This Tourist ID will be valid only for the duration of the trip (${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}). All data is securely stored on blockchain and cannot be modified.`,
            { align: "center" }
        );
        
        // Finalize the PDF
        doc.end();
        
    } catch (err) {
        console.error("General error:", err);
        return res.status(500).json({ 
            success: false, 
            error: "Internal server error",
            details: err.message 
        });
    }
});

export default PdfRouter;
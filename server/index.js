import express from "express"
import cors from "cors"
import 'dotenv/config'
import PdfRouter from "./routes/pdfgen.js"
import { connectDB } from "./db.js"
import UserRouter from "./routes/saveuserdata.js"
import UserRouter2 from "./routes/user.router.js"
import SendMessageRouter from "./routes/sendSms.js"
import placeRouter from "./routes/addnewplace.js"
import tourGuideRouter from "./routes/tourGuide.route.js"
import conversionRouter from "./routes/conversion.route.js"
const app = express()
connectDB()
app.use(express.json())
app.use(cors())
app.use("/api/v1/pdfwork",PdfRouter)
app.use("/api/v2/userdata",UserRouter)
app.use("/api/v2/auth",UserRouter2)
app.use("/api/v3/sendalert",SendMessageRouter)
app.use("/api/v4/place",placeRouter)
app.use("/api/v5/tourguide",tourGuideRouter)
app.use("/api/v6/conversion",conversionRouter)

app.get("/",(req,res)=>{
    res.json({"Message":"Your Server is run"})
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Started on http://localhost:${process.env.PORT}`)
})
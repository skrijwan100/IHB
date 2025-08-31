import express from "express"
import cors from "cors"
import 'dotenv/config'
import PdfRouter from "./routes/pdfgen.js"
const app = express()

app.use(express.json())
app.use(cors())
app.use("/api/v1/pdfwork",PdfRouter)
app.get("/",(req,res)=>{
    res.json({"Message":"Your Server is run"})
})
app.listen(process.env.PORT,()=>{
    console.log(`Server Started on http://localhost:${process.env.PORT}`)
})
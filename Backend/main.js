const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const cors = require("cors")
let mongoose = require("mongoose")

app.use(bodyParser.json())
app.use(cors())
dotenv.config()
 


let CarSchema = new mongoose.Schema({
    
})



mongoose.connect(process.env.ConnectionString)
.then(()=>{
    console.log("connected");
})
.catch((err)=>console.log(err))


app.listen(8080,()=>{
    console.log("8080 portda dinlenilir");
})

const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const dotenv = require("dotenv") //config()
const cors = require("cors")
let mongoose = require("mongoose")

app.use(bodyParser.json())
app.use(cors())
dotenv.config()


// Yeni Shema yaratmag
let CarSchema = new mongoose.Schema({
    brandName: {
        required: [true, "Enter car brandName"],
        type: String
    },
    modelName: {
        required: [true, "Enter car modalName"],
        type: String
    },
    year: {
        required: [true, "Enter car year"],
        type: Number
    },
    color: {
        required: [true, "Enter car color"],
        type: String
    },
    isNew: Boolean

})
// hansi ed point altinda olmasini secmek
let CarModel = mongoose.model("cars", CarSchema)


// Datalari gostermek
app.get("/cars", async (req, res) => {
    let cars = await CarModel.find()
    res.send(cars)
})

app.get("/cars/:id", async (req, res) => {
    let { id } = req.params
    let myCar = await CarModel.findById(id)
    res.send({ data: myCar })
})

// Dataya post etmek
app.post("/cars", async (req, res) => {
    let newCar = CarModel(req.body)
    await newCar.save()
    res.send({
        message: "Success post car",
        data: req.body
    })
})

// Delete Data
app.delete("/cars/:id", async (req, res) => {
    let { id } = req.params
    await CarModel.findByIdAndDelete(id)
    res.send({
        message: "Succes Delete Car"
    })
})



mongoose.connect(process.env.ConnectionString)
    .then(() => {
        console.log("connected");
    })
    .catch((err) => console.log(err))


app.listen(8080, () => {
    console.log("8080 portda dinlenilir");
})

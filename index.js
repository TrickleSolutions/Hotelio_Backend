const express = require("express")
require('dotenv').config()
const CustomerRoutes = require("./Routes/CustomerRoutes/AuthRoutes")
// database
require('./connection')
const app = express()


// some middlewares
app.use(express.json())



// variable Define 
const port = process.env.PORT || 5000


// routes

app.use("/api", CustomerRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Hotelio Backend")
})







// server startt
app.listen(port, () => {
    console.log(`server started at port ${port}`)
})
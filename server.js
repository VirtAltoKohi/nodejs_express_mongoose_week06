const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose = require('mongoose')

const app = express()

const SERVER_PORT = 3001

const DB_CONNECTION_STRING = "mongodb+srv://admin:EAiTTU4Y4DWz99yU@cluster0.sa8fxfy.mongodb.net/f2023_comp3123?retryWrites=true&w=majority"

app.use(express.json())
app.use(express.urlencoded())

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use("/library", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})
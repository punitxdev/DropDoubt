const express = require("express")
const app = express()
const port = 1000
const connectToDatabase = require('./db.js')
const cors = require('cors')
const path = require('path');

const userRoutes = require('./routes/user.js')
const questionRoutes = require('./routes/question.js')
const answerRoutes = require('./routes/answer.js')

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/profilePicUploads', express.static(path.join(__dirname, 'profilePicUploads')));


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use('/user', userRoutes);
app.use('/question', questionRoutes);
app.use('/answer', answerRoutes)


// port listening on 1000
app.listen(port, ()=>{
    console.log(`Server listen on ${port}`)
})  
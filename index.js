const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoute = require('./router/userRoute');
const topicRoute = require('./router/topicRoute');

const app = express();

dotenv.config();

app.use(cors())

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost:27017/testCollec', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("connection successfull")
    })

app.use('/', userRoute);
app.use('/', topicRoute);
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
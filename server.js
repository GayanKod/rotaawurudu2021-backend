const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const morgan = require('morgan')


const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());


const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB is successfully connected!");
});

//Load Auth Routes
/*set path to Connect to gigs Router*/

const authRouter = require('./routes/auth.route')
const userRouter = require('./routes/user.route')

// Use Routes
app.use('/api', authRouter)
app.use('/api', userRouter)


app.use((req, res) => {
    res.status(404).json({
        success: false,
        msg: "Page not founded"
    })
})

// Dev Logginf Middleware
if (process.env.NODE_ENV === 'development') {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
}


app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
})

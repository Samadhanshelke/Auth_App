const express = require('express');
const app = express();
const AuthRoutes  = require('./routes/AuthRoutes')

const {dbConnect} = require('./config/dbConnect')


const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require('cors');


dotenv.config();
dbConnect();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"*"
}))
app.use("/api/auth",AuthRoutes)
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`app is running on port ${PORT}`);
})
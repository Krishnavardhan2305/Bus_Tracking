import express from 'express';
import connectDB from './config/db.js';
import dotenv from "dotenv";
const app=express();

dotenv.config();
connectDB();


const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server Listening at port ${PORT}`)
})


// require('dotenv').config({path: './env'})

import mongoose from "mongoose";
import {DBNAME} from "../src/constants.js"
import express from "express";
import {connectDB}  from "./db/index.js"
import  dotenv from "dotenv";
import { app } from "./app.js";
// import connectDB from "./db/index.js";

// const app = express();

dotenv.config({
    path: "./env"
});

 
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is runing at port : ${process.env.PORT || 8000}`)
    })
})
.catch( (error) => {
    console.log("Mongodb connection Falied from express" , error)
})






















/*
async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
          console.log("ERROR: ", error)
          throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listen on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("ERROR: ", error)
        throw error
    }
}
*/
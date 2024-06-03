
import mongoose from "mongoose";
import  {DBNAME} from "../constants.js";



const connectDB = async  () => {

    try {
        const connectionInstance = await mongoose.connect('mongodb+srv://newuser:gurseweksir123@cluster0.ijnrcf0.mongodb.net/adb');
            // console.log(MONGODB_URI);
            // console.log(` MongoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
            console.log("mongdb connected successfully")

         
    } catch (error) {
        console.log("MONGODB Connection FAILED", error);
        // console.log(error, "not working")
        process.exit(1)
    }
}


export    {connectDB};




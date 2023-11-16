import app from "./app.js";
import { connectDB } from "./config/database.js";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import nodeCron from "node-cron"
import { Stats } from "./models/stats.js";


connectDB();

cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_ID,
    api_secret:process.env.CLOUDINARY_SECRET,
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });

  nodeCron.schedule("0 0 0 1 * *" , async()=> {
    try{
        await Stats.create({});
    } catch(error){
        console.log(error);
    }
  })

 

app.listen(5000 , ()=>{
    console.log(`Server is started on port 5000`);
})


import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import ErrorMiddleware from "./middlewares/ErrorMiddleware.js";
import payment from "./routes/paymentRoutes.js"
import contact from "./routes/contactRoutes.js"
import cors from "cors";


config({
    path:"./config/config.env",
})

const corsOptions = {
    origin: 'https://ilearn-drab.vercel.app/', // Change this to the actual origin of your frontend app
    credentials: true,
    methods:["GET" , "POST" , "PUT" , "DELETE"]
  };

const app=express();


app.use(express.json());
app.use(
    express.urlencoded({
        extended:true,
    })
)
app.use(cors(corsOptions));

app.use(cookieParser());


app.use("/api/v1" , course);
app.use("/api/v1" , user);
app.use("/api/v1" , payment);
app.use("/api/v1" , contact);



app .use(ErrorMiddleware)


export default app;
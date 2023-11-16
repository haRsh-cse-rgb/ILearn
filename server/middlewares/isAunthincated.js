import jwt from "jsonwebtoken";
import { Error } from "./Error.js";
import Errorhandler from "../utils/Errorhandler.js";
import { User } from "../models/User.js";


export const isAuthenticated =Error(async(req , res , next) =>{

    const {token}=req.cookies;

    if(!token) return next(new Errorhandler("Not Logged In" , 401));

    const decoded=jwt.verify(token , process.env.JWT_SECRET);

    req.user= await User.findById(decoded._id);

    next();
})
export const authorizeSubscribers =Error(async(req , res , next) =>{

    if(req.user.subscription.status!="active" &&  req.user.role !=="admin"){
        return next(new Errorhandler("Only Subscribers can access this resources" , 403))
    }

    next();
})

export const authorizeAdmin =(req ,res , next) =>{
    if(req.user.role!= "admin"){
        return next(new Errorhandler("You are not allowed to access this resource , Contact admin" , 403))
    }

    next();
}
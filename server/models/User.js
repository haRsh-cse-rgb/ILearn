import mongoose, { Schema } from "mongoose";
import validator from "validator";
import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true , "Please Enter Your Name"],
    },
    email:{
        type:String,
        required:[true , "Please Enter Your Email"],
        unique:true,
        validate:validator.isEmail,

    },
    password:{
        type:String,
        required:[true , "Please Enter Your Password"],
        minLength:[6 , "Password must be atleast 6 characters long"],
        
        select:false,

    },
    role:{
        type:String,
        enum:["admin" , "user"],
        default:"user",

    },
    subscription: {
        // id: { type: String, default: "" },
        // status: { type: String, default: "inactive" },

        id:String,
        status:String,

    },
    avatar:{
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    },
    playlist:[
        {
            course:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Course"
            },
            poster:String,
        },
    ],

    createdAt:{
        type:Date,
        default:Date.now,
    },

    resetPasswordToken:String,
    resetPasswordExpiry:String,



});

schema.pre("save" , async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password , 5);
    next();

})

schema.methods.getJWTToken = function (){
    return jwt.sign({_id:this._id} , process.env.JWT_SECRET, {
        expiresIn:"15d",
    })
}
schema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password , this.password);
}

schema.methods.getResetToken =async function (){

    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpiry=Date.now() + 15 *60 *1000;

    return resetToken;



}


export const User=mongoose.model("User" , schema);
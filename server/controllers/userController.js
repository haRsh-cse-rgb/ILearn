import { Error } from "../middlewares/Error.js"
import Errorhandler from "../utils/Errorhandler.js";
import {User} from "../models/User.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
import {Course} from "../models/Course.js";
import getdataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";
import { Stats } from "../models/stats.js";




export const register= Error(async(req , res , next) => {

    const {name , email , password}=req.body;

    

    


    if(!name || !email || !password){
        return next(new Errorhandler("Please Enter All Feilds" , 400));

    }


    let user=await User.findOne({email});

    if(user) return next(new Errorhandler("User Already Exist" , 409));

    const file=req.file;
    const fileUri = getdataUri(file);
    const mycloud= await cloudinary.v2.uploader.upload(fileUri.content);




    user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        },
    });

    user.subscription.status="active";

    sendToken(res , user , "Registered Successfully ! Congratulations ! You got our premium pack for free." , 201)

});










export const login= Error(async(req , res , next) => {

    const {email , password}=req.body;

    // const file=req.file;


    if( !email || !password){
        return next(new Errorhandler("Please Enter All Feilds" , 40));

    }


    const user=await User.findOne({email}).select("+password");

    if(!user) return next(new Errorhandler("Incorrect Email or Password" , 401));


    const isMatch =await user.comparePassword(password);

    if(!isMatch)
    return next(new Errorhandler("Incorrect Email or Password" , 401));




    sendToken(res , user , `Welcome Back, ${user.name}` , 201)

});

export const logout = Error(async(req , res , next)=>{
    res.status(200).cookie("token" , null , {
        expires:new Date(Date.now()),
        httpOnly:true,
        secure:true,
        sameSite:"none",
    }).json({
        success:true,
        message:"Logged Out Successfully"
    })
})
export const getMyProfile = Error(async(req , res , next)=>{

    const user=await User.findById(req.user._id);

    res.status(200).json({
        success:true,
        user,
    })


    
})
export const changePassword = Error(async(req , res , next)=>{

    const {oldPassword , newPassword}=req.body;


    if(!oldPassword || !newPassword)
    return next(new Errorhandler("Please enter all feilds" , 400));

    const user=await User.findById(req.user._id).select("+password");

    const isMatch=await user.comparePassword(oldPassword);

    if(!isMatch) return next(new Errorhandler("Incorrect Old Password" , 400));

    user.password=newPassword;

    await user.save();



    res.status(200).json({
        success:true,
        message:"Password Changed Successfully",
    })


    
})
export const updateProfile = Error(async(req , res , next)=>{

    const {name , email}=req.body;
    const user=await User.findById(req.user._id);


    if(name){
        
        user.name=name;
    }

    if(email){
        user.email=email;
    }

    await user.save();



    res.status(200).json({
        success:true,
        message:"Profile Updated Successfully",
    })


    
})
export const updateProfilepicture = Error(async(req , res , next)=>{


    const file=req.file;

    const user=await User.findById(req.user._id);

    const fileUri=getdataUri(file);
    const mycloud= await cloudinary.v2.uploader.upload(fileUri.content);

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    user.avatar={
        public_id:mycloud.public_id,
        url:mycloud.secure_url,
    };

    await user.save();

    

    res.status(200).json({
        success:true,
        message:"Profile Picture Updated Successfully",
    })


    
})
export const forgetPassword = Error(async(req , res , next)=>{

    const {email}=req.body;

    const user= await User.findOne({email});

    if(!user)
    return next(new Errorhandler("User Not found with this email address" , 400));

    const resetToken =await user.getResetToken();

    await user.save();


    const url=`${process.env.FRONTEND_URL}/resetPassword/${resetToken}`

    const message=`Click on the Link to rest your password for ILearn. ${url}.`;

    await sendEmail(user.email , "Your Reset Token for ILearn" , message)

    

    res.status(200).json({
        success:true,
        message:`Reset Token Has been Sent to ${user.email}`,
    })


    
})
export const resetPassword = Error(async(req , res , next)=>{

    const {token}=req.params;

    const resetPasswordToken=crypto.createHash("sha256").update(token).digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpiry:{
            $gt:Date.now(),
        },


    })

    if(!user)
     return next(new Errorhandler("Token Invalid Or expired" , 401));
    

    user.password=req.body.password;

    user.resetPasswordExpiry=undefined,
    user.resetPasswordToken=undefined,


    await user.save();
    

    

    res.status(200).json({
        success:true,
        message:"Password Updated Successfully",
    })


    
})

export const addtoplaylist = Error(async(req , res , next) => {

    const user= await User.findById(req.user._id);
    const course= await Course.findById(req.body.id);


    if(!course) return next(new Errorhandler("Invalid Course Id" , 400));

    const itemExist= user.playlist.find((item) =>{
        if(item.course.toString()=== course._id.toString()) return true;
    })

    if(itemExist) return next(new Errorhandler("Item Already Exist" , 409));

    user.playlist.push({
        course:course._id,
        poster:course.poster.url,
    });

    await user.save();

    res.status(200).json({
        success:true,
        message:"Added To PlayList",
    });


    
});
export const removefromplaylist = Error(async(req , res , next) => {

    const user= await User.findById(req.user._id);
    const course= await Course.findById(req.query.id);


    if(!course) return next(new Errorhandler("Invalid Course Id" , 400));

    const newPlayList = user.playlist.filter((item) => {
        if(item.course.toString() !== course._id.toString()) return item;
    }) 

    user.playlist=newPlayList;
   

    await user.save();

    res.status(200).json({
        success:true,
        message:"Removed From PlayList",
    });




});
export const getAllUsers = Error(async(req , res , next) => {

    const users=await User.find({});

    res.status(200).json({
        success:true,
        users,
    })


});
export const updateUserRole = Error(async(req , res , next) => {

    const user=await User.findById(req.params.id);

    if(!user) return next(new Errorhandler("User Not Found" , 404));

    if(user.role=="user"){
        user.role="admin";
    }
    else{
        user.role="user";
    }

    await user.save()

    res.status(200).json({
        success:true,
        message:"Role Changed",
    })


});
export const deleteUser = Error(async(req , res , next) => {

    const user=await User.findById(req.params.id);

    if(!user) return next(new Errorhandler("User Not Found" , 404));

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await User.deleteOne({ _id: req.params.id });

    res.status(200).json({
        success:true,
        message:"User Deleted Successfully",
    })


});
export const deleteMyProfile  = Error(async(req , res , next) => {

    const user=await User.findById(req.user._id);

   

    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    await User.deleteOne({ _id: req.user._id });

    res.status(200).cookie("token" , null , {
        expires:new Date(Date.now()),  

    })
    .json({
        success:true,
        message:"User Deleted Successfully",
    })


});


User.watch().on("change" , async() =>{
    const stats = await Stats.find({}).sort({createdAt : "desc"}).limit(1);

    const subscription = await User.find({"subscription.status":"active"});

    stats[0].users=await User.countDocuments();
    stats[0].subscriptions=subscription.length;
    stats[0].createdAt=new Date(Date.now());

    await stats[0].save();
})
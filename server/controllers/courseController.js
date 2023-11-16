import {Course} from "../models/Course.js";
import { Error } from "../middlewares/Error.js";
import { create } from "domain";
import Errorhandler from "../utils/Errorhandler.js";
import cookieParser from "cookie-parser";
import getdataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary"
import { Stats } from "../models/stats.js";

export const getAllCourse= Error(async (req , res , next) =>{

  const keyword=req.query.keyword || "";
  const category=req.query.category ||"";

const courses= await Course.find({
    title:{
        $regex:keyword,
        $options:"i"
    },category:{
        $regex:category,
        $options:"i"
    }
}).select("-lectures");

try {
    res.status(200).json({
        success:true,
        courses,
    });
} catch (error) {
    console.log(err)
}

});
export const createCourse= Error(async (req , res , next) =>{

    const {title , description , category , createdBy}=req.body;

    if(!title || !description || !category || !createdBy){
        return next(new Errorhandler("Please Enter All Feilds" , 400))
    }
    const file=req.file;
    // console.log(file)

    const fileUri=getdataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);


    await Course.create({
        title,
        description,
        category,
        createdBy,
        poster:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        },
});


    res.status(201).json({
        success:true,
        message:"Course Created Successfully. You can Add lectures Now.",
    });

});
export const deleteCourse = Error(async (req, res, next) => {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) return next(new Errorhandler("Course Not Found", 404));

    await cloudinary.v2.uploader.destroy(course.poster.public_id);

    for (let i = 0; i < course.lectures.length; i++) {
        const lecture = course.lectures[i];
        await cloudinary.v2.uploader.destroy(lecture.video.public_id , {
            resource_type:"video",
        });
    }

    await Course.deleteOne({ _id: id }); // Use deleteOne to remove the document.

    res.status(200).json({
        success: true,
        message: "Course Deleted Successfully",
    });
});
export const deletelectures = Error(async (req, res, next) => {
    const { courseId , lectureId } = req.query;

    const course = await Course.findById(courseId);

    if (!course) return next(new Errorhandler("Course Not Found", 404));

    const lecture=course.lectures.find((item) =>{
        if(item._id.toString() === lectureId.toString()) return true;
    })

    await cloudinary.v2.uploader.destroy(lecture.video.public_id , {
        resource_type:"video",
    })

    for (let i = 0; i < course.lectures.length; i++) {
        const lecture = course.lectures[i];
        await cloudinary.v2.uploader.destroy(lecture.video.public_id , {
            resource_type:"video",
        });
    }

    course.lectures=course.lectures.filter((item) =>{
        if(item._id.toString() !==lectureId.toString()) return item;
    })

    course.numofVideos=course.lectures.length;

    await course.save();

    res.status(200).json({
        success: true,
        message: "Lecture Deleted Successfully",
    });
});



export const getAllCourseLectures= Error(async (req , res , next) =>{
    const course= await Course.findById(req.params.id);
    
    if(!course) return next(new Errorhandler("Course not found" , 404));

    course.views+=1;

    await course.save();

    res.status(200).json({
        success:true,
        lectures:course.lectures,
    })
    
    });
export const addLectures= Error(async (req , res , next) =>{

    const {title , description} =req.body;
    const course= await Course.findById(req.params.id);
    
    if(!course) return next(new Errorhandler("Course not found" , 404));

    const file=req.file;
    // console.log(file)

    const fileUri=getdataUri(file);

    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content , {
        resource_type:"video",
    });



    course.lectures.push({
        title,
        description,
        video:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    })


    course.numofVideos=course.lectures.length;
  

    await course.save();

    res.status(200).json({
        success:true,
        message:"Lectures Added In Course",
    })
    
    });


    Course.watch().on("change" , async() =>{
        const stats = await Stats.find({}).sort({createdAt : "desc"}).limit(1);
    
        const courses = await Course.find({});
    
       let totalViews=0;

        for(let i=0 ; i<courses.length ; i++){
            totalViews+=courses[i].views;
        }

        stats[0].views=totalViews;
        stats.createdAt=Date(Date.now())
    
        await stats[0].save();
    })
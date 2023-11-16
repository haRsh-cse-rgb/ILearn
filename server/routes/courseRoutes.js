import express from "express";
import { addLectures, createCourse, deleteCourse, deletelectures, getAllCourse, getAllCourseLectures } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/isAunthincated.js";
const router=express.Router();


router.route("/courses").get(getAllCourse); 

router.route("/createcourse").post(isAuthenticated , authorizeAdmin, singleUpload, createCourse);
router.route("/course/:id").get(isAuthenticated ,authorizeSubscribers, getAllCourseLectures ).post(isAuthenticated ,  authorizeAdmin, singleUpload , addLectures)
.delete(isAuthenticated , authorizeAdmin , deleteCourse );

router.route("/lectures").delete(isAuthenticated , authorizeAdmin , deletelectures)





export default router;
import express from "express";

import { register , login, logout, getMyProfile, changePassword, updateProfile, updateProfilepicture, forgetPassword, resetPassword, addtoplaylist, removefromplaylist, getAllUsers, updateUserRole, deleteUser, deleteMyProfile } from "../controllers/userController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/isAunthincated.js";
import singleUpload from "../middlewares/multer.js";
const router=express.Router();


router.route("/register").post(singleUpload, register); 
router.route("/login").post(login); 
router.route("/logout").get(logout); 
router.route("/me").get(isAuthenticated, getMyProfile); 
router.route("/me").delete(isAuthenticated, deleteMyProfile); 
router.route("/changePassword").put(isAuthenticated, changePassword); 
router.route("/updateProfile").put(isAuthenticated, updateProfile); 
router.route("/updateProfilepicture").put(isAuthenticated,singleUpload, updateProfilepicture); 
router.route("/forgetPassword").post(forgetPassword); 
router.route("/resetPassword/:token").put(resetPassword); 
router.route("/addtoplaylist").post(isAuthenticated , addtoplaylist); 
router.route("/removefromplaylist").delete(isAuthenticated , removefromplaylist); 
router.route("/admin/users").get(isAuthenticated , authorizeAdmin , getAllUsers)
router.route("/admin/users/:id").put(isAuthenticated , authorizeAdmin , updateUserRole);
router.route("/admin/users/:id").delete(isAuthenticated , authorizeAdmin , deleteUser);



export default router;
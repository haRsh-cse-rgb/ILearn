import express from "express";
import { contact, getAdminDashboard } from "../controllers/contactController.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/isAunthincated.js";


const router = express.Router();


router.route("/contact").post(contact)
router.route("/admin/getstats").get(isAuthenticated ,authorizeAdmin ,  getAdminDashboard)




export default router;
import express from "express";
import { isAuthenticated } from "../middlewares/isAunthincated.js";
import { buySubscription, cancelSubscription, getRazorPayKey, paymentVerification } from "../controllers/paymentController.js";


const router = express.Router();


router.route("/subscribe").get(isAuthenticated , buySubscription);
router.route("/subscribe/cancel").delete(isAuthenticated , cancelSubscription);
router.route("/razorpaykey").get(getRazorPayKey);
router.route("/paymentverification").post(isAuthenticated , paymentVerification);




export default router;
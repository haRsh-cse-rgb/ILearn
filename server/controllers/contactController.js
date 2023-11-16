import { Error } from "../middlewares/Error.js"
import Errorhandler from "../utils/Errorhandler.js";
import { sendEmail } from "../utils/sendEmail.js";
import { Stats } from "../models/stats.js";

export const contact= Error(async(req , res , next) => {

const{name , email , message}= req.body;

if(!name || !email || !message)
return next(new Errorhandler("All feilds are mandatory" , 400));

const to=process.env.MY_MAIL;

const subject ="Contact from I Learn"

const text=` I am ${name} and my email is ${email}. \n ${message}`;


await sendEmail(to , subject ,text);

    res.status(200).json({
        success:true,
        messsage:"Message sent successfully"
    })
})


export const getAdminDashboard = Error(async (req, res, next) => {
    const stats = await Stats.find({}).sort({ createdAt: "desc" }).limit(12);

    const statsData = [];

    for (let i = 0; i < stats.length; i++) {
        statsData.unshift(stats[i]);
    }

    const requiredSize = 12 - stats.length;

    for (let i = 0; i < requiredSize; i++) {
        statsData.unshift({
            users: 0,
            subscription: 0,
            views: 0,
        });
    }

    const usersCount = statsData[11].users;
    const subscriptionCount = statsData[11].subscriptions;
    const viewsCount = statsData[11].views;

    let userProfit = true;
    let viewsProfit = true;
    let subscriptionProfit = true;
    let userPercentage = 0;
    let viewsPercentage = 0;
    let subscriptionPercentage = 0;

    if (statsData[10].users === 0) {
        userPercentage = usersCount === 0 ? 0 : 100;
    }
    if (statsData[10].views === 0) {
        viewsPercentage = viewsCount === 0 ? 0 : 100;
    }
    if (statsData[10].subscriptions === 0) {
        subscriptionPercentage = subscriptionCount === 0 ? 0 : 100;
    }
    
    else {
        const difference = {
            users: statsData[11].users - statsData[10].users,
            views: statsData[11].views - statsData[10].views,
            subscription: statsData[11].subscriptions - statsData[10].subscriptions,
        };

        userPercentage = (difference.users / statsData[10].users) * 100;
        viewsPercentage = (difference.views / statsData[10].views) * 100;
        subscriptionPercentage = (difference.subscription / statsData[10].subscriptions) * 100;

        
    }

    if (userPercentage < 0) {
        userProfit = false;
    }
    if (viewsPercentage < 0) {
        viewsProfit = false;
    }
    if (subscriptionPercentage < 0) {
        subscriptionProfit = false;
    }

    res.status(200).json({
        success: true,
        stats: statsData,
        usersCount,
        subscriptionCount,
        viewsCount,
        subscriptionPercentage,
        userPercentage,
        viewsPercentage,
        userProfit,
        subscriptionProfit,
        viewsProfit,
    });
});

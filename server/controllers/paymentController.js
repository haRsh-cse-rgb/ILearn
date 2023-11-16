import { Error } from "../middlewares/Error.js";
import { Payment } from "../models/Payment.js";
import { User } from "../models/User.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const buySubscription= Error(async(req , res , next) => {

    const user= await User.findById(req.user._id);

    const plan=process.env.PLAN_ID|| plan_MspVfVaxa22Kpz;


   const subscription=await instance.subscriptions.create({
        plan_id: plan,
        customer_notify: 1,
        
        total_count: 12,
        
        
        
      })

      user.subscription.id=subscription.id;
      user.subscription.status=subscription.status;
      await user.save();


      res.status(200).json({
        success:true,
        subscription
      })
      

    

});
export const cancelSubscription= Error(async(req , res , next) => {

   const user = await User.findById(req.user._id);

  //  const subscriptionId=user.subscription.id;

  //  let refund=false;

  //  await instance.subscriptions.cancel(subscriptionId);


  //  const payment= await Payment.findOne({
  //   razorpay_subscription_id: subscriptionId,
  //  });


  //  const gap = Date.now() - payment.createdAt;

  //  const refundTime= 7* 24*60*60*1000;


  //  if(gap < refundTime){
  //   await instance.payments.refund(payment.razorpay_payment_id);
  //   refund=true;

  //  }

  //  await Payment.deleteOne({ _id: payment._id });
   user.subscription.id=undefined;
   user.subscription.status=undefined;
      
   await user.save();

   res.status(200).json({
    success:true,
    message: refund ? "Subscription Cancelled , You will receive full refund within 7 days." :
     " No Refund after seven days of buying subscription"
   })

    

});
export const paymentVerification= Error(async(req , res , next) => {

  const user=User.findById(req.user._id);
  try{

    const {razorpay_signature , razorpay_payment_id , razorpay_order_id} = req.body;

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const order_id= user.subscription.id;



   const generated_signature = crypto.createHmac("sha256" , process.env.RAZORPAY_SECRET).update(razorpay_payment_id + "|" + order_id , "utf-8").digest("hex");

  //  order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET

  // generated_signature = hmac_sha256(order_id + "|" + razorpay_payment_id, process.env.RAZORPAY_SECRET);


   const isAunthentic=generated_signature == razorpay_signature;

   

   if(!isAunthentic){
    return res.redirect(`${process.env.FRONTEND_URL}/paymentfail`);
    console.log(hree)
   }

  await Payment.create({

    razorpay_signature,
     razorpay_payment_id,
      razorpay_order_id,

  });

  user.subscription.status="active";

  await user.save();

  res.redirect(`${process.env.FRONTEND_URL}/paymentsuccess?reference=${razorpay_payment_id}`)

}
catch (error) {
  
  console.error('Error in paymentVerification:', error);
  
  return res.status(500).json({ error: 'Internal Server Error' });
}
      

    

});

export const getRazorPayKey= Error(async(req , res , next) => {
    res.status(200).json({
        success:true,
        key:process.env.RAZORPAY_KEY
    })
})



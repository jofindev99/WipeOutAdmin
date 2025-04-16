const {CouponModel}=require('../../models/coupon');


module.exports={

    addCoupon:async(req,res)=>{

        try {

            console.log(req.body);
            const couponData=req.body;

            const coupon = new  CouponModel(couponData)
            await coupon.save();
            res.status(201).json({ message: "Coupon added successfully", coupon });
        } catch (error) {
            res.status(400).json({message:"efhbeb"})
            
        }

    }
}
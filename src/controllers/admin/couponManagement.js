const { CouponModel } = require("../../models/coupon");

module.exports = {
  addCoupon: async (req, res) => {
    try {
      console.log(req.body);
      const couponData = req.body;

      const coupon = new CouponModel(couponData);
      await coupon.save();
      res.status(201).json({ message: "Coupon added successfully", coupon });
    } catch (error) {
      res.status(400).json({ message: "efhbeb" });
    }
  },
  getAllCoupon: async (req, res) => {
    try {
      const coupons = await CouponModel.find(); // Fetch all services
      res.status(200).json({ coupons });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  },

  changeCouponStatus: async (req, res) => {
    try {
      const { id: couponId } = req.params;

      const coupon = await CouponModel.findById({ _id: couponId });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }

      coupon.isActive = !coupon.isActive;
      await coupon.save();

      return res
        .status(200).json({message: "Status changed successfully",status: coupon.status,});

    } catch (error) {

        console.error(error);
        return res.status(500).json({ message: " something went wrong" });

    }
  },
  updateCoupon:async (req,res)=>{
    try {
        const updatedDAta = req.body;
        const { id: couponId } = req.params;
  
        const updatedCoupon = await CouponModel.findByIdAndUpdate(
          couponId,
          updatedDAta,
          { new: true } // return updated document
        );
  
        if (!updatedCoupon) {
          return res.status(404).json({ message: "Service not found" });
        }
  
        return res.status(200).json({
          message: "coupon updated successfully",
          //service: updatedService,
        });
      } catch (error) {
  
        console.error(error);
  
        return res.status(500).json({ message: " something went wrong" });
      }

  },
  getACoupon:async(req,res)=>{
    try {

      const { id: couponId } = req.params;
      const coupon = await CouponModel.findById({ _id: couponId });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
      return res.status(200).json({
        message: "copon data",coupon: coupon,});


      
    } catch (error) {

      return res.status(500).json({ message: " something went wrong" });
      
    }

    


  }
};

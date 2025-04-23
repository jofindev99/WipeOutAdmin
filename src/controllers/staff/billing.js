const { billingModel } = require("../../models/billing");
const { serviceModel } = require("../../models/services");
const { customerModel } = require("../../models/customer");
const { CouponModel } = require("../../models/coupon");

module.exports = {
  getBillingData: async (req, res) => {
    try {
      const services = await serviceModel.find(); // Fetch all services
      return res.status(200).json({ services: services });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Failed to fetch services" });
    }
  },

  billing: async (req, res) => {
    let customer = await customerModel.findOne({
      phone: req.body.customerPhone,
    });

    if (!customer) {
      customer = new customerModel({
        phone: req.body.customerPhone,
        name: req.body.customerName,
      });
      await customer.save();
    }
    try {
      req.body.billingStaff = req.staff._id;
      req.body.customerId = customer._id;
      const bill = new billingModel(req.body);
      await bill.save();
      return res.status(201).json(bill);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },


  applyCoupon: async (req, res) => {
    try {
      const { code, billingId } = req.body;
  
      const coupon = await CouponModel.findOne({ code });
      if (!coupon) {
        return res.status(404).json({ message: "Coupon not found" });
      }
  
      if (!coupon.isActive) {

        return res.status(400).json({ message: "Coupon is not active" });

      }
  
      const bill = await billingModel.findById(billingId);

      if (!bill) {

        return res.status(404).json({ message: "Bill not found" });

      }
  
      const originalAmount = bill.finalAmount;
  
      if (originalAmount < coupon.minInvoiceAmount) {

        return res.status(422).json({message: `Cannot apply coupon. Minimum purchase of ₹${coupon.minInvoiceAmount} is required.`,});

      }
  
      let discountApplied = 0;
  
      if (coupon.discountType === "flat") {
        
        discountApplied = coupon.discountValue;
  
      } else if (coupon.discountType === "percentage") {

        const percentageDiscount = (originalAmount * coupon.discountValue) / 100;
        discountApplied = Math.min(percentageDiscount, coupon.maxDiscount || percentageDiscount);
      } else {
        return res.status(400).json({ message: "Invalid discount type" });
      }
  
      bill.finalAmount = Math.max(originalAmount - discountApplied, 0); // avoid negative finalAmount
      bill.appliedCoupon.couponId = coupon._id;
      await bill.save();
  
      const populatedBill = await billingModel
        .findById(billingId)
        .populate("billingStaff")
        .populate("appliedCoupon.couponId");
  
      return res.status(200).json({
        message: "Coupon applied successfully",
        discountApplied,
        finalAmount: bill.finalAmount,
        bill: populatedBill,
      });
    } catch (error) {
      console.error("Error applying coupon:", error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  }
  ,
  
  // applyCoupon: async (req, res) => {

  //   try {
  //     let coupon = await CouponModel.findOne({ code: req.body.code });

  //     if (!coupon.isActive) {
  //       return res.status(400).json({ message: "coupon not active" });
  //     }

  //     let bill = await billingModel.findById(req.body.billingId);

  //     if(coupon.discountType==='flat'){

  //        const finalAmount= bill.finalAmount-coupon.discountValue
  //        if(coupon.minInvoiceAmount <= bill.finalAmount ){
            
  //           bill.finalAmount = finalAmount; // update field
  //           bill.appliedCoupon.couponId = coupon._id;
  //           await bill.save(); 
  //           const populatedBill = await billingModel.findById(req.body.billingId).populate("billingStaff").populate("appliedCoupon.couponId")

  //           return res.status(200).json({ message: "coupon applied  succefully",populatedBill });

  //        }else if (coupon.minInvoiceAmount >= bill.finalAmount) {

  //           return res.status(422).json({message: `cant apply coupon, minimum purchase of RS:${coupon.minInvoiceAmount}is require to apply coupon `,});
  
  //         }
  //     }

  //     if (coupon.discountType === "percentage") {
  //       const discountAmount = (bill.finalAmount * coupon.discountValue) / 100;

  //       if (coupon.minInvoiceAmount <= bill.finalAmount && discountAmount <= coupon.maxDiscount)
  //          {

  //         bill.finalAmount = bill.finalAmount - discountAmount;
  //         bill.appliedCoupon.couponId = coupon._id;
  //         await bill.save();

  //         return res.status(200).json({ message: "coupon applied  succefully",bill });

  //       }else if(coupon.minInvoiceAmount <= bill.finalAmount && discountAmount >= coupon.maxDiscount){

  //         bill.finalAmount = bill.finalAmount - coupon.maxDiscount;
  //         bill.appliedCoupon.couponId = coupon._id;
  //         await bill.save();
  //         return res.status(200).json({ message: "coupon applied  succefully",bill });
          

  //       } else if (coupon.minInvoiceAmount >= bill.finalAmount || discountAmount >= coupon.maxDiscount) {

  //         return res.status(422).json({message: `cant apply coupon, minimum purchase of RS:${coupon.minInvoiceAmount} is require to apply coupon `,});

  //       }

  //     }
  //   } catch (error) {
  //       console.error(error)
  //       return res.status(500).json({message: "something went wrong",});

  //   }
  // },


  
};

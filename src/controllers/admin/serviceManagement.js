const {serviceModel}=require('../../models/services')
module.exports = {
  addService: async (req, res) => {
    try {
      console.log(req.body);
      const serviceData = req.body;

      const service = new serviceModel(serviceData);
      await service.save();
      res.status(201).json({ message: "serviceData added successfully", coupon });
    } catch (error) {
      res.status(400).json({ message: "efhbeb" });
    }
  },

  editService: async (req, res) => {},

  getAllService: (req, res) => {},

  blockOrUnblockService: (req, res) => {},
};

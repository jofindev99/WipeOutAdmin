const { serviceModel } = require("../../models/services");
module.exports = {
  addService: async (req, res) => {
    try {
      const serviceData = req.body;

      const existingService = await serviceModel.findOne({
        serviceName: serviceData.serviceName,
      });
      if (existingService) {
        return res
          .status(409)
          .json({ message: "this service is already existing" });
      }
      const service = new serviceModel(serviceData);
      await service.save();
      return res
        .status(201)
        .json({ message: "serviceData added successfully" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "efhbeb" });
    }
  },

  getAllService: async (req, res) => {
    try {
      const services = await serviceModel.find(); // Fetch all services
      res.status(200).json({ services });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  },

  changeserviceStatus: async (req, res) => {
    try {
      const { id: serviceId } = req.params;

      const service = await serviceModel.findById({ _id: serviceId });
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      service.isActive = !service.isActive;
      await service.save();

      return res
        .status(200)
        .json({
          message: "Status changed successfully",
          status: service.isActive,
        });
    } catch (error) {
      console.error(error);

      return res.status(500).json({ message: " something went wrong" });
    }
  },

  updateService: async (req, res) => {
    try {
      const updatedDAta = req.body;
      const { id: serviceId } = req.params;

      const updatedService = await serviceModel.findByIdAndUpdate(
        serviceId,
        updatedDAta,
        { new: true } // return updated document
      );

      if (!updatedService) {
        return res.status(404).json({ message: "Service not found" });
      }

      return res.status(200).json({
        message: "Service updated successfully",
        //service: updatedService,
      });
    } catch (error) {

      console.error(error);

      return res.status(500).json({ message: " something went wrong" });
    }
  },
  getAService:async(req,res)=>{
      try {
  
        const { id: serviceId } = req.params;
        const service = await serviceModel.findById({ _id: serviceId });
        if (!service) {
          return res.status(404).json({ message: "Coupon not found" });
        }
        return res.status(200).json({
          message: "service data",service:service,});
  
  
        
      } catch (error) {
  
        return res.status(500).json({ message: " something went wrong" });
        
      }
    }
}

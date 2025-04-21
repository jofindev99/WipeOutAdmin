const {inventory}=require("../../models/inventory")

module.exports={
    addItem:async (req,res)=>{
        console.log(req.body);

        try {
              const inventoryData = req.body;
              const existinginventory = await inventory.findOne({itemName: inventoryData.itemName});

              if (existinginventory) {

                return res
                  .status(409)
                  .json({ message: "this Item is already existing" });
              }

              const inventories = new inventory(inventoryData);
              await inventories.save();
              return res
                .status(201)
                .json({ message: "item added  added successfully" });
            } catch (error) {
              console.error(error);
              return res.status(400).json({ message: " faild" });
            }
    },
    getAllItems:async (req,res)=>{

      try {
            const inventories = await inventory.find(); // Fetch all services
            res.status(200).json({ inventories });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to fetch items" });
          }

    },

    updateItem:async (req,res)=>{
      console.log(req.params);
      console.log(req.body)

        try {
          const updatedDAta = req.body;
          const { id: itemId } = req.params;
    
          const updatedItem = await inventory.findByIdAndUpdate(
            itemId,
            updatedDAta,
            { new: true } // return updated document
          );
    
          if (!updatedItem) {
            return res.status(404).json({ message: "Service not found" });
          }

          return res.status(200).json({
            message: "Service updated successfully",
          });
        } catch (error) {

          console.error(error);
          return res.status(500).json({ message: " something went wrong" });

        }
    },
    

}
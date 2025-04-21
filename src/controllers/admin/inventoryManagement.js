const {inventory}=require("../../models/inventory")

module.exports={
    addItem:async (req,res)=>{
        console.log(req.body);

        try {
              const inventoryData = req.body;
        
              const existinginventory = await inventory.findOne({
                itemName: inventoryData.itemName,
              });
              if (existinginventory) {
                return res
                  .status(409)
                  .json({ message: "this Item is already existing" });
              }
              const inventories = new inventoryData(inventoryData);
              await inventories.save();
              return res
                .status(201)
                .json({ message: "item added  added successfully" });
            } catch (error) {
              console.error(error);
              return res.status(400).json({ message: " faild" });
            }
        

    }
}
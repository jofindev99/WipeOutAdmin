const {adminLoginValidator}=require('../../src/utils/adminLoginValidation')
module.exports = {

    adminLoginValidator : async (req, res, next) => {
        try {
            
          const { emailId, phoneNumber, password } = req.body;
      
          // Add all required fields to validation
          
          await adminLoginValidator({ emailId, phoneNumber, password });
          
      
          next(); // proceed to controller if valid
        } catch (error) {
          res.status(400).json({ error: error.message || 'Validation failed' });
        }
    }
    
}
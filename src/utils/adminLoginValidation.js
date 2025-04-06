const validator=require('validator')

module.exports={
     loginValidator :({ emailId, phoneNumber, password }) => {

        if (!validator.isEmail(emailId)) {
          throw new Error('Email is not valid');
        }
      
        if (!validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })) {
          throw new Error('Password must be strong: min 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 symbol');
        }
      
        if (!validator.isMobilePhone(phoneNumber, 'en-IN')) {
          throw new Error('Phone number is not valid');
        }
      }
}
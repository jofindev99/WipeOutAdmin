const express=require('express');
const router=express.Router();
const {uploadFields}=require('../config/multer');
const {adminLoginValidator}=require('../middlewares/loginValidation');
const {adminAuth}=require('../middlewares/adminAuth');
const {adminLogin}=require('../controllers/admin/adminSignIn');
const {getAllStaff,addNewStaff,editExistingStaff,deleteExistingStaff,getStaffData}=require('../controllers/admin/staffManagament');
const {addCoupon}=require('../controllers/admin/couponManagement')
const {addService}=require('../controllers/admin/serviceManagement')



//router.post('/',adminSignup)

router.get('/',adminAuth)
router.post('/adminlogin',adminLoginValidator,adminLogin)
router.post('adminLogout',adminAuth)
router.post('/profile',adminAuth,)


/* staff management */

router.get('/staff',adminAuth,getAllStaff)//to list all staffs to table 
router.post('/staff',adminAuth,uploadFields,addNewStaff)
router.get('/staff/:id',adminAuth,getStaffData)
router.patch('/staff/:id',adminAuth,uploadFields,editExistingStaff)
router.patch('/staff/:id/status',adminAuth,deleteExistingStaff)



/* coupon management*/

// addcoupon
// get all coupon 
// edit coupon
// block or unblock 


router.post("/coupon",adminAuth,addCoupon)
router.get("/coupon",adminAuth,) //to list all coupon on admin side 
router.patch("/coupon/:id",adminAuth)
router.patch("/coupon/:id/status",adminAuth)


/*service management*/

// add service
// edit service
// block/unblock service 
// get all service 

router.post("/service",adminAuth,addService)
router.get("/service",adminAuth,)
router.patch("/service/:id",adminAuth)
router.patch("/service/:id/status",adminAuth)


/* bill management*/


router.get("/billing",adminAuth,)
router.post("/billing",adminAuth,)
router.patch("/billing/:id",adminAuth)


/* checkout */

router.get("/checkout",adminAuth,)


module.exports = router;
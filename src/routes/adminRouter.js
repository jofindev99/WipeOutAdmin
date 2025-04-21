const express=require('express');
const router=express.Router();
const {uploadFields}=require('../config/multer');
const {adminLoginValidator}=require('../middlewares/loginValidation');
const {adminAuth}=require('../middlewares/adminAuth');
const {adminLogin}=require('../controllers/admin/adminSignIn');
const {getAllStaff,addNewStaff,editExistingStaff,deleteExistingStaff,getStaffData}=require('../controllers/admin/staffManagament');
const {addCoupon,getAllCoupon,changeCouponStatus,updateCoupon}=require('../controllers/admin/couponManagement');
const {addService,getAllService,changeserviceStatus,updateService}=require('../controllers/admin/serviceManagement');
const {addItem,getAllItems,updateItem}=require('../controllers/admin/inventoryManagement')



//router.post('/',adminSignup)

router.get('/',adminAuth);
router.post('/adminlogin',adminLoginValidator,adminLogin);//✅
router.post('adminLogout',adminAuth);//❌
router.post('/profile',adminAuth,);//❌


/* staff management */



router.get('/staff',adminAuth,getAllStaff)// ✅
router.post('/staff',adminAuth,uploadFields,addNewStaff)//✅
router.get('/staff/:id',adminAuth,getStaffData)//✅
router.patch('/staff/:id',adminAuth,uploadFields,editExistingStaff)//❌
router.patch('/staff/:id/status',adminAuth,deleteExistingStaff)//✅



/* coupon management*/


router.post("/coupon",adminAuth,addCoupon)//✅
router.get("/coupon",adminAuth,getAllCoupon) // ✅
router.patch("/coupon/:id",adminAuth,updateCoupon)//✅
router.patch("/coupon/:id/status",adminAuth,changeCouponStatus)//✅



/*service management*/


router.post("/service",adminAuth,addService)//✅
router.get("/service",adminAuth,getAllService)//✅
router.patch("/service/:id",adminAuth, updateService)//✅
router.patch("/service/:id/status",adminAuth,changeserviceStatus)//✅


/* bill management*/


router.get("/billing",adminAuth,)//❌
router.post("/billing",adminAuth,)//❌
router.patch("/billing/:id",adminAuth)//❌


/* checkout */

router.get("/checkout",adminAuth,)//❌

/* inventory */
router.post("/inventory",adminAuth,addItem)//✅
router.get("/inventory",adminAuth,getAllItems)//✅
router.patch("/inventory/:id",adminAuth,updateItem)//✅



module.exports = router;
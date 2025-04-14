const express=require('express')
const router=express.Router()
const {uploadFields}=require('../config/multer')
const {adminLoginValidator}=require('../middlewares/loginValidation')
const {adminAuth}=require('../middlewares/adminAuth')
const {adminLogin}=require('../controllers/admin/adminSignIn')
const {getAllStaff,addNewStaff,editExistingStaff,deleteExistingStaff,getStaffData}=require('../controllers/admin/staffManagament')



//router.post('/',adminSignup)

router.get('/',adminAuth)
router.post('/adminlogin',adminLoginValidator,adminLogin)
router.post('adminLogout',adminAuth)
router.post('/profile',adminAuth,)


/* staff management */

router.get('/staff',adminAuth,getAllStaff)
router.post('/staff',adminAuth,uploadFields,addNewStaff)
router.get('/staff/:id',adminAuth,getStaffData)
router.patch('/staff/:id',adminAuth,uploadFields,editExistingStaff)
router.patch('/staff/:id/status',adminAuth,deleteExistingStaff)





module.exports = router;
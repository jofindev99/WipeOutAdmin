const express=require('express')
const router=express.Router()

const {adminLoginValidator}=require('../middlewares/loginValidation')
const {adminAuth}=require('../middlewares/adminAuth')
const {adminLogin}=require('../controllers/admin/adminSignIn')
const {getAllStaff,addNewStaff,editExistingStaff,deleteExistingStaff}=require('../controllers/admin/staffManagament')




//router.post('/',adminSignup)

router.get('/',adminAuth)
router.post('/adminlogin',adminLoginValidator,adminLogin)
router.post('adminLogout',adminAuth)
router.post('/profile',adminAuth,)



/* staff management */

router.get('/staff',adminAuth,getAllStaff)
router.post('/staff',adminAuth,addNewStaff)
router.patch('/staff/:id',adminAuth,editExistingStaff)
router.patch('/staff/:id/delete',adminAuth,deleteExistingStaff)




module.exports = router;
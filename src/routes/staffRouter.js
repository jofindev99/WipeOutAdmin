const express=require('express')
const router=express.Router();
const {staffLogin}=require('../controllers/staff/staff')
const{staffAuth}=require('../middlewares/staffAuth')
const {billing,getBillingData,applyCoupon}=require('../controllers/staff/billing')
const {payments}=require('../controllers/staff/payment')
const multer = require('multer');




const upload = multer();

router.post('/',staffLogin)
router.get('/billing',staffAuth,getBillingData)
router.post('/billing',staffAuth, upload.none(),billing)
router.post('/coupon',staffAuth,applyCoupon)
router.post('/payments',staffAuth,payments)





module.exports = router;
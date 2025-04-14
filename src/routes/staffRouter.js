const express=require('express')
const router=express.Router();
const {staffLogin}=require('../controllers/staff/staff')
const{staffAuth}=require('../middlewares/staffAuth')
const {billing}=require('../controllers/staff/billing')
const multer = require('multer');



const upload = multer();

router.post('/',staffLogin)
router.get('/billing',staffAuth,)
router.post('/billing',staffAuth, upload.none(),billing)





module.exports = router;
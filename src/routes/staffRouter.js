const express=require('express')
const router=express.Router();
const {staffLogin}=require('../controllers/staff/staffLogin')

router.post('/',staffLogin)

module.exports = router;
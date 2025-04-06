const express=require('express')
const router=express.Router()

const {adminSignup}=require('../controllers/admin/adminSignIn')

router.post('/',adminSignup)

/* staff management */

router.post('/staff',()=>{})



module.exports = router;
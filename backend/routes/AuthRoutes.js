const express = require("express")
const router = express.Router()
const {signUp,login,deleteAccount,updateUser} = require("../Controller/Auth")
const {auth} = require('../middlewares/auth')
router.post("/signup",signUp)
router.post("/login",login)
router.post('/deleteAccount',auth,deleteAccount)
router.post('/updateUser',auth,updateUser)


module.exports = router
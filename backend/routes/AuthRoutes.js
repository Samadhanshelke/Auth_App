const express = require("express")
const router = express.Router()
const {signUp,login,deleteAccount,updateUser} = require("../Controller/Auth")

router.post("/signup",signUp)
router.post("/login",login)
router.post('/deleteAccount',deleteAccount)
router.post('/updateUser',updateUser)


module.exports = router
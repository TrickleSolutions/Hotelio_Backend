const express = require('express');
const router = express.Router();
const { SingupValidate, LoginValidate } = require('../../validate');
const { SignupUser, LoginUser } = require("../../Controllers/Customers/CustomerAuth")


// signup the user
router.post("/signup", SignupUser);
// login the user 
router.post("/login", LoginUser);



module.exports = router
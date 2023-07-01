const { SingupValidate, LoginValidate } = require("../../validate");
const CustomerAuthModel = require("../../Model/CustomerModels/CustomerAuthModel")
const bycrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();



// signup 
const SignupUser = async (req, res) => {

    try {
        // lets validate the data
        const { error, value } = SingupValidate(req.body);
        if (error) return res.status(400).json(error.details[0].message);


        // username avialability check
        const isUserFound = await CustomerAuthModel.findOne({ email: req.body.email })
        if (isUserFound) return res.status(409).json("Email Already Registered")

        // make the password as a hash password 
        const salt = await bycrypt.genSalt(10)
        const hashPassword = await bycrypt.hash(req.body.password, salt)

        // my formdata
        const formdata = new CustomerAuthModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
        })

        const saveData = await formdata.save()
        res.status(200).json(saveData);

    } catch (error) {
        res.status(500).json(error)
    }
}



// Login Controller 
const LoginUser = async (req, res) => {

    try {
        // validate the data  
        const { error, value } = LoginValidate(req.body);
        if (error) return res.status(400).json(error.details[0].message)

        // find the user 
        const User = await CustomerAuthModel.findOne({ email: req.body.email });
        if (!User) return res.status(404).json({ message: "User Not Found" });
        const { password, ...rest } = User

        // compare the password 
        const compare = bycrypt.compare(req.body.password, User.password)
        if (!compare) return res.status(404).json({ message: "Password Incorrect" })

        //  jenerate the jwt token  
        const token = jwt.sign(rest, process.env.SECRET_CODE)
        res.header("access-token", token)
        res.status(200).json(User)
    } catch (error) {
        res.status(500).json(error)
    }

}


module.exports = { SignupUser, LoginUser }
const Users = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JoiValidator = require("../utils/joi_validator");


class UserController {
    //Sign up user
    static signUpUser = async (req, res) => {
        try {
            const requestBody = req.body;

            // Validate the Request Body
            const {error, value} = JoiValidator.userSignUpSchema.validate(requestBody);
            if(error){
                return res.status(400).json({
                    "success": false,
                    "code": 400,
                    "message": `${error.message}` 
                })
            }

            // Check if email already exists
            const existUser = await Users.findOne({email: value.email});
            if(existUser){
                return res.status(409).json({
                    "success": false,
                    "code": 409,
                    "message": `user already exist` 
                })
            }

            // Encrypt password befor saving to DB
            const ePassword = bcrypt.hashSync(value.password, 10);

            const savedUser = await Users.create({ ...value, password: ePassword });
            return res.status(201).json({
                "success": true,
                "code": 201,
                "data": savedUser
            })
        } catch (error) {
            console.log(`ERROR:::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "server error please try again" 
            })
        }
        
    }

    static loginUser = async (req, res) => {
        try {
            const requestBody = req.body;

            // Validate the Request Body
            const {error, value} = JoiValidator.userLoginSchema.validate(requestBody);
            if(error){
                return res.status(400).json({
                    "success": false,
                    "code": 400,
                    "message": `${error.message}` 
                })
            }
            
            //  Check if user exist
            const existUser = await Users.findOne({email: value.email});
            if(!existUser){
                return res.status(404).json({
                    "success": false,
                    "code": 404,
                    "message": `user does not exist` 
                })
            }
            const { id, fistname, lastname, phonenumber, email } = existUser;
            
            
            //  Decrypt password and compare
            const isPasswordMatched = bcrypt.compareSync(value.password, existUser.password)
            if(!isPasswordMatched){
                return res.status(401).json({
                    "success": false,
                    "code": 401,
                    "message": `Incorrect password!!! Please check your password and try again.` 
                })
            }

            //  Create token
            const token = jwt.sign(
                { id, fistname, lastname, phonenumber, email },
                `${process.env.JWT_SECRET_KEY}`,
                {expiresIn: "1d"}
            )
            console.log(`TOKEN:::;${token}`);

            return res.status(200).json({
                "success": true,
                "code": 200,
                "message": `You are logged in successfully.`,
                "data": { ...existUser.toObject(), token }
            })

        } catch (error) {
            console.log(`ERROR:::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "server error please try again" 
            })
        }
    }

    // All users
    static getAllUsers = async (req, res) => {
        try {
            // Get all users
            const users = await Users.find();
            if(users.length === 0){
                return res.status(404).json({
                    "success": false,
                    "code": 404,
                    "message": "No user found." 
                })
            }
            return res.status(200).json({   
                "success": true,
                "code": 200,
                "message": "Users retrieved successfully" ,
                "data": users
            })
        } catch (error) {
            console.log(`ERROR:::::${error}`);

            return res.status(500).json({
                "success": false,
                "code": 500,
                "message": "server error please try again" 
            })
        }
    } 

    // Single User
    static getSingleUser = async (req, res) => {
         
    }
}

module.exports = UserController;
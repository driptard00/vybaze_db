const jwt = require("jsonwebtoken");
const Users = require("../models/user_model");

class TokenVerification{

    // User token verification
    static userTokenValidation = async (req, res, next) => {
        try {
            
            // Get the token from the Header, Queary or Body, if available
            const token = req.headers.authorization ||
                req.headers['x-access-token'] ||
                req.query.token ||
                req.body.token;
            if(!token){
                return res.status(401).json({
                    "success": false,
                    "code": 401,
                    "success": "Unauthorized, you did not provide any token"
                })
            }

            //Get users id
            const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

            // Make sure that the respective user exists in the DB
            const user = await Users.findById({ _id: id });
            if(!user){
                return res.status(401).json({
                    "success": false,
                    "code": 401,
                    "success": "Unauthorized, this user does not exist"
                })
            }

            // Now append the decoded token to the request body
            req.requestPayload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            return next();
        } catch (error) {
            return res.status(401).json({
                "success": false,
                "code": 401,
                "success": "Unauthorized, you have an invalid token"
            })
        }
    }
}

module.exports = TokenVerification;
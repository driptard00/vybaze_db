 const otpgenerator = require("otp-generator");
const fast_two_sms = require("fast-two-sms");

class OtpController{

    // Generate OTP

    static sendOtp = async (req, res) => {
        try {
            const otp = otpgenerator.generate(4,  
                { 
                    upperCaseAlphabets: false, 
                    lowerCaseAlphabets: false ,
                    specialChars: false, 
                    digits: true 
                });
            if(!otp){
                return res.status(409).json({
                    "success": true,
                    "code": 409,
                    "message": "OTP generated Unsuccessful" 
                })
            }

            //SMS options
            var options = {
                authorization : YOUR_API_KEY , 
                message : 'Enter this otp to complete you registration' ,  
                numbers : ['08163421203', '08060800877']
            } 


            // Send Sms
            const sms_response = await fast2sms.sendMessage(options)

            return res.status(201).json({
                "success": true,
                "code": 201,
                "message": "OTP generated successfully" ,
                "data": otp
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
}

module.exports = OtpController;
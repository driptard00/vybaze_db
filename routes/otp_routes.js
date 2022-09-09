const { Router } = require("express");
const OtpController = require("../controllers/otp_controller");

const otp_router = Router();

otp_router.post(
    "/send_otp",
    OtpController.sendOtp
)

module.exports = otp_router;
const {Router} = require("express");
const otp_router = require("./otp_routes");
const userRouter = require("./user_routes");



// import all required routes

// initialize router
const router = Router();

router.use("/users", userRouter);

router.use("/otp", otp_router);

module.exports = router;
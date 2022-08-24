const {Router} = require("express");
const userRouter = require("./user_routes");



// import all required routes

// initialize router
const router = Router();

router.use("/users", userRouter);

module.exports = router;
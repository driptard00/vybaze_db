const { Router } = require("express");
const UserController = require("../controllers/user_controllers")

// Setup express router
const userRouter = Router();

//Sign up user
userRouter.post(
    "/signup",
    UserController.signUpUser
);
userRouter.post(
    "/login",
    UserController.loginUser
);
userRouter.get(
    "/all_users",
    UserController.getAllUsers
);
userRouter.get(
    "/single_user",
    UserController.getSingleUser
);


module.exports = userRouter;

const { Router } = require("express");
const UserController = require("../controllers/user_controllers");
const TokenVerification = require("../utils/token_validation");

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
    TokenVerification.userTokenValidation,
    UserController.getAllUsers
);
userRouter.get(
    "/single_user/:id",
    TokenVerification.userTokenValidation,
    UserController.getSingleUser
);
userRouter.put(
    "/single_user/:id",
    TokenVerification.userTokenValidation,
    UserController.updateSingleUser
);
userRouter.delete(
    "/single_user/:id",
    UserController.deleteSingleUser
);

module.exports = userRouter;

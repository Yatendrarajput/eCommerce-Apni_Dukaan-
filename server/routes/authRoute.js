import express from 'express'
import { registerController,loginController,testController, forgotPasswordController } from '../controllers/authcontroller.js'; 
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
//router object
const router = express.Router()

//routing
//register || method POST
router.post('/Register', registerController);

//LOGIN || POST
router.post('/Login',loginController)

//forgot password || POST
router.post('/forgot-password',forgotPasswordController)

//test routes
router.get('/Test', requireSignIn,isAdmin,testController);

//protected route auth
router.get('/user-auth', requireSignIn ,(req,res) => {
    res.status(200).send({ok:true});
});

//there are two middlewares here in the fist one token is being checked, then admin is being checked
export default router


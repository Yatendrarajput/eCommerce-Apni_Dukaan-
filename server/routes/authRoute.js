import express from 'express'
import { registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController } from '../controllers/authcontroller.js'; 
import { isAdmin,requireSignIn } from '../middleware/authMiddleware.js';
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

//protected user route auth
router.get('/user-auth', requireSignIn ,(req,res) => {
    res.status(200).send({ok:true});
});

//protected  admin route auth
router.get('/admin-auth', requireSignIn, isAdmin ,(req,res) => {
    res.status(200).send({ok:true});
});

// update profile
router.put('/profile', requireSignIn, updateProfileController)

// orders
router.get('/orders', requireSignIn, getOrdersController)
//there are two middlewares here in the fist one token is being checked, then admin is being checked
export default router
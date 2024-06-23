import { comparePassword, hashPassword } from '../helpers/authhelper.js';
import userModel from '../models/userModel.js'
import JWT from "jsonwebtoken";
import orderModel from '../models/orderModel.js'

//here we are importing data of user from usermodel and registering them

export const registerController = async(req,res) => {
    try {
        const{name, email, password, phone, address,answer}=req.body
        
        //validations
        if(!name){
            return res.send({message :'name is required'})
        }
        if(!email){
            return res.send({message :'email is required'})
        }
        if(!password){
            return res.send({message :'password is required'})
        }
        if(!phone){
            return res.send({message :'phone is required'})
        }
        if(!address){
            return res.send({message :'address is required'})
        }
        if(!answer){
            return res.send({message :'answer is required'})
        }
        //check if there is an existing user
        //by comparing email entered
        const existingUser= await userModel.findOne({email})
        //if user already exists then send out message
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:'Already Registered Please login'
            })
        }

        //register new users
        //first we hash the password entered by user

        const hashedPassword = await hashPassword(password)
        
        //save the password
        const user= await new userModel({
                name,
                email,
                phone,
                address,
                password: hashedPassword,
                answer
            }).save();
            // password (key) and value is hashPassword that is the password that has been previously hashed
    
        res.status(201).send({
                success:true,
                message:'USER REGISTERED SUCCESSFULLY',
                user,

            })
    } catch (error) {
        console.log(error)
        req.status(500).send({
            success:false,
            message: "error in registeration",
            error
        })
        
    }
};

//POST LOGIN
export const loginController =async(req,res) =>{
    try {
        const {email,password}= req.body
        //validation
        if(!email|| !password){
        return res.status(404).send({
            success:false,
            message:'Email cannot be empty'
    })
        }
        //abb agar humme successfully email mil gya toh hum password ki validity check krenge
        
        //first check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not registered'
            })
        }
        //compare password
        const match = await comparePassword(password, user.password)
        if(!match){
            return res.status(204).send({
                success:false,
                message:'Invalid Password'
            })
            
        }
        //creating token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'error in login',
            error
        })

        
    }
};
//forgotPasswordController
export const forgotPasswordController= async(req,res)=>{
    try {
        const{email,answer,newPassword}=req.body
        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'Answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'New Password is required'})
        }
        
    //check email and answer if correct then only change password
    const user =await userModel.findOne({email,answer})
    //validation
    if(!user){
        return res.status(404).send({
            success:false,
            message:'Wrong Email or Answer',
        });
    }
    //if email aur answer correct hua then password ko wapis hash krdenge
    const hashed =await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id,{password:hashed}); //restoring the password again
    res.status(200).send({
        success: true,
        message:"Password Reset Successfully",
    });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went wrong',
            error,
        })
    }
}

//test controller
export const testController = (req,res) =>{
    res.send('Protected Routes');
}


//update profile
export const updateProfileController = async (req,res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
          return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
          req.user._id,
          {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
          },
          { new: true }
        );
        res.status(200).send({
          success: true,
          message: "Profile Updated Successfully",
          updatedUser,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          success: false,
          message: "Error while updating profile",
          error,
        });
    }
};

//orders
export const getOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({ buyer: req.user._id })
        .populate("products", "-photo")
        .populate("buyer", "name");
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  //orders
  export const getAllOrdersController = async (req, res) => {
    try {
      const orders = await orderModel
        .find({})
        .populate("products", "-photo")
        .populate("buyer", "name")
        .sort({ createdAt: "-1" });
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error WHile Geting Orders",
        error,
      });
    }
  };
  
  //order status
  export const orderStatusController = async (req, res) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const orders = await orderModel.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error While Updating Order",
        error,
      });
    }
  };
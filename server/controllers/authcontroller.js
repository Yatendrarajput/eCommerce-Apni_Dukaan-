import { comparePassword, hashPassword } from '../helpers/authhelper.js';
import userModel from '../models/userModel.js'
import JWT from "jsonwebtoken";

//here we are importing data of user from usermodel and registering them

export const registerController = async(req,res) => {
    try {
        const{name, email, password, phone, address}=req.body
        
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
            message:'Invalid email or password'
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
        const token = await JWT.sign({_id:user_id}, process.env.JWT_SECRET,{expiresIn:'7d'});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address:user.address,

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

//test controller
export const testController = (req,res) =>{
    res.send('Protected Routes');
}

  
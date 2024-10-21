const userModel = require("../models/userModel")
const becrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async(req,res)=>{
    const{name,email,password} = req.body

    if(!name || !email || !password){
        return res.status(400).json({
            message:'All fields are required'
        })
    }

    const userExist = await userModel.findOne({email})
    if(userExist){
        return res.status(400).json({
            message:"User email already registered"
        })
    }

    const salt = await becrypt.genSalt(10)
    const hashedPassword = await becrypt.hash(password,salt)

   try{
    const userData =  await userModel.create({
        name,
        email,
        password :hashedPassword
    })
    res.status(201).json({
        success:true,
        message:'Successfully Registered'
    })
   }catch(error){
    res.status(500).json({
        message:error.message
    })
   }
}

const login = async(req,res)=>{
   const {email,password} = req.body
   try{
    if(!email||!password){
        res.status(400).json({
            message:'All fields are required'
        })
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:'Invalid email or password'
        })
    }

    const isPasswordMatch = await becrypt.compare(password,user.password)
    if(!isPasswordMatch){
       return res.status(400).json({
        message :'Invalid email or password'
       }) 
    }

    const token = jwt.sign({id:user._id,role:user.role},'test',{
        expiresIn:'1h'
    })

    res.status(201).json({
        success : true,
        message : "Authentication Success",
        token
    })

   }catch(error){
    res.status(500).json({
        message:error.message
    })
   }
}


module.exports={register,login}
const mongoose = require('mongoose')
const becrypt = require('bcryptjs')
const User = require('../models/userModel')
const dotenv = require('dotenv')

dotenv.config()


const createAdmin = async()=>{
    try{

        mongoose.connect(process.env.MONGO_URI)

        const adminExist = await User.findOne({role:'admin'})

        if(adminExist){
            console.log('Admin user already exist')
            return
        }

        const adminData = {
            name:'Admin User',
            email:'admin@mail.com',
            password:'admin',
            role:'admin'
        }

        const salt = await becrypt.genSalt(10)
        adminData.password = await becrypt.hash(adminData.password,salt)

        const adminUser = new User(adminData)
        await adminUser.save()

        console.log('Admin User Added Successfully')

        mongoose.connection.close()

       

    
    }catch(error){
        console.error(error)
    }
}

createAdmin()
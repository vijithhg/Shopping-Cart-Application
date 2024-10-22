const mongoose = require('mongoose')

const connectDB = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI).then(() => {
            console.log('Connected to MongoDB');
          })
    }catch(error){
        console.error('MongoDB Connection Failed',error)
    }
}


module.exports = connectDB

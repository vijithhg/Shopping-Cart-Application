const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')

dotenv.config()
const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(bodyParser.json())

connectDB()


app.use('/api/products', productRoutes)



app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
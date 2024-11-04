const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRouter')
const path = require('path')


dotenv.config()
const PORT = process.env.PORT || 8000



const app = express()
app.use(cors())

// Set the uploads folder as a static directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json())

connectDB()


app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order', orderRoutes)



app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})
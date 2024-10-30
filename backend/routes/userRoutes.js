const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { getOrdersByUser } = require('../controllers/orderController')
const { getCartByUser } = require('../controllers/cartController')
const { adminMiddleWare, customerMiddleWare } = require('../middleware/authMiddleware')
const { getAllUsers } = require('../controllers/userController')


router.get('/', adminMiddleWare, getAllUsers)
// router.get('/orders', getOrdersByUser)

router.get('/cart',customerMiddleWare, getCartByUser)



module.exports = router
const express = require('express')
const router = express.Router()
const { addItemToCart, updateCartItem, removeItemFromCart, clearCart } = require('../controllers/cartController')
const { customerMiddleWare } = require('../middleware/authMiddleware')

router.post('/', customerMiddleWare, addItemToCart)
router.post('/remove', customerMiddleWare, removeItemFromCart)
router.put('/', customerMiddleWare, updateCartItem)
router.delete('/', customerMiddleWare,clearCart)



module.exports = router
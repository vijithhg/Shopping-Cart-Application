const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { createOrder, getOrderById, getAllOrders, getOrdersByUser, updateOrder, deleteOrder } = require('../controllers/orderController')
const { customerMiddleWare } = require('../middleware/authMiddleware')

router.post('/',customerMiddleWare, createOrder)
// router.get('/', customerMiddleWare, getAllOrders)
router.get('/:id',customerMiddleWare, getOrderById)
router.put('/:id', customerMiddleWare, updateOrder)
router.get('/', customerMiddleWare,  getOrdersByUser)
router.delete('/:id', customerMiddleWare, deleteOrder)



module.exports = router
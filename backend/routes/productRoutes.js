const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { addProduct, getAllProduct, getProductById, updateProductById, deleteProductById } = require('../controllers/productController')
const { authMiddleWare, customerMiddleWare, adminMiddleWare } = require('../middleware/authMiddleware')

router.post('/', adminMiddleWare, upload.single('image') , addProduct)
router.get('/', customerMiddleWare, getAllProduct)
router.get('/:id',customerMiddleWare, getProductById)
router.put('/:id',adminMiddleWare, updateProductById)
router.delete('/:id',adminMiddleWare, deleteProductById)



module.exports = router
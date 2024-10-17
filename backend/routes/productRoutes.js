const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const { addProduct, getAllProduct, getProductById, updateProductById, deleteProductById } = require('../controllers/productController')

router.post('/', upload.single('image') , addProduct)
router.get('/', getAllProduct)
router.get('/:id', getProductById)
router.put('/:id', updateProductById)
router.delete('/:id', deleteProductById)



module.exports = router
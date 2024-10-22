
const  ProductModel =  require("../models/Product")


const addProduct = async(req,res)=>{
    const {name,price,description,category,stockQuantity} =  req.body
    const imageUrl = req.file.filename

    if(!name || !price || !description || !category || !stockQuantity || !imageUrl){
        return res.status(400).json({
            message:'All fields are required'
        })
    }
    try{      
        const productInfo = await ProductModel.create({name,price,description,category,stockQuantity,image:imageUrl})

        res.status(201).json({
            success:true,
            message:'Product Successfully Registered',
            productInfo
        })


    }catch(error){
        res.status(500).json({
            Message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getAllProduct = async(req,res)=>{
    try{
        const products = await ProductModel.find()
        res.status(200).json({
            success:true,
            products
        })
    }catch(error){
        res.status(500).json({
            Message: 'Internal Server Error',
            error: error.message
        })
    }
}

const getProductById = async(req,res)=>{
    const {id} = req.params 
    if(!id){
        return res.status(400).json({
            message:'Product ID is required'
        })
    }  
    try{
        const product = await ProductModel.findById(id)
        if(!product){
            return res.status(404).json({
                message:'Product Not Found'
            })
        }
        res.status(200).json({
            success : true,
            product
        })
    }catch(error){
        res.status(500).json({
            Message: 'Internal Server Error',
            error: error.message
        })
    }

}

const updateProductById=async(req,res)=>{
    const {id} = req.params
    try{
        const product = await ProductModel.findByIdAndUpdate(
        id,        
        req.body)          
    
        res.status(200).json({
            success:true,
            message:'User Updated Successfully'
        })
    }catch(error){
        res.status(500).json({
            Message: 'Internal Server Error',
            error: error.message
        })
    }
}

const deleteProductById=async(req,res)=>{
    const {id} = req.params
    try{
        const product = await ProductModel.findByIdAndDelete(id)
        res.status(200).json({
            success:true,
            message:'User deleted successfully'
        })
    }catch(error){
        res.status(500).json({
            Message: 'Internal Server Error',
            error: error.message
        })
    }
}

module.exports = {
    addProduct,
    getAllProduct,
    getProductById,
    updateProductById,
    deleteProductById
}



const addProduct = async(req,res)=>{
    try{

    }catch(error){
        res.status(500).json({
            Message: 'Internal Server Error',
            error: error.message
        })
    }
}
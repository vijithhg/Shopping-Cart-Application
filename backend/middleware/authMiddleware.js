const jwt = require('jsonwebtoken')
const adminMiddleWare = (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1]
    
    if(!token){
        return res.status(403).json({
            message:'Authentication required'
        })
    }

    jwt.verify(token,'test',(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message:'Unauthorized'
            })
        }

        if (decoded.role !== 'admin') {
            return res.status(403).json({
              message: 'Access denied: Admins only',
            });
          }
        req.userId = decoded.id
        next()
    })
    
}
const customerMiddleWare = (req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1]
    
    if(!token){
        return res.status(403).json({
            message:'Authentication required'
        })
    }

    jwt.verify(token,'test',(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message:'Unauthorized'
            })
        }

        req.userId = decoded.id
        next()
    })
    
}

module.exports = {adminMiddleWare,customerMiddleWare}
import { useEffect, useState } from "react"
import { fetchProducts } from "../services/product"
import {useDispatch} from 'react-redux'
import Header from "../components/Header"
import { addItemToCart, getCartItemsCount } from "../services/cart"
import toast from "react-hot-toast"
import { setCartItemsCount } from "../redux/cartSlice"


const ProductList = () => {

    const [productList, setProductList] = useState([])
    const dispatch = useDispatch()

    const fetchAllProducts = async () => {
        const res = await fetchProducts()
        setProductList(res)
    }

    const cartItemsCount = async ()=>{
        try{
            const res = await getCartItemsCount()
            dispatch(setCartItemsCount(res.length))
        }catch(error){
            console.log(error)
        }
        

    }

    useEffect(() => {

        fetchAllProducts()
        cartItemsCount()

    }, [])

    //addtocart
    const addToCart=async(_id)=>{
        let quantity=1
        try{
            const res = await addItemToCart(_id,quantity)
            toast.success(res.message)
            cartItemsCount()
        }catch(error){
            console.log(error)
        }
        
    }



    return (
        <div className="container">
            <Header/>
            <div className="row">
                {
                    productList?.map((product) => {
                        const {name,description,image,price,_id}= product
                        return (
                            <div key={product?.id} className="col-4">
                                <div className="card" style={{width:'18rem'}}>
                                    <img src={image} className="card-img-top" alt="..."/>
                                        <div className="card-body">
                                            <h5 className="card-title">{name}</h5>
                                           <p>{description}</p>
                                           <p className="fw-bolder">{price} ₹</p>
                                           <div>
                                            <button className="btn btn-primary" onClick={()=>addToCart(_id)}>Add To Cart</button>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductList
import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getCartByUser, removeItemFromCart, updateCartByUser } from "../services/cart"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"




const Cart = () => {
    const token = localStorage.getItem('token')
    const [cartItems, setCartItems] = useState([])
    const fetchAllCartByUser = async (token) => {

        try {
            const res = await getCartByUser(token)
            setCartItems(res?.items)
        } catch (error) {
            console.log(error)
        }
    }

    const handleQuantityChange= async(item,newQuantity)=>{

        try{
            const res = await updateCartByUser(token,item?.productID?._id,newQuantity)

            setCartItems((prevItems)=>prevItems.map((cartItem)=>cartItem._id===item?._id?{...cartItem,quantity:newQuantity}  :cartItem  ))

        }catch(error){
            console.log(error)
        }
    }
       
    const deleteHandler=async(productID)=>{
        try{
            const res = await removeItemFromCart(token,productID)      
                toast.success('Item removed successfully')
     
            console.log(res)
        }catch(error){
            console.log(error)
        }
    }


    useEffect(() => {
        fetchAllCartByUser(token)
    }, [])


    return (
        <div>
            <Header />
            <div className="container">
                <h2>Shopping Cart</h2>
                {cartItems?.length === 0 ? (
                    <p>Your cart is empty</p>
                ) :
                    <div className="list-group">
                        <ul className="list-group">
                            {cartItems?.map((item) => (
                                <div key={item?.productID?._id}>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <img
                                                src={item?.productID?.image}
                                                alt={item?.name}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                            <span>{item?.productID?.name} - </span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item?.quantity}
                                                style={{
                                                    width: "60px",
                                                    marginLeft: "10px",
                                                    marginRight: "10px",
                                                }}
                                                onChange={(e)=>handleQuantityChange(item,e.target.value)}
                                            />
                                            <span>x ${item?.productID?.price}</span>
                                        </div>
                                                <div className="d-flex  text-center w-25 justify-content-between align-items-center">
                                                <p className="mb-0">Total Quantity: <span className="d-block text-muted">{item?.quantity}</span></p>  
                                                <p className="mb-0">Total Price:<span className="d-block text-muted">{item?.totalPrice.toFixed(2)}</span> </p>
                                                </div>
                                       

                                        <button
                                            className="btn btn-danger"
                                            onClick={()=>deleteHandler(item?.productID?._id)}
                                        >
                                            Remove
                                        </button>
                                    </li>
                                </div>
                            ))}
                        </ul>
                        <div className="d-flex justify-content-end mt-5" >
                            <Link to='/checkout' className="btn btn-primary">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default Cart
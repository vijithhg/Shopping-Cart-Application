import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getCartByUser } from "../services/cart"
import { clearCart, createOrder } from "../services/order"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom"

const CheckOut=()=>{
  const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const[cartItems,setCartItems]= useState([])
    const [address,setAddress]= useState()

    const getAllCartItems = async()=>{
        try{
            const res = await getCartByUser(token)
            setCartItems(res)
        }catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllCartItems()
    },[])

    const submitHandler=async()=>{
      const payload = {
        products : cartItems?.items?.map((item)=>({
          productID:item?.productID?._id,
          quantity:item?.quantity
        })),
        address
      }
      try{
        const res = await createOrder(token,payload)
        if(res){
          Swal.fire({
            title:'Order Placed',
            text:'Your product will be delivered to the provided address',
            icon:'success'
          }).then(()=>{
            navigate('/products')
          })

          await clearCart(token)

        }
      }catch(error){
        console.log(error)
      }

    }

    console.log(cartItems,'cart')

    return(
        <div className="contianer">
      <Header />
      <div className="container">
        <div className="row mt-5 align-items-center">
          <div className="col-md-4 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems?.items?.map((item,i) => {
                const { quantity, totalPrice } = item;
                const { name, price, description } = item.productID;
                return (
                  <li key={i} className="list-group-item d-flex justify-content-between">
                    <div className="w-50">
                      <h6 className="my-0">{name}</h6>
                      <small className="text-muted">{description}</small>
                    </div>
                    <div>
                      <span className="text-muted">
                        {price}X{quantity}
                      </span>
                    </div>
                    <span className="text-muted">₹{totalPrice}</span>
                  </li>
                );
              })}

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (IND)</span>
                <strong>{cartItems?.totalAmount} ₹</strong>
              </li>
            </ul>
          </div>
          <div className="col-md-7 text-end">
            <div className="mb-3">
              <textarea
                className="form-control"
                required
                rows="3"
                placeholder="Address"
                onChange={(e)=>setAddress(e.target.value)}
              ></textarea>
            </div>
            <button onClick={submitHandler}  type="submit" className="btn btn-primary ms-auto w-50 d-block">Submit</button>
            
          </div>
        </div>
      </div>
    </div>
    )
}

export default CheckOut
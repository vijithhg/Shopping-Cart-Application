import { useEffect, useState } from "react"
import AdminHeader from "../../components/admin/AdminHeader"
import { fetchProducts, updateProductById } from "../../services/product"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const AdminProducts = () => {

    const token = localStorage.getItem('token')
    const [products, setProducts] = useState([])
    const [modalShow,setModalShow] = useState(false)
    const [productUpdateValues,setProductUpdateValues]= useState({
        id:null,
        stockQuantity:null
    })
    const getAllProduct = async () => {
        try {
            const res = await fetchProducts(token)
            setProducts(res)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllProduct()
    }, [])

    const editHandler=(_id,stockQuantity)=>{
        setModalShow(true)
        setProductUpdateValues({
            id:_id,
            stockQuantity
        })
    }

   const submitHandler = async()=>{
    try{
        const res = await updateProductById(token,productUpdateValues.id,productUpdateValues.stockQuantity) 
        setModalShow(false)
        getAllProduct()

    }catch(error){
        console.log(error)
    }
   }

    return (
        <div>
            <AdminHeader />

            <h2>Products</h2>
            <div className="container">
                <div className="row">
                    {
                        products?.map((product) => {
                            const { name, description, image, price, _id,stockQuantity } = product
                            return (
                                <div key={product?.id} className="col-4">
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img src={image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{name}</h5>
                                            <p>{description}</p>
                                            <p className="fw-bolder">{price} ₹</p>
                                            <p>Quantity : {stockQuantity}</p>
                                            <div>
                                                <button className="btn btn-primary" onClick={()=>editHandler(_id,stockQuantity)}>Edit</button>
                                                <button className="btn btn-danger">Delete</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>


            {/* Modal start */}
            <Modal show={modalShow} onHide={()=>setModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" value={productUpdateValues.stockQuantity} onChange={(e)=>setProductUpdateValues({...productUpdateValues,stockQuantity:e.target.value})}  placeholder="Quantity"></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={()=>setModalShow(false)}>Close</Button>
                    <Button onClick={submitHandler}>Update</Button>
                </Modal.Footer>

            </Modal>




            {/* Modal end */}

        </div>
    )
}

export default AdminProducts
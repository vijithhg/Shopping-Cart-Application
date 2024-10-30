import { useState } from "react"
import { login } from "../services/auth"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"



const Login = () => {
   
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        email:'',
        password:''
    })
    const submitHandler=async(e)=>{
        e.preventDefault()
        try{
            const res = await login(userData.email,userData.password)
            toast.success('Successfully Loged In')
            localStorage.setItem('token',res.token)
            navigate('/products')
        }catch(error){
            console.log(error)
        }
       
        
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" onChange={(e)=>setUserData({...userData,email:e.target?.value})}  placeholder="Email"></input>
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control"  onChange={(e)=>setUserData({...userData,password:e.target?.value})} placeholder="Password"></input>
            </div>
            <div className="mb-3">
                <input type="submit" value="Login" className="btn btn-primary"></input>
            </div>
            </form>
           
        </div>
    )
}

export default Login
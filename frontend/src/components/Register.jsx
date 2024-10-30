import { useState } from "react"
import { register } from "../services/auth"
import toast from "react-hot-toast"

const Register = () => {
    const [userInfo, setUserInfo]= useState({
        name:'',
        email:'',
        password:''
    })
    const submitHandler = async (e)=>{
        e.preventDefault()
        try{
            const res = await register(userInfo.name,userInfo.email,userInfo.password)
            toast.success(res.message)
           setUserInfo({
            name:'',
            email:'',
            password:''
           })

        }catch(error){
            console.error(error)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label  className="form-label">Name</label>
                    <input type="text" 
                    value={userInfo.name} className="form-control" onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})}  placeholder="Name"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" 
                    value={userInfo.email}
                    className="form-control" onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})}  placeholder="Email"></input>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" 
                    value={userInfo.password}
                    className="form-control"  onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})}   placeholder="Password"></input>
                </div>
                <div className="mb-3">
                    <input type="submit" className="btn btn-primary" value="Register"></input>
                </div>
            </form>

        </div>
    )
}

export default Register
import { useState } from "react"

const Login = () => {
    const [userInfo, setUserInfo]= useState({
        name:'',
        email:'',
        password:''
    })

    return (
        <div>
            <form>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control"  placeholder="Email"></input>
            </div>
            <div className="mb-3">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Password"></input>
            </div>
            <div className="mb-3">
                <input type="submit" value="Login" className="btn btn-primary"></input>
            </div>
            </form>
           
        </div>
    )
}

export default Login
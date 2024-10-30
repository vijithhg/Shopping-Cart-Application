import Login from "../components/Login"
import Register from "../components/Register"

const LoginRegister = () => {
    return (
        <div className="container">
            <div className="row vh-100 align-items-center">
                <div className="col-6">
                    <h2>Login</h2>
                   <Login/>
                </div>
                <div className="col-6">
                   <Register/>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister
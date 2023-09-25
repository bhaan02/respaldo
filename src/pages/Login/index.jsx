import { Navigate, useNavigate } from "react-router-dom";
import logo from "../../assest/logo.png";
import "./index.css";
import { showLoginPopup } from "./utils";


const Login = ({setUser, user}) => {

    const navigate = useNavigate();

    if (user) return (<Navigate to="/"/>)
    
    return (
        <div>
            <div className="conteinerLogin">
                <img className='logo' src={logo} alt="logo"/>
                <button 
                onClick={()=> {showLoginPopup(navigate, "/", setUser)

                }}>
                    Login
                </button>
            </div>
        </div>
    );

   
}

export default Login;
import { Navigate, useNavigate } from "react-router-dom";
import { showLoginPopup } from "./utils";

const Login = ({setUser, user}) => {

    const navigate = useNavigate();

    if (user) return (<Navigate to="/"/>)
    
    return (
        <button 
        onClick={()=> {showLoginPopup(navigate, "/", setUser)

         }}>
            Login
         </button>
    );

   
}

export default Login;
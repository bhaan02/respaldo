import { useNavigate } from "react-router-dom";
import { showLoginPopup } from "./utils";

const Login = ({setUser}) => {

    const navigate = useNavigate();

    return (
        <button 
        onClick={()=> {showLoginPopup(navigate, "/Home", setUser)

         }}>
            Login
         </button>
    );

   
}

export default Login;
import { Navigate, Outlet } from "react-router-dom"

export const ProtectedRouter = ({user,children, redirectTo = "/Login"}) => {
    if (!user){
        return <Navigate to={redirectTo} />    
    }
    return <Outlet />
}
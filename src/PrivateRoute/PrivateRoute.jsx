import { useContext } from "react";
import {Navigate , useLocation} from "react-router-dom"
import { AuthContext } from "../Context/Context";
const PrivateRoute = ({children}) => {
    const {user,loading} =useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <span className="loading loading-spinner text-center text-orange-600 mx-auto block"></span>;
    }
    if(user){
        return children;
    }

    return (
        <Navigate state={location.pathname} to="/login"></Navigate>);
};

export default PrivateRoute;
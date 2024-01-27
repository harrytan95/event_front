import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    //const { auth } = useContext(AuthContext);
    // useDebugValue(auth, auth => auth?.login ? "Logged In" : "Logged Out")
    //console.log(auth?.login);
    return useContext(AuthContext);
}

export default useAuth;
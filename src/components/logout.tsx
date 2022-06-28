import React, { useEffect} from "react";
import {useHistory} from "react-router";



const Lognout: React.FC=()=>{
    const history = useHistory();
    useEffect(()=>{
        logout();
    },[]);
    const logout=()=>{
        history.push("/")
        window.location.reload();
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("role")
        localStorage.removeItem("avatar")
        alert("Logout Succeess")
    }
    return(<p></p>);
}
export default Lognout;

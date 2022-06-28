import React, {ChangeEvent, useState} from "react";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import {useHistory, useLocation} from "react-router";
import {Link} from "react-router-dom";
import {CloseOutlined} from "@ant-design/icons";

const Login: React.FC=()=>{
    const initialUser={
        username: "",
        password: ""
    }
    const history = useHistory();
    const [login , setLogin] = useState<IUser>(initialUser);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLogin({ ...login, [name]: value });
    };
    const handleLogin=()=>{
        var data={
            username: login.username,
            password: login.password,
        };
        AuthService.login(data.username as string,data.password as string)
            .then(() => {
                // // @ts-ignore
                // if (localStorage.getItem("role").substring(1, localStorage.getItem("role").length - 1).endsWith("ROLE_ADMIN")) {
                //     history.push("/admin");
                // } else {
                //     // @ts-ignore
                //     if (localStorage.getItem("role").substring(1, localStorage.getItem("role").length - 1).endsWith("ROLE_MODERATOR")){
                //         history.push("/mod");
                //     }
                //     else {
                //         history.push("/user");
                //     }
                // }
                history.push("/");
                window.location.reload();
            }, error => {
                const resMessage ="Username , Password are wrong"||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                alert(resMessage);
            });

    }

    return (
        // <div className="login-register">
        // <div className="login-form">
            <div >
                {/*<h1 style={{textAlign: "center"}}>*/}
                {/*    Login*/}
                {/*    <Link to={"/"} className="nav-link-home">*/}
                {/*        X*/}
                {/*    </Link>*/}
                {/*</h1>*/}

                {/*<form>*/}
                   <table>
                       <tr className="login-tr">
                           <td>
                               <label htmlFor="username">Username</label>
                           </td>
                           <td>
                               <input name="username" type="text" className="form-control" onChange={handleInputChange}/>
                           </td>
                       </tr>
                       <tr className="login-tr">
                           <td>
                               <label htmlFor="password">Password</label>
                           </td>
                           <td>
                               <input name="password" type="password" className="form-control" onChange={handleInputChange}/>
                           </td>
                       </tr>
                       <tr className="login-tr">
                           <td colSpan={2} style={{textAlign:"center"}}>
                               <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>
                                   <span>Login</span>
                               </button>
                           </td>
                       </tr>
                   </table>
                {/*</form>*/}
            </div>
        // </div>
    );
}
export default Login;
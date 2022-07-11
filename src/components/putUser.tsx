import React, {ChangeEvent, useEffect, useState} from "react";
import UserService from "../services/user.service";
import IUser from "../types/user.type";
import {useHistory} from "react-router";



const PutUser: React.FC=()=>{
    const initialUser = {
        email:"",
        password:""
    };
    const [user, setUser] = useState<IUser>(initialUser);
    const history = useHistory();
    // @ts-ignore
    const name = localStorage.getItem("userName").substring(1, localStorage.getItem("userName").length - 1);
    useEffect(()=>{
        loadUserName();
    },[]);
    const loadUserName=()=>{
        UserService.getPUser(name)
            .then((response: any) =>{
                setUser(response.data)
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const saveUser = () => {
        var data = {
            email:user.email,
            password: user.password,
            phone:user.phone,
            address: user.address
        };
        console.log(data)
        UserService.putUser(name,data)
            .then(() =>{
                    history.push("/user")
                    window.location.reload()
                },
                (error)=>{
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message||
                        error.toString();
                    console.log(resMessage)
                })

    };



    return (
        //
        // <div className="login-register">
        //     <div className="login-form">
        <div>
                <table>
                    {/*<tr className="login-tr">*/}
                    {/*    <td>*/}
                    {/*        <label htmlFor="username"> Username </label>*/}
                    {/*    </td>*/}
                    {/*    <td>*/}
                    {/*        <input*/}
                    {/*            name="username"*/}
                    {/*            type="text"*/}
                    {/*            placeholder={`${user?.username}`}*/}
                    {/*            onChange={handleInputChange}*/}
                    {/*        />*/}
                    {/*    </td>*/}
                    {/*</tr>*/}
                    <tr className="login-tr">
                        <td>
                            <label htmlFor="`email`"> Email </label>
                        </td>
                        <td>
                            <input
                                name="email"
                                type="text"
                                placeholder={`${user?.email}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="login-tr">
                        <td>
                            <label htmlFor="`phone`"> Phone </label>
                        </td>
                        <td>
                            <input
                                name="phone"
                                type="text"
                                placeholder={`${user?.phone}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="login-tr">
                        <td>
                            <label htmlFor="`address`"> Address </label>
                        </td>
                        <td>
                            <input
                                name="address"
                                type="text"
                                placeholder={`${user?.address}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>

                    <tr className="login-tr">
                        <td>
                            <label htmlFor="`password`"> Password </label>
                        </td>
                        <td>
                            <input
                                name="password"
                                type="password"
                                placeholder={`${user?.password}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="login-tr">
                        <td colSpan={2} style={{textAlign:"center"}}>
                            <button onClick={saveUser} className="btn btn-success" >
                                Update
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        // </div>
    );
}
export default PutUser;

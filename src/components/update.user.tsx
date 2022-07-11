import React, {ChangeEvent, useEffect, useState} from "react";
import UserService from "../services/user.service";
import PUser from "../types/userprepo";
import {useHistory} from "react-router";
interface Props{
    name:string
}

const UpdateUser: React.FC<Props>=(props)=>{

    const initialUser = {
        username:"",
        email:"",
        roles:"",
        departments:""
    };
    const history = useHistory();
    const [user, setUser] = useState<PUser>(initialUser);

    useEffect(()=>{
            loadUserName1();
    },[]);
    const loadUserName1=()=>{
        UserService.getUser(props.name)
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
            username: user.username,
            email:user.email,
            roles:user.roles,
            departments:user.departments
        };
        console.log(data)
        console.log(props.name)
        UserService.updateUser(props.name.toString(),data)
            .then((response: any) =>{
                    history.push("/list")
                    window.location.reload()
                },
                error=>{
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
        // <div className="login-register">
        //     <div className="login-form">
        <div>
                <table>
                    <tr className="login-tr">
                        <td>
                            <label htmlFor="username"> Username </label>
                        </td>
                        <td>
                            <input
                                name="username"
                                type="text"
                                placeholder={`${user?.username}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
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
                            <label htmlFor="`role`"> Role </label>
                        </td>
                        <td>
                            <input
                                name="roles"
                                type="text"
                                placeholder={`${user?.roles}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="login-tr">
                        <td>
                            <label htmlFor="`departments`"> Departments </label>
                        </td>
                        <td>
                            <input
                                name="departments"
                                type="text"
                                placeholder={`${user?.departments}`}
                                onChange={handleInputChange}
                            />
                        </td>
                    </tr>
                    <tr className="login-tr">
                        <td colSpan={2} style={{textAlign:"center"}}>
                            <button onClick={saveUser} className="btn btn-success">
                                Update
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        // </div>
    );
}
export default UpdateUser;

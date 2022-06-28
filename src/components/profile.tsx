import React, { useEffect, useState} from "react";
import UserService from "../services/user.service";
import PUser from "../types/userprepo";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {Descriptions, Image} from "antd";


const Profile: React.FC = () => {
    const [user,setUser] = useState<PUser>();
    const history = useHistory();
    useEffect(()=>{
        loadUserName();
    },[]);
    const loadUserName=()=>{
        // @ts-ignore
        var name = localStorage.getItem("userName").substring(1, localStorage.getItem("userName").length - 1);
        console.log(name)
        UserService.getUser(name)
            .then((response: any) =>{
                setUser(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
            console.log(e);
        });

    };
    const logout=()=>{
        history.push("/login")
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        localStorage.removeItem("role")
        alert("Logout Succeess")
    }


    return (
        <div>
            <h4 style={{textAlign:"center", fontSize: "35px"}}>Personal Information</h4>
            <table>
                <tr>
                    <td><Image src={user?.avatar} width={200}/></td>
                    <td>
                        <Descriptions style={{fontSize: '20px'}} bordered>
                            <Descriptions.Item label="Name" style={{fontSize: '20px'}}>{user?.username}</Descriptions.Item>
                            <Descriptions.Item label="Email" style={{fontSize: '20px'}}>{user?.email}</Descriptions.Item>
                            <Descriptions.Item label="Phone" style={{fontSize: '20px'}}>{user?.phone}</Descriptions.Item>
                            <Descriptions.Item label="Address" style={{fontSize: '20px'}}>{user?.address}</Descriptions.Item>
                            <Descriptions.Item label="Role" style={{fontSize: '20px'}}>{user?.roles}</Descriptions.Item>
                            <Descriptions.Item label="Departments" style={{fontSize: '20px'}}>{user?.departments}</Descriptions.Item>
                        </Descriptions>
                    </td>
                    {/*<td>*/}
                    {/*    <ul className="list-group">*/}
                    {/*        <li>Name: {user?.username}</li>*/}
                    {/*        <li>Email: {user?.email}</li>*/}
                    {/*        <li>Role: {user?.roles}</li>*/}
                    {/*        <li>Departments: {user?.departments}</li>*/}
                    {/*    </ul>*/}
                    {/*</td>*/}
                </tr>
            </table>
        </div>
    );
}

export default Profile;
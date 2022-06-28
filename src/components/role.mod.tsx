import React, {useEffect, useState} from "react";
import PUser from "../types/userprepo";
import UserService from "../services/user.service";
import Profile from "./profile";
import {Link} from "react-router-dom";


const RoleMod: React.FC = () => {


    const [users, setUsers] = useState<Array<PUser>>([]);

    useEffect( ()=>{
        listUser();
    },[]);
    const listUser = () => {
        UserService.getPublicContent()
            .then((response: any) =>{
                setUsers(response.data);
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };


    return (
        <div className="col-md-6">
            <Profile/>
            <h4>User List</h4>
            <ul className="list-group">
                {users &&
                    users.map((user) => (
                        <li>


                            <p>Name: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Role: {user.roles}</p>
                            <p>Departments: {user.departments}</p>
                            <button>
                                <Link to={`/update/${user.username}`} className="nav-link">
                                Update
                                </Link>
                            </button>

                        </li>
                    ))}
            </ul>
        </div>
    );


}
export default RoleMod;
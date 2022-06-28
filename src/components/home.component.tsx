import React, {useEffect, useState} from "react";
import PUser from "../types/userprepo";
import UserService from "../services/user.service";
import {Modal, Table, Tooltip} from "antd";
import Column from "antd/es/table/Column";
import {Link} from "react-router-dom";
import {CloseOutlined, EditFilled, ExclamationCircleOutlined, RetweetOutlined} from "@ant-design/icons";
import {useHistory} from "react-router";
import PutUser from "./putUser";
import UpdateUser from "./update.user";

const ListUser: React.FC = () => {
    const history = useHistory();
    const [edit, setEdit] = useState(false);
    const [users, setUsers] = useState<Array<PUser>>([]);
    var role: string;
    var userName: string;


    if (localStorage.length!==0){
        // @ts-ignore
        role = localStorage.getItem("role").substring(1,localStorage.getItem("role").length-1);
        // @ts-ignore
        userName = localStorage.getItem("userName").substring(1, localStorage.getItem("userName").length - 1);
        // console.log(role.length)
        // console.log(role)
    } else {
        userName ="";
        role="";
        console.log(role.length)
    }
    var i: number = 0;
    const name: string[] = [];
    const user: Array<PUser> = [];
    useEffect( ()=>{
        listUser();

    },[1]);
    const listUser = () => {
        var index = 0;
        UserService.getPublicContent()
            .then((response: any) =>{
                if (userName.length !== 0){
                    for(index;index<response.data.length;index++){
                        if (userName!==response.data[index].username){
                            user.push(response.data[index])
                            name.push(response.data[index].username);
                        }
                    }
                    setUsers(user)
                } else {
                    setUsers(response.data)
                    for(index;index<response.data.length;index++){
                            name.push(response.data[index].username);
                    }
                }

            })
            .catch((e: Error) => {
                console.log(e);
            });
    };
    if (users.length!==0){
        let n=0;
        for (let j=0;j<users.length;j++){
            for (n;n<=users.length*2;n++){
                if (n%2!==0){
                     name[n] = users[j].username as string;
                     j++;
                }
                else{
                    name[n] = "";
                }
            }
        }
    }
    function deleteUser(username: string ) {
        UserService.deleteUser(username)
            .then((response: any) =>{
                listUser();
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
    const { confirm } = Modal;
    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this User?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                i=0
                if(name[i++]!=null)
                    deleteUser(name[i++].toString())
                console.log('Delete ok');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };





    return (
        <div className="col-md-6">
            <h4 style={{textAlign:"center",fontSize:"20px"}}>Tutorials List</h4>
            <Table dataSource={users} pagination={{ pageSize: 3 }}>
                    <Column title="Name" dataIndex="username" key="username" />
                    <Column title="Email" dataIndex="email" key="email" />
                    <Column title="Phone" dataIndex="phone" key="phone"/>
                    <Column title="Role" dataIndex="roles" key="roles" />
                    <Column title="Departments" dataIndex="departments" key="departments" />
                    {  role.endsWith("ROLE_ADMIN") ?
                            <Column
                                title="Action"
                                key="action"
                                dataIndex="username"
                                render={() => (
                                    <div className="bnt-put-del">
                                        <Tooltip placement="top" title="Update">
                                            <button onClick={()=>{setEdit(true)}}>
                                                    <EditFilled />
                                            </button>
                                        </Tooltip>
                                        <Modal
                                            title="Edit User"
                                            centered={true}
                                            visible={edit}
                                            onCancel={() => setEdit(false)}
                                            footer={null}
                                        >
                                            <UpdateUser name={name[i++]}/>
                                        </Modal>
                                        {/*delete*/}
                                        <Tooltip placement="top" title="Delete">
                                            <button type="button" onClick={showDeleteConfirm}
                                                    className="nav-link-del">
                                                <CloseOutlined/>
                                            </button>
                                        </Tooltip>

                                    </div>
                                )}
                            /> :
                        role.endsWith("ROLE_MODERATOR") ?
                                        <Column
                                            title="Action"
                                            key="action"
                                            render={() => (

                                                <div className="bnt-put-del">
                                                    <Tooltip placement="top" title="Update">
                                                        <button onClick={()=>{setEdit(true)}}>
                                                            <EditFilled />
                                                        </button>
                                                    </Tooltip>
                                                    <Modal
                                                        title="Edit User"
                                                        centered={true}
                                                        visible={edit}
                                                        onCancel={() => setEdit(false)}
                                                        footer={null}
                                                    >
                                                        <UpdateUser name={name[i++]}/>
                                                    </Modal>
                                                </div>
                                            )}
                                        /> :
                                        <Column width={0}/>
                        }
                </Table>

        </div>
    );


}
export default ListUser;
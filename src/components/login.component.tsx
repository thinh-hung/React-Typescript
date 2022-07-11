import React, {ChangeEvent, useState} from "react";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import {useHistory} from "react-router";
import type { NotificationPlacement } from 'antd/lib/notification';
import {notification, message, Form, Input, Button} from "antd";

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
    let messages:string = "";
    const handleLogin=(placement: NotificationPlacement)=>{
        var data={
            username: login.username,
            password: login.password,
        };
        AuthService.login(data.username as string,data.password as string)
            .then(() => {

                message.success('Successful Login');
                history.push("/");
                window.location.reload();

            }, (error) => {
                const resMessage ="Username , Password are wrong"||
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
                messages = resMessage;
                    notification.info({
                        message: messages,
                        placement,
                    });
            });

    }

    return (
        // <div className="login-register">
        // <div className="login-form">
            <div >

                {/*<form>*/}
                <Form
                    name="login"
                    onFinish={()=>{handleLogin('top')}}

                >
                    <Form.Item
                        label="username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input name="username" onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item
                        label="password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password name="password" onChange={handleInputChange}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className="btn-log" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>


                </Form>
                {/*<form>*/}
                {/*    <table>*/}
                {/*        <tr className="login-tr">*/}
                {/*            <td>*/}
                {/*                <label htmlFor="username">Username</label>*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*                <input name="username" type="text" className="form-control" />*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*        <tr className="login-tr">*/}
                {/*            <td>*/}
                {/*                <label htmlFor="password">Password</label>*/}
                {/*            </td>*/}
                {/*            <td>*/}
                {/*                <input name="password" type="password" className="form-control" onChange={handleInputChange}/>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*        <tr className="login-tr">*/}
                {/*            <td colSpan={2} style={{textAlign:"center"}}>*/}
                {/*                <button type="button" className="btn btn-primary btn-block" onClick={()=>{handleLogin('top')}} >*/}
                {/*                    <span>Login</span>*/}
                {/*                </button>*/}
                {/*            </td>*/}
                {/*        </tr>*/}
                {/*    </table>*/}
                {/*</form>*/}

                {/*</form>*/}
            </div>
        // </div>
    );
}
export default Login;
import './App.css';
import 'antd/dist/antd.min.css';
import {Switch,Route,Link} from 'react-router-dom';
import { Avatar, Button, Dropdown, Layout, Menu, Modal} from 'antd';
import React, { useState} from 'react';
import Login from "./components/login.component";
import Register from "./components/register.component";
import PutUser from "./components/putUser";
import Profile from "./components/profile";
import RoleMod from "./components/role.mod";
import RoleAdmin from "./components/role.admin";
import Lognout from "./components/logout";
import ListUser from "./components/home.component";
import GetCalendar from "./components/calendar";

import {CalendarOutlined} from "@ant-design/icons";

const { Header, Content, Sider } = Layout;


const App: React.FC = () => {
    const [login, setLogin] = useState(false);
    const [sign, setSign] = useState(false);
    const [edit, setEdit] = useState(false);
    var role: string;
    var avatar: string;
    // var avatar: string;
    if (localStorage.length!==0){
        // @ts-ignore
        role = localStorage.getItem("role").substring(1,localStorage.getItem("role").length-1);

        // @ts-ignore
        avatar = localStorage.getItem("avatar").substring(1,localStorage.getItem("avatar").length-1)
        console.log(avatar)
    } else {
        role="";

        console.log(role.length)
    }
    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <Link to={"/user"}>
                            Personal page
                        </Link>
                    ),
                },
                {
                    key: '2',
                    label: (
                        <div>
                            <Link to={""}   onClick={()=>{setEdit(true)}} style={{color: "black"}}>
                                Edit Information
                            </Link>
                            <Modal
                                title="Edit Information"
                                centered={true}
                                visible={edit}
                                onCancel={() => setEdit(false)}
                                footer={null}
                            >
                                <PutUser/>
                            </Modal>
                        </div>


                    ),
                },
                {
                    key: '3',
                    label: (
                        <Link to={"/lognout"}>
                            Logn out
                        </Link>
                    ),
                },
            ]}
        />
    );



    return(
        <div className={'App'}>
            <Layout>
                <Header className="header" style={{padding: 0}}>
                    <div className="logo">
                        <h1 >Zero</h1>
                    </div>
                    <div className="menu-mor">
                        {role.length === 0 ?
                            <div>
                                {/*<Link to={"/login"} className="nav-link">*/}
                                {/*    Login*/}
                                {/*</Link>*/}
                                <Button type="primary" onClick={()=>{setLogin(true)}}  className="nav-link" style={{borderColor: "white"}}>
                                    Login
                                </Button>
                                <Modal
                                    title="Login"
                                    centered={true}
                                    visible={login}
                                    onCancel={() => setLogin(false)}

                                    footer={null}
                                >
                                   <Login/>
                                </Modal>
                                <Button type="primary" onClick={()=>{setSign(true)}}  className="nav-link-reg" style={{borderColor: "white"}}>
                                    Sign Up
                                </Button>
                                <Modal
                                    title="Sign Up"
                                    centered={true}
                                    visible={sign}
                                    onCancel={() => setSign(false)}
                                    footer={null}
                                >
                                    <Register/>
                                </Modal>

                                {/*<Link to={"/register"} className="nav-link-reg">*/}
                                {/*    Sign Up*/}
                                {/*</Link>*/}
                            </div> :
                            <Dropdown overlay={menu} placement="bottomRight" className="menu-mor" arrow={{ pointAtCenter: true }}>
                                <Button style={{marginTop: "10px",backgroundColor: "black",borderColor: "black"}}>
                                    {/*{avatar.length!=0 ?*/}
                                    {/*    <Avatar src={avatar} /> :*/}
                                    {/*    */}
                                    {/*    /!*<MoreOutlined />*!/*/}
                                    {/*}*/}
                                    {// @ts-ignore
                                        <Avatar src={avatar}  size={40} />

                                    }
                                </Button>
                            </Dropdown>

                        }

                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Link to={"/list"} className={"list-user"}>
                            List user
                        </Link>
                        <Link to={"/calendar"} className={"list-user"}>
                            <CalendarOutlined />Calendar
                        </Link>
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                        {/*    <Breadcrumb.Item href="/login">Home</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>List</Breadcrumb.Item>*/}
                        {/*    <Breadcrumb.Item>App</Breadcrumb.Item>*/}
                        {/*</Breadcrumb>*/}
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight:  832,
                            }}
                        >
                            <Switch>
                                <Route path="/user" component={Profile} />
                                <Route exact path={["/list"]} component={ListUser} />
                                <Route path="/mod" component={RoleMod} />
                                <Route path="/admin" component={RoleAdmin} />
                                <Route path="/calendar" component={GetCalendar} />
                            </Switch>

                        </Content>
                    </Layout>
                </Layout>



                <Switch>

                    <Route exact path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    {/*<Route exact path={"/update/:name"}component={UpdateUser}/>*/}
                    <Route exact path="/putUser" component={PutUser} />
                    <Route path="/lognout" component={Lognout}/>
                </Switch>

            </Layout>
            <footer className="rc-footer">
                <div className="rc-footer-bottom-container">
                    Made with
                    <span style={{color: "red"}}>❤</span>
                    by
                    <Link to="/">Zero</Link>
                </div>
            </footer>
        </div>
    );
}
export default App;

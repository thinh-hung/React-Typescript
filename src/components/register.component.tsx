import React, {ChangeEvent, useState} from "react";
import IUser from "../types/user.type";
import AuthService from "../services/auth.service";
import {useHistory} from "react-router";
import urlSave from "../../src/img/meo.png";
import { message, Upload, UploadProps} from "antd";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback("./"+img.name));
    reader.readAsDataURL(img);
    console.log(reader)
};

const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};


const Register: React.FC =()=>{
  const initialUser={
    username:"",
    email:"",
    password: "",
    roles:"",
    departments:"",
    avatar: "",
  }
  const history = useHistory();
  const [user, setUser] = useState<IUser>(initialUser);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({...user, [name]: value });
  };

  const saveUser = () => {
    var data = {
      username: user.username,
      email:user.email,
      password: user.password,
      roles:user.roles,
      departments:user.departments,
      avatar: imageUrl,
        phone: user.phone,
        address: user.address,
    };
    console.log(imageUrl)
    AuthService.register(data.username as string,data.email as string,data.password  as string,data.roles  as string,data.departments  as string,data.avatar as string,data.phone as string,data.address as string)
        .then(() =>{
                console.log(data.avatar)
                history.push("/");
                window.location.reload();
                alert("Sign Up Success");
            },
            (error)=>{
              const resMessage =
                  (error.response &&
                      error.response.data &&
                      error.response.data.message) ||
                  error.message||
                  error.toString();
              alert(resMessage)

            })

  };




    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {

                setLoading(false);
                setImageUrl(url);

            });
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );



    return (

      // <div className="login-register">
      // <div className="login-form">
      //
      //         {/*<h1 style={{textAlign: "center"}}>*/}
      //         {/*    Sign Up*/}
      //         {/*    <Link to={"/"} className="nav-link-home">*/}
      //         {/*        X*/}
      //         {/*    </Link>*/}
      //         {/*</h1>*/}
              <table>
                  <tr className="login-tr">
                      <td>
                          <label htmlFor="username"> Username </label>
                      </td>
                      <td>
                          <input
                              name="username"
                              type="text"
                              className="form-control"
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
                              className="form-control"
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
                              className="form-control"
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
                              className="form-control"
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
                              className="form-control"
                              type="password"
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
                              className="form-control"
                              type="text"
                              onChange={handleInputChange}
                          />
                      </td>
                  </tr>
                  <tr className="login-tr">
                      <td>
                          <label htmlFor="`departments`"> Department </label>
                      </td>
                      <td>
                          <input
                              name="departments"
                              className="form-control"
                              type="text"
                              onChange={handleInputChange}
                          />
                      </td>
                  </tr>
                  <tr className="login-tr">
                      <td>
                          <label htmlFor="`avatar`"> Avatar </label>
                      </td>
                      <td>
                          {/*<input*/}
                          {/*    name="avatar"*/}
                          {/*    type="file"*/}
                          {/*    className="form-control"*/}

                          {/*    // value={"C:\\Users\\lhthinh\\testReact\\untitled4\\public"}*/}
                          {/*    onChange={handleInputChange}*/}
                          {/*/>*/}
                          <Upload
                              name="avatar"
                              listType="picture-card"
                              className="avatar-uploader"
                              showUploadList={false}
                              action={urlSave}
                              beforeUpload={beforeUpload}
                              onChange={handleChange}
                          >
                              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                          </Upload>

                      </td>
                  </tr>
                  <tr>
                      <td colSpan={2} style={{textAlign:"center"}}>
                          <button  onClick={saveUser} className="btn btn-success">
                              Sign up
                          </button>
                      </td>
                  </tr>

              </table>

      // </div>
  );
}
export default Register

import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/"

class AuthService {
    login(username: string,password: string){
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                console.log(response.status)
                if (response.status === 200){
                    localStorage.setItem("token",JSON.stringify(response.data.token))
                    localStorage.setItem("userName",JSON.stringify(response.data.userName))
                    localStorage.setItem("role",JSON.stringify(response.data.role))
                    localStorage.setItem("avatar",JSON.stringify(response.data.avatar))

                }
                    return response.data;
            })
    }
    register(username: string,email: string,password: string,role: string,departments: string,avatar: string,phone: string,address:string){
        return axios.post(API_URL+"signup", {
            username,
            email,
            password,
            role,
            departments,
            avatar,
            phone,
            address
        })
    }
    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }

}
export default new AuthService();


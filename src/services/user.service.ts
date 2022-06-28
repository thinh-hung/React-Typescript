import axios from "axios";
import PUser from "../types/userprepo";
import IPut from "../types/putUser";

const API_URL = "http://localhost:8080/api/user/"

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUser(username: string){
        // @ts-ignore
        let token: string = localStorage.getItem("token").substring(1,localStorage.getItem("token").length-1)
        return axios.get( API_URL+username,{headers:{'Authorization': 'Bearer '+token}});
    }
    getPUser(username: string){
        // @ts-ignore
        let token: string = localStorage.getItem("token").substring(1,localStorage.getItem("token").length-1)

        return axios.get( API_URL+"individual/"+username,{headers:{'Authorization': 'Bearer '+token}});
    }
    updateUser(name: string,user: PUser){
        // @ts-ignore
        let token: string = localStorage.getItem("token").substring(1,localStorage.getItem("token").length-1)
        return axios.put(API_URL+name,user,{headers:{'Authorization': 'Bearer '+token}});
    }
    putUser(name: string,user: IPut){
        // @ts-ignore
        let token: string = localStorage.getItem("token").substring(1,localStorage.getItem("token").length-1)
        return axios.put(API_URL+"individual/"+name,user,{headers:{'Authorization': 'Bearer '+token}});
    }
    deleteUser(username: string){
        // @ts-ignore
        let token: string = localStorage.getItem("token").substring(1,localStorage.getItem("token").length-1)
        return axios.delete(API_URL+username,{headers:{'Authorization': 'Bearer '+token}});
    }

}
export default new UserService();


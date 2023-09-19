import axios from "axios";

export default class AuthService {
    static async auth(username, password) {
        return await axios.post('http://194.67.112.88:16666/auth/', {
            username: username,
            password: password
        }, {
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response
        })
    }
    static async registr(username, password){
        return await axios.post('http://194.67.112.88:16666/register/', {
            username: username,
            password: password
        }, {
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response
        })
    }
//ima 12Kristina21
}
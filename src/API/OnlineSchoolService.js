import axios from "axios";

export default class OnlineSchoolService{
    static async getAll({page=0, size=20}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/school?page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getById({schoolId}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/school/${schoolId}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
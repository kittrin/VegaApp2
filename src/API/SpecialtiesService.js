import axios from "axios";

export default class SpecialtiesService {
    static async getAll({page = 0, size = 20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/higher/universitySpeciality?page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getById({specId}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/higher/universitySpeciality/${specId}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
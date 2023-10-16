import axios from "axios";

export default class RegionService{
    static async getAll({page=0, size=20}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/region?page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
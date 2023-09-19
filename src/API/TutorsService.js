import axios from "axios";

export default class TutorsService {
    static async getOnlineAll({disciplineId, page=0, size=20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/tutor/search/online?disciplineId=${disciplineId}&page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getOfflineAll({disctrictId, disciplineId, page=0, size=20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/tutor/search/offline?districtId=${disctrictId}&disciplineId=${disciplineId}&page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getById({tutor_id}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/tutor/${tutor_id}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
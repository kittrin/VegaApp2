import axios from "axios";

export default class LearningService{
    static async getTutotOnline({disciplinedId, page=0, size=20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/tutor/search/online?disciplineId=${disciplinedId}&page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getTutorOffline({disciplinedId, districtId, page=0, size=20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/tutor/search/offline?districtId=${districtId}&disciplineId=${disciplinedId}&page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getById({tutorId}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/tutor/${tutorId}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
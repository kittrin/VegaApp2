import axios from "axios";

export default class FaqService{
    static async getAll({page=0, size=20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/question?page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getById({questionId}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/question/${questionId}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}

import axios from "axios";

export default class SubjectsService {
    static async getAll(filterDiscipline='HIGH') {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/discipline?filter=${filterDiscipline}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
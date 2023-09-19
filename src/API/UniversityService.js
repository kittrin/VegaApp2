import axios from "axios";

export default class UniversitiesService {
    static async getAll(grade, sort = 'title', typeSort = 'ASC', page, size) {
        //grade HIGH MIDDLE
        //sort priority/title ASK/DESK

        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/university?gradeFilter=${grade}&page=${page}&size=${size}&sort=${sort}%2C${typeSort}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            console.log()
            return response.data
        })
    }

    static async getById(id) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/university/${id}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }

    static async getDateOpenDoors(id) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/university/${id}/openDoorsDays`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }

    static async getMiddleSpecialities(id) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/university/${id}/middleSpecialities`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }

    static async getHighSpecialties({universityId, page=0, size = 20}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/university/${universityId}/highSpecialities?page=${page}&size=${size}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
     static async getHighSpecialtiesById({specialtiesId}) {
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/higher/universitySpeciality/${specialtiesId}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response)=>{
            return response.data
        })
     }

    static async getDetailUniverse(id){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/university/${id}/details`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }

    static async getByTown(town_id, gradeFilter='HIGH', page=0, size=20){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/town/${town_id}/university?gradeFilter=${gradeFilter}&page=${page}&size=${size}&sort=title%2CASC`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
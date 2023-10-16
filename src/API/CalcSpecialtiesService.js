import axios from "axios";

export default class CalcSpecialtiesService {
    static async getDisciplineSet({arrDiscipline=[]}) {
        let urlDisc = "http://194.67.112.88:16666/higher/disciplinesSet?"
        arrDiscipline.map((el, ind)=>{
            urlDisc = urlDisc + `discipline=${el}`
            if(ind!==(arrDiscipline.length-1)){
                urlDisc = urlDisc + '&'
            }
        })
        return await axios({
            method: 'get',
            url: urlDisc,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
    static async getSpecialties({disciplineSetId, scoreFilter, page=0, size=20, includeBudget = true, includeContract=true, regionFilter}){
        return await axios({
            method: 'get',
            url: `http://194.67.112.88:16666/higher/disciplinesSet/${disciplineSetId}/specialities?scoreFilter=${scoreFilter}&page=${page}&size=${size}&includeBudget=${includeBudget}&includeContract=${includeContract}&regionFilter=${regionFilter}`,
            headers: {
                'Authorization': 'testdatabase'
            }
        }).then((response) => {
            return response.data
        })
    }
}
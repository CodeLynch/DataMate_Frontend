import axios from "axios";


const API_URL = 'http://localhost:8080'
class DatabaseService{
    async postDatabase(dbName:string, userid:number){
        return axios.post(`${API_URL}/postDB`,{
            "databaseName": dbName,
            "user":{
                "userId": userid,
            }
        }).then((res)=>{
            if (res.data) {
                return res.data;
            }
        }).catch((err)=>{
            console.log(err);
        });
    }

    async getDBByNameAndUser(name: string,userid: number){
        return axios.get(`${API_URL}/getUserDBs?dbName=${name}&userId=${userid}`)
        .then((res)=>{
            if (res.data) {
                return res.data;
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    async getDBByUser(userid: number){
        return axios.get(`${API_URL}/getUserDBs?userId=${userid}`)
        .then((res)=>{
            if (res.data) {
                return res.data;
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
}
export default new DatabaseService();
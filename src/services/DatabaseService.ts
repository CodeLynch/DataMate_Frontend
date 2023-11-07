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

    async getDBsByUser(userid: number){
<<<<<<< HEAD
        return axios.get(`${API_URL}/getUserDBs?userId=${userid}`)
=======
        return axios.get(`${API_URL}/getUserDBs/${userid}`)
>>>>>>> 22d3a7f2b75f27d5d359755c8da4f74f83901382
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
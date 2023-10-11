import axios from "axios";

const API_URL = 'http://localhost:8080'

class TableService{
    async postTable(tblName:string, dbid:number, userid:number, cols:string[]){
        return axios.post(`${API_URL}/postTable`,{
            "tableName": tblName,
            "database":{
                "databaseId": dbid,
            },
            "user":{
                "userId": userid,
            },
            "columns":cols,
        }).then((res)=>{
            return res.data;
        }).catch((err)=>{
            console.log(err);
        });
    }

    async getTblByDB(dbid: number){
        return axios.get(`${API_URL}/getTableByDB?dbId=${dbid}`)
        .then((res)=>{
            return res.data
        }).catch((err)=>{
            console.log(err);
        })
    }

    async getTblByName(tblName: string){
        return axios.get(`${API_URL}/getTableByName?tblName=${tblName}`)
        .then((res)=>{
            return res.data
        }).catch((err)=>{
            console.log(err);
        })
    }

    async getTblData(tblName: string){
        return axios.get(`${API_URL}/getTableData?tblName=${tblName}`)
        .then((res)=>{
            return res.data
        }).catch((err)=>{
            console.log(err);
        })
    }
}
export default new TableService();
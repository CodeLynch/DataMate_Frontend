import axios from "axios";

class FileService {
    

    //upload by user
    async uploadFile(file: File, userId: string) {
        let fd = new FormData();
        fd.append('file', file);
        fd.append('userId', userId.toString());
      
        return axios.post("https://datamate-api.onrender.com/upload", fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {
          if (res.data) {
            return res.data;
          }
        }).catch(err => {
          console.log(err);
        });
      }
      

    async putFile(fileid:number, file:File, filename:string){
        let fd = new FormData();
        fd.append('file',file, filename)
        return axios.put(`https://datamate-api.onrender.com/updateFile/${fileid}`, fd,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res)=>{
            if (res.data) {
                return res.data;
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    async getFile(fileid:number) {
        return axios.get(`https://datamate-api.onrender.com/file?id=${fileid}`
        ).then((res) => {
            if (res.data) {
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    async getFiles() {
        return axios.get('https://datamate-api.onrender.com:8080/files'
        ).then((res) => {
            console.log("All Files:", res.data);
            if (res.data) {
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    async downloadFile(fileid:number){
        return axios.get("https://datamate-api.onrender.com/downloadFile/" + fileid
        ).then((res)=>{
            if(res.data){
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    async deleteFile(fileId:number){
        return axios.delete("https://datamate-api.onrender.com/deleteFile/" + fileId
        ).then((res) => {
            console.log(res.data);
            if (res.data) {
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        });
    }
 

    // async deletePost(postId:number){
    //     return axios.delete("http://localhost:8080/post/deletePost/"+postId
    //     ).then((res) => {
    //         console.log(res.data);
    //         if (res.data) {
    //             return res.data;
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }
}
export default new FileService();
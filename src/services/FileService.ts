import axios from "axios";

class FileService {
    

    //upload by user
    async uploadFile(file: File, userId: string) {
        let fd = new FormData();
        fd.append('file', file);
        fd.append('userId', userId.toString());
      
        return axios.post("http://localhost:8080/upload", fd, {
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
        return axios.put(`http://localhost:8080/updateFile/${fileid}`, fd,{
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
        return axios.get(`http://localhost:8080/file?id=${fileid}`
        ).then((res) => {
            if (res.data) {
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    async getFiles() {
        return axios.get('http://localhost:8080/files'
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
        return axios.get("http://localhost:8080/downloadFile/" + fileid
        ).then((res)=>{
            if(res.data){
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    async deleteFile(fileId:number){
        return axios.delete("http://localhost:8080/deleteFile/" + fileId
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
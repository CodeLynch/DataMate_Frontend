import axios from "axios";

class FileService {

    async uploadFile(file: File) {
        let fd = new FormData();
        fd.append('file',file)
        return axios.post("http://localhost:8080/upload", fd ,{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log("uploaded file:", res.data);
            if (res.data) {
                return res.data;
            }
        }).catch(err => {
            console.log(err);
        });
    }

    async getFiles() {
        return axios.get('localhost:8080/files'
        ).then((res) => {
            console.log("All Files:", res.data);
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
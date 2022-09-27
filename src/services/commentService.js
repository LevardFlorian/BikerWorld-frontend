import axios from "axios";

const endpoint = "/wp/v2/comments"

export default {
    getComments(postId) {
        return axios.get(process.env.API_BASE_URL  + endpoint + '?post=' + postId +'&order=asc');
    },
    
    postComment(postId,commentContent) {
        return axios.post(
            process.env.API_BASE_URL + endpoint,
            {content: commentContent, post: postId},
            {                
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }
        );
    }
}

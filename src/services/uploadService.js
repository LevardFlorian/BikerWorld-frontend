
import axios from "axios";

const endpoint = '/wp/v2/media';

export default {

    add(formData) {
        
        return axios.post(
            process.env.API_BASE_URL + endpoint,
            formData,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },
    getSingleMedia(eventId) {

        return axios.get(process.env.API_BASE_URL + endpoint + '?parent=' + eventId, 
        );
    },

    deleteMedia(pictureId) {
        return axios.delete(
            process.env.API_BASE_URL + endpoint + '/' + pictureId + '?force=true',
            
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },
}
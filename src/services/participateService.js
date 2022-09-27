import axios from "axios";

export default {

    getParticipate (data) {
        return axios.post(
            process.env.API_BASE_URL + '/' + 'bikerworld/v1/user-participate',
            data,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },

    updateParticipate (update) {
        return axios.post(
            process.env.API_BASE_URL + '/' + 'bikerworld/v2/add-participate',
            update,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },

    countRegistration (postId) {
        return axios.post(
            process.env.API_BASE_URL + '/' + 'bikerworld/v2/count-registration', postId);
    }

}
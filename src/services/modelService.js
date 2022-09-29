import axios from "axios";

const endpoint = '/wp/v2/models';

const modelsPerPage = '3';

export default { 

    getAllModels(page, selectedBrandList) {
        // console.log(selectedModelTypeList)
        let queryString =  '?page=' + page;
      if (selectedBrandList.length != 0) {
          // join() permet de rassembler les éléments d'un array dans une seule chaîne de caractère avec le séparateur fourni en argument
          const modelTypeTerms = selectedBrandList;
        //   console.log(modelTypeTerms)
          queryString += '&brand=' + modelTypeTerms;
      }
        // axios.get() retourne une Promise => on attend que cette méthode réponde, puis on déclenche then() en cas de succès, et catch() en cas d'erreur.
        // on return directement cette promesse
        return axios.get(process.env.API_BASE_URL + endpoint + queryString);

    },

    getModels() {
        
        return axios.get(process.env.API_BASE_URL + endpoint + '?per_page=' + modelsPerPage);

    },

    
    getSingleModel(modelId) {

        return axios.get(process.env.API_BASE_URL + endpoint + '/' + modelId + '?_embed');
    },

    postModel(modelData) {
        return axios.post(
            process.env.API_BASE_URL + '/' + 'bikerworld/v2/create-model',
            modelData,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },
    
    deleteModel(modelId) {
        return axios.delete(
            process.env.API_BASE_URL + endpoint + '/' + modelId,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    }

}
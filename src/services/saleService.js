import axios from "axios";

const endpoint = '/wp/v2/sales';

const salesPerPage = '3';

export default { 

    getAllSales(page, selectedBrandList) {
        // console.log(selectedSaleTypeList)
        let queryString =  '?page=' + page;
      if (selectedBrandList.length != 0) {
          // join() permet de rassembler les éléments d'un array dans une seule chaîne de caractère avec le séparateur fourni en argument
          const saleTypeTerms = selectedBrandList;
        //   console.log(saleTypeTerms)
          queryString += '&brand=' + saleTypeTerms;
      }
        // axios.get() retourne une Promise => on attend que cette méthode réponde, puis on déclenche then() en cas de succès, et catch() en cas d'erreur.
        // on return directement cette promesse
        return axios.get(process.env.API_BASE_URL + endpoint + queryString);

    },

    getSales() {
        
        return axios.get(process.env.API_BASE_URL + endpoint + '?per_page=' + salesPerPage);

    },

    
    getSingleSale(saleId) {

        return axios.get(process.env.API_BASE_URL + endpoint + '/' + saleId + '?_embed');
    },

    postSale(saleData) {
        return axios.post(
            process.env.API_BASE_URL + '/' + 'bikerworld/v2/create-sale',
            saleData,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },
    
    deleteSale(saleId) {
        return axios.delete(
            process.env.API_BASE_URL + endpoint + '/' + saleId,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    }

}
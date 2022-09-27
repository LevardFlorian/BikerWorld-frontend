
import axios from "axios";

// import { baseUrl } from "./apiClientService";
// require ('dotenv').config();
// const baseUrl = 'http://localhost/O-coin-du-feu/projet-coin-du-feu-back/wp-json';
const endpoint = '/wp/v2/events';

const eventsPerPage = '3';

export default { 

    getAllEvents(page, selectedEventTypeList, selectedCity) {
        // console.log(selectedEventTypeList)
        let queryString =  '?page=' + page;
      // gestion du filtre recipeType :
      // nomdelataxo[terms]=iddeterms
      // nomdelataxo[operator]=RELATION (OR ou AND, exlusif ou non)
      // on veut ajouter des paramètres dans l'URL : ?recipe_type[terms]=18,17&recipe_type[operator]=AND
      // on ne veut appliquer ces filtres que dans le cas où on a sélectionné des types de recettes dans le select multiple.
      if (selectedEventTypeList.length != 0) {
          // join() permet de rassembler les éléments d'un array dans une seule chaîne de caractère avec le séparateur fourni en argument
          const eventTypeTerms = selectedEventTypeList;
        //   console.log(eventTypeTerms)
          queryString += '&eventType=' + eventTypeTerms;
      }
      if (selectedCity.length != 0) {
        // join() permet de rassembler les éléments d'un array dans une seule chaîne de caractère avec le séparateur fourni en argument
        const cityTerms = selectedCity;
        // console.log(cityTerms)
        queryString += '&city=' + cityTerms;
    }

        // axios.get() retourne une Promise => on attend que cette méthode réponde, puis on déclenche then() en cas de succès, et catch() en cas d'erreur.
        // on return directement cette promesse
        return axios.get(process.env.API_BASE_URL + endpoint + queryString);

    },

    getEvents() {
        
        return axios.get(process.env.API_BASE_URL + endpoint + '?per_page=' + eventsPerPage);

    },

    
    getSingleEvent(eventId) {

        return axios.get(process.env.API_BASE_URL + endpoint + '/' + eventId + '?_embed');
    },

    postEvent(eventData) {
        return axios.post(
            process.env.API_BASE_URL + '/' + 'bikerworld/v2/create-event',
            eventData,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    },
    
    deleteEvent(eventId) {
        return axios.delete(
            process.env.API_BASE_URL + endpoint + '/' + eventId,
            {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}}
        );
    }

}
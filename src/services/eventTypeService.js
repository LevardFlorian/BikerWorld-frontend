// on importe les dépendances nécessaires
import axios from 'axios';

const endpoint = '/wp/v2/eventType';

// on fait en sorte  de pouvoir "import" cet objet depuis un autre fichier JS
export default {
    // on récupère tous les types de recettes
    getAllEventTypes() {
        const responsePromise = axios.get(process.env.API_BASE_URL + endpoint);
        // on renvoie le résultat de l'appel axios, comme ça on gère la Promise retournée par axios directement à l'endroit où on a fait appel à getAllIngredients()
        return responsePromise;
    },
}
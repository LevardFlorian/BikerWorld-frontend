// on importe les dépendances nécessaires
import axios from 'axios';

const endpoint = '/wp/v2/brand';

// on fait en sorte  de pouvoir "import" cet objet depuis un autre fichier JS
export default {
    // on récupère tous les types de recettes
    getAllBrands() {
        const responsePromise = axios.get(process.env.API_BASE_URL + endpoint + '?per_page=50');
        // on renvoie le résultat de l'appel axios, comme ça on gère la Promise retournée par axios directement à l'endroit où on a fait appel à getAllIngredients()
        return responsePromise;
    },
}
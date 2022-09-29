// on importe les dépendances nécessaires
import axios from 'axios';

// on fait en sorte  de pouvoir "import" cet objet depuis un autre fichier JS
export default {
    // on récupère tous les types de recettes
    getAllCities(event) {
        const responsePromise = axios.get(`https://geo.api.gouv.fr/communes?nom=${event}&fields=nom,code,codesPostaux,codeDepartement,codeRegion,population&format=json&geometry=centre`)
        // .then(response => response.json())
        // .then(data => data);

        // console.log(responsePromise);
        // on renvoie le résultat de l'appel axios, comme ça on gère la Promise retournée par axios directement à l'endroit où on a fait appel à getAllIngredients()
        return responsePromise;
    },
}
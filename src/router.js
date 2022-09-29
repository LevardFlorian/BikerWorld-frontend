// on gère la partie routing

// on importe les fonctions de vue router depuis la dépendance vue-router
import { createRouter, createWebHistory } from 'vue-router';

// on récupère les composants à utiliser avec notre router
import HomeView from "./views/general/HomeView.vue";
import LoginView from "./views/form/LoginView.vue";
import RegisterView from "./views/form/RegisterView.vue";
import ContactView from "./views/form/ContactView.vue";
import ContactOccasionView from "./views/form/ContactOccasionView.vue";
import LegalInformationView from "./views/general/LegalInformationView.vue";
import NotFoundView from "./views/general/NotFoundView.vue";
import PostCreateView from "./views/posts/PostCreateView.vue";
import UpdateEventView from "./views/posts/UpdateEventView.vue";
import PostsListView from "./views/posts/PostsListView.vue";
import PostSingleView from "./views/posts/PostSingleView.vue";
import SalesListView from "./views/sales/SalesListView.vue";
import SaleSingleView from "./views/sales/SaleSingleView.vue";
import SaleCreateView from "./views/sales/SaleCreateView.vue";
import SaleUpdateView from "./views/sales/SaleUpdateView.vue";
import ModelsListView from "./views/models/ModelsListView.vue";
import ModelSingleView from "./views/models/ModelSingleView.vue";

// on définit des routes. C'est un array qui contient des objets sours la forme {path, component} (on ne choisit pes les noms de propriétés)
// chaque objet est une correspondance entre un chemin et un composant
const routes = [
    { path: '/', component: HomeView, name: "homepage"},
    { path: '/connexion', component: LoginView, name: "loginpage"},
    { path: '/inscription', component: RegisterView, name: "registerform"},
    { path: '/contact', component: ContactView, name: "contactpage"},
    { path: '/mentions-legales', component: LegalInformationView, name: "legalInformation"},
    { path: "/:beforeEnter(.*)", component: NotFoundView, name: "NotFound"},
    { path: '/evenement-form', component: PostCreateView, name: "create-event"},
    { path: '/evenement/maj/:eventId', component: UpdateEventView, name: "update-event"},
    { path: '/evenements', component: PostsListView, name: "postspage"},
    { path: '/occasions', component: SalesListView, name: "salespage"},
    { path: '/modeles', component: ModelsListView, name: "modelspage"},
    { path: '/evenement/:eventId', component: PostSingleView, name: "postpage"},
    { path: '/occasion/:saleId', component: SaleSingleView, name: "salepage"},
    { path: '/occasion/maj/:saleId', component: SaleUpdateView, name: "update-sale"},
    { path: '/modele/:modelId', component: ModelSingleView, name: "modelpage"},
    { path: '/contact-occasion', component: ContactOccasionView, name: "contact-occasion"},
    { path: '/occasion-form', component: SaleCreateView, name: "create-sale"},
]

// on instancie VueRouter avec la fonction createRouter
const router = createRouter({
    // on utilise le mode d'historique "HTML5" => urls classiques ex. /register
    history: createWebHistory(process.env.APP_URL),
    routes, // short for `routes: routes`
});

// on exporte l'instance de VueRouter créée
export default router;
<template>
  <div class="publish">
    <h3 class="publish__title">Liste des évènements publiés</h3>
    <RouterLink to="/evenement-form"
      v-if="isUserLoggedIn"><button>Créer votre événements</button></RouterLink
    >
    <div class="excerptList">
      <div class="autocomplete field">
        <label class="field__label" for="event-type-select"
          >Type d'évènements</label
        >
        <select
          id="event-type-select"
          @change="onEventTypeFilterChange()"
          v-model="selectedEventTypeList"
          class="field__input"
        >
          <option value="" class="field__input" selected>
            Séléctionner un type d'évènement
          </option>
          <option
            v-for="eventType in eventTypeList"
            :key="eventType.id"
            :value="eventType.id"
            class="field__input"
          >
            {{ eventType.name }}
          </option>
        </select>
      </div>
      <div class="autocomplete field">
        <label class="field__label">A quel endroit ?</label>
        <input
          class="field__input"
          v-model="search"
          @input="onChange($event)"
          type="text"
          placeholder="Entrer le nom d'une ville"
        />
        <ul v-show="isOpen" class="autocomplete-results">
          <li
            v-for="(result, i) in results"
            :key="i"
            @click="setResult(result.nom)"
            class="autocomplete-result"
          >
            {{ result.nom }}
          </li>
        </ul>
      </div>

      <div class="publish__items">
        <HomePost
          @click="onEventClick(currentEvent.id)"
          v-for="currentEvent in eventList"
          :key="currentEvent.id"
          :eventData="currentEvent"
        >
        </HomePost>
      </div>
      <div v-if="errorMessages">{{ errorMessages }}</div>
    </div>
    <RouterLink to="/evenement-form"
      v-if="isUserLoggedIn"><button>Créer votre événements</button></RouterLink
    >
    <div class="event-list__pagination">
      <a
        @click="loadEvents(pageNumber)"
        v-for="pageNumber in pagesCount"
        :key="pageNumber"
        :class="{ active: pageNumber === currentPage }"
      >
        {{ pageNumber }}
      </a>
    </div>
  </div>
</template>
<script>
import HomePost from "./HomePost.vue";
import eventService from "../../services/eventService.js";
import userService from "../../services/userService.js";
import eventTypeService from "../../services/eventTypeService.js";
import cityService from "../../services/cityService.js";
import HomePost from "./HomePost.vue";

export default {
  props: [
    "isUserConnected"
    ],
  data() {
    return {
      eventList: [],
      selectedEventTypeList: "",
      selectedCityList: [],
      eventTypeList: [],
      cityList: [],
      pagesCount: 1,
      currentPage: 1,
      isOpen: false,
      search: "",
      results: [],
    };
  },

  components: {
    HomePost,
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserConnected;
    },
  },

  methods: {
    loadEvents(page) {
      this.currentPage = page;
      eventService
        .getAllEvents(page, this.selectedEventTypeList, this.search)
        .then((response) => {
          console.log(response.status);
          if(response > [""]){
          this.eventList = response.data;
          this.pagesCount = parseInt(response.headers["x-wp-totalpages"]);
          }
          if(response[""]){
          this.errorMessages = "Aucun évènement n'est prévu dans votre ville!";
          }
        })
        .catch((error) => {
          console.log(error);
          
        });
    },
    loadEventTypes() {
      // getAlleventTypes() renvoie une promesse
      eventTypeService
        .getAllEventTypes()
        .then((response) => {
          this.eventTypeList = response.data;
          // console.log(eventTypeList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onEventTypeFilterChange() {
      // on relance la récupération des données
      this.loadEvents(1);
    },
    onEventClick(eventId) {
      this.$router.push({
        name: "postpage",
        params: {
          eventId: eventId,
        },
      });
    },
    onChange(event) {
      const inputValue = event.target.value.toLowerCase();
      // console.log(inputValue)
      // await fetch(`https://geo.api.gouv.fr/communes?nom=${event.target.value}`)
      // axios.get("https://geo.api.gouv.fr/communes?nom=" + event.target.value)
      if (inputValue.length >= 2) {
        cityService.getAllCities(inputValue).then((response) => {
          this.results = response.data.slice(0, 9);
        });
      }

      // .then(data =>  this.results = data);
      this.results.length === 0 ? (this.isOpen = false) : (this.isOpen = true);
    },
    setResult(result) {
      this.search = result;
      this.isOpen = false;
      this.loadEvents(1);
      // this.isOpen = false;
    },
  },

  mounted() {
    this.loadEvents(1);
    this.loadEventTypes();
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/mixins";
@import "../../assets/scss/colors";

.publish__items {
  @include breakpoint("medium") {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
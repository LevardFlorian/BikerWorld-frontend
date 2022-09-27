<template>
  <div class="publish">
    <h2 class="publish__title">Les derniers évènements publiés!</h2>
    <div class="publish__items">
      <HomePost
        @click="onEventClick(currentEvent.id)"
        v-for="currentEvent in eventList"
        :key="currentEvent.id"
        :eventData="currentEvent"
      >
      </HomePost>
    </div>
    <RouterLink to="/evenements"
      ><button>Voir tout les événements</button></RouterLink
    >
  </div>
</template>

<script>
import HomePost from "./HomePost.vue";
import eventService from "../../services/eventService.js";
import uploadService from "../../services/uploadService";

export default {
  data() {
    return {
      eventList: [],
    };
  },

  components: {
    HomePost,
  },

  methods: {
    loadEvents() {
      eventService
        .getEvents()
        .then((response) => {
          this.eventList = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    onEventClick(eventId) {
      this.$router.push({
        name: "postpage",
        params: {
          eventId: eventId,
        },
      });
    },
  },

  mounted() {
    this.loadEvents();
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
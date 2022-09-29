<template>
  <div class="event-container">
    <div class="event-container__top">
      <h2
        class="event-container__top--title"
        v-html="eventData.title.rendered"
      ></h2>
      <div class="event-container__top--full" v-if="eventFull">
        Evénement complet
      </div>
      <div class="event-container__top--ref">
        <p>{{ eventData.author }}</p>
      </div>
    </div>
    <div class="event-container__image">
      <img :src="eventMedia" alt="" />
      <div class="event-container__image--button">
        <div>
          <button v-if="userParticipate" @click="onButtonParticipate()">
            Ne plus participer
          </button>
          <button
            v-if="!userParticipate && !eventFull && isUserLoggedIn"
            @click="onButtonParticipate()"
          >
            Je participe
          </button>
        </div>
        <div v-if="isAuthor" class="event-container__image--button">
          <button @click="onButtonUpdateClick(this.$route.params.eventId)">
            Mettre à jour
          </button>
          <button @click="onButtonDelete(this.$route.params.eventId)">
            Supprimer l'événement
          </button>
        </div>
      </div>
    </div>

    <div class="eventDescription">
      <time class="eventDescription__date">le {{ eventData.date }}</time>
      <p class="eventDescription__place">
        On se donne rendez-vous à {{ eventData.city }}
      </p>
      <p class="eventDescription__participation">
        Max : {{ eventData.number_participant }} personnes / reste
        {{ placeLeft }} places
      </p>
      <h4 class="eventDescription__author">Mot de {{ eventData.author }} :</h4>
      <p
        v-html="eventData.content.rendered"
        class="eventDescription__content"
      ></p>
    </div>
    <section v-if="isUserLoggedIn" class="comment">
      <div class="comment__items" v-if="hasComment">
        <div
          class="comment__item"
          v-for="comment in commentList"
          :key="comment.id"
        >
          <div class="comment__author">
            <img
              class="comment__author--image"
              src="../../assets/images/BikerWorld-user.png"
              alt=""
            />
            <p class="comment__author--name">{{ comment.author_name }}</p>
          </div>
          <p v-html="comment.content.rendered" class="comment__content"></p>
        </div>
      </div>
      <div class="comment__form">
        <h4>Commenter</h4>
        <form @submit.prevent="onCommentSubmit">
          <div>
            <div class="field">
              <textarea
                v-model="commentContent"
                placeholder="Le texte de votre commentaire"
                class="textarea field__input"
              ></textarea>
            </div>
          </div>
          <button type="submit" class="comment__form--button">Commenter</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import uploadService from "../../services/uploadService.js";
import eventService from "../../services/eventService.js";
import commentService from "../../services/commentService.js";
import participateService from "../../services/participateService.js";

export default {
  data() {
    return {
      eventData: {
        title: {
          rendered: "",
        },

        _embedded: {},
        content: { rendered: "" },
      },
      eventMedia: {
        // source_url:""
      },
      commentList: [],
      commentContent: "",
      comment: {
        content: {
          rendered: "",
        },
      },
      userId: localStorage.getItem("userId"),
      userParticipate: false,
      grade: "",
      nbreRegistration: 0,
      eventFull: false,
      isAuthor: false,
      hasComment: false,
    };
  },

  computed: {
    placeLeft() {
      return this.eventData.number_participant - this.nbreRegistration;
    },
    isUserLoggedIn() {
      return this.$store.state.isUserConnected;
    },
  },
  mounted() {
    eventService.getSingleEvent(this.$route.params.eventId).then((response) => {
      console.log(response);
      this.eventData = response.data;

      this.getRegistration();

      if (this.eventData.post_authorId === localStorage.userId) {
        this.isAuthor = true;
      }
    });

    uploadService
      .getSingleMedia(this.$route.params.eventId)
      .then((response) => {
        // console.log(response);
        this.eventMedia = response.data[0]["source_url"];
      });

    participateService
      .getParticipate({
        userId: this.userId,
        postId: this.$route.params.eventId,
      })
      .then((response) => {
        if (response.data.length > 0) {
          this.userParticipate = true;
        }
      });

    this.getRegistration();

    this.updateCommentList();
  },

  methods: {
    onCommentSubmit() {
      // on accède à la route courante (et à ses paramètres) via this.$route (/!\ != this.$router)
      commentService
        .postComment(this.$route.params.eventId, this.commentContent)
        .then((response) => {
          console.log(response);
          this.updateCommentList();
        });
    },
    updateCommentList() {
      commentService
        .getComments(this.$route.params.eventId)
        .then((response) => {
          this.commentList = response.data;
          if (this.commentList != "") {
            this.hasComment = true;
            this.commentContent = "";
          }
        });
    },
    onButtonParticipate() {
      if (this.userParticipate === true) {
        this.grade = 0;
      } else {
        this.grade = 1;
      }

      participateService
        .updateParticipate({
          userId: this.userId,
          postId: this.$route.params.eventId,
          grade: this.grade,
        })
        .then((response) => {
          if (this.userParticipate === true) {
            this.userParticipate = false;
          } else {
            this.userParticipate = true;
          }

          this.getRegistration();
        });
    },

    getRegistration() {
      participateService
        .countRegistration(this.$route.params.eventId)
        .then((response) => {
          this.nbreRegistration = parseInt(response.data.length);
          if (this.eventData.number_participant == this.nbreRegistration) {
            this.eventFull = true;
          } else {
            this.eventFull = false;
          }
        });
    },

    onButtonUpdateClick(eventId) {
      this.$router.push({
        name: "update-event",
        params: {
          eventId: eventId,
        },
      });
    },

    onButtonDelete(eventId) {
      const message = "Confirmer la suppression de l'événement";
      if (confirm(message)) {
        eventService
          .deleteEvent(eventId)
          .then((response) => {
            // console.log(response);
            this.$router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
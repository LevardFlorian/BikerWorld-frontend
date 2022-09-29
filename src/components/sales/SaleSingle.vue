<template>
  <div class="sales">
    <div class="sale-container__top">
      <h2
        class="sale-container__top--title"
        v-html="saleData.title.rendered"
      ></h2>
    </div>
    <div class="sale-container__image">
      <img :src="saleMedia" alt="" />
    </div>
    <div v-if="isAuthor" class="sale-container__image--button">
          <button @click="onButtonUpdateClick(this.$route.params.saleId)">
            Mettre à jour
          </button>
          <button @click="onButtonDelete(this.$route.params.saleId)">
            Supprimer l'annonce
          </button>
        </div>
    <div class="saleDescription">
      <p
        v-html="saleData.content.rendered"
        class="saleDescription__content"
      ></p>
      <p>Kilomêtre: {{saleData.distance}}km</p>
      <p>Prix: {{saleData.price}}€</p>
    </div>
    <p>Annonce proposer par: {{saleData.author}}</p>
    <RouterLink to="/contact-occasion"
      ><button>Contactez le vendeur</button></RouterLink
    >
  </div>
</template>

<script>
import uploadService from "../../services/uploadService.js";
import saleService from "../../services/saleService.js";
import commentService from "../../services/commentService.js";

export default {
  data() {
    return {
      saleData: {
        title: {
          rendered: "",
        },
        brandName: {
          0: {
            name: "",
          },
        },

        _embedded: {},
        content: { rendered: "" },
      },
      saleMedia: {
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

      isAuthor: false,
    };
  },

  computed: {
    isUserLoggedIn() {
      return this.$store.state.isUserConnected;
    },
  },
  mounted() {
    saleService.getSingleSale(this.$route.params.saleId).then((response) => {
      this.saleData = response.data;
      if (this.saleData.author_id == localStorage.userId) {
        this.isAuthor = true;
      }
    });

    uploadService
      .getSingleMedia(this.$route.params.saleId)
      .then((response) => {
        // console.log(response);
        this.saleMedia = response.data[0]["source_url"];
      });

    this.updateCommentList();
  },

  methods: {
    onCommentSubmit() {
      // on accède à la route courante (et à ses paramètres) via this.$route (/!\ != this.$router)
      commentService
        .postComment(this.$route.params.saleId, this.commentContent)
        .then((response) => {
          console.log(response);
          this.updateCommentList();
        });
    },
    updateCommentList() {
      commentService
        .getComments(this.$route.params.saleId)
        .then((response) => {
          this.commentList = response.data;
          if (this.commentList != "") {
            this.hasComment = true;
            this.commentContent = "";
          }
        });
    },
    onButtonUpdateClick(saleId) {
      this.$router.push({
        name: "update-sale",
        params: {
          saleId: saleId,
        },
      });
    },

    onButtonDelete(saleId) {
      const message = "Confirmer la suppression de l'annonce";
      if (confirm(message)) {
        saleService
          .deleteSale(saleId)
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
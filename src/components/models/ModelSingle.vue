<template>
  <div class="release">
    <div class="model-container__top">
      <h2
        class="model-container__top--title"
        v-html="modelData.title.rendered"
      ></h2>
    </div>
    <div class="model-container__image">
      <img :src="modelMedia" alt="" />
    </div>

    <div class="modelDescription">
      <p
        v-html="modelData.content.rendered"
        class="modelDescription__content"
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
import modelService from "../../services/modelService.js";
import commentService from "../../services/commentService.js";

export default {
  data() {
    return {
      modelData: {
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
      modelMedia: {
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
    modelService.getSingleModel(this.$route.params.modelId).then((response) => {
      console.log(response);
      this.modelData = response.data;
      if (this.modelData.post_authorId === localStorage.userId) {
        this.isAuthor = true;
      }
    });

    uploadService
      .getSingleMedia(this.$route.params.modelId)
      .then((response) => {
        // console.log(response);
        this.modelMedia = response.data[0]["source_url"];
      });

    this.updateCommentList();
  },

  methods: {
    onCommentSubmit() {
      // on accède à la route courante (et à ses paramètres) via this.$route (/!\ != this.$router)
      commentService
        .postComment(this.$route.params.modelId, this.commentContent)
        .then((response) => {
          console.log(response);
          this.updateCommentList();
        });
    },
    updateCommentList() {
      commentService
        .getComments(this.$route.params.modelId)
        .then((response) => {
          this.commentList = response.data;
          if (this.commentList != "") {
            this.hasComment = true;
            this.commentContent = "";
          }
        });
    },
    onButtonUpdateClick(modelId) {
      this.$router.push({
        name: "update-model",
        params: {
          modelId: modelId,
        },
      });
    },

    onButtonDelete(modelId) {
      const message = "Confirmer la suppression du modèle";
      if (confirm(message)) {
        modelService
          .deleteModel(modelId)
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
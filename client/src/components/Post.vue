<template>
  <div>
    <div @click="$refs.postmodal.getReplies()" class="component post mt-2">
      <p id="post-user">
        <img v-bind:src="user.image" v-if="user.image" />
        {{ user.username }}
      </p>
      <p id="post-text">{{ post.post }}</p>
      <p>
        {{ dateFormatted }}
      </p>
      <v-btn variant="flat" color="red"
        @click.stop="
          deletePost();
          $emit('reloadPosts');
        "
        v-if="this.$storage.getStorageSync('userid') == this.post.userID"
      >
        Delete
      </v-btn>
    </div>
    <PostModal
      :show="showModal"
      @closeModal="showModal = false"
      :post="post"
      :user="user"
      :dateFormatted="dateFormatted"
      ref="postmodal"
    />
  </div>
</template>

<script>
import PostModal from "../components/PostModal.vue";
import axios from "axios";

export default {
  props: ["post"],
  name: "post",
  components: { PostModal },
  data() {
    return {
      dateOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
      showModal: false,
      dateFormatted: "",
      user: {
        userID: this.post.userID,
        username: "",
      },
    };
  },
  methods: {
    deletePost() {
      axios.post(`http://localhost:9000/api/delete-post/${this.post._id}`);
    },
  },
  mounted() {
    this.dateFormatted = new Date(this.post.createdAt).toLocaleDateString(
      "fi-FI",
      this.dateOptions
    );

    axios
      .get(`http://localhost:9000/api/get-user/${this.user.userID}`)
      .then((res) => {
        this.user.username = res.data.username;
        this.user.image = res.data.image;
      });
  },
};
</script>

<style scoped>
.component > p {
  margin-bottom: 0;
}

.post {
  cursor: pointer;
}

#post-text {
  font-size: 1.5rem;
}

#post-user {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>

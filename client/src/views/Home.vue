<template>
  <div class="home">
    <NewPost v-if="this.$storage.getStorageSync('userid')" @reloadPosts="getAllPosts()" />
    <h2 class="mt-3 mb-3">All posts</h2>
    <Post
      class="mt-2"
      v-for="post in posts"
      :key="post._id"
      :post="post"
      @reloadPosts="getAllPosts()"
    />
  </div>
</template>

<script>
import NewPost from "../components/NewPost.vue";
import Post from "../components/Post.vue";
import axios from "axios";

export default {
  name: "home",
  components: { NewPost, Post },
  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    this.getAllPosts();
  },
  methods: {
    getAllPosts() {
      axios.get("http://localhost:9000/api/get-all-posts/").then((res) => {
        this.posts = res.data;
      });
      console.log("asdf");
    },
  },
};
</script>

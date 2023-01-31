<template>
  <div v-if="user.username != ''">
    <div class="component">
      <h1>
        <img v-bind:src="user.image" v-if="user.image" class="me-3" />{{
          user.username
        }}
      </h1>
      <p>{{ user.bio }}</p>
      <div v-if="this.$storage.getStorageSync('userid') == this.$route.params.id">
        <v-btn color="primary" @click="redirect()">
          Edit profile
        </v-btn>
      </div>
    </div>
    <NewPost
      class="mt-2"
      v-if="this.$storage.getStorageSync('userid') == this.$route.params.id"
      @reloadPosts="getAllPosts()"
    />
    <h2 class="mt-4 mb-2">Posts</h2>
    <Post
      v-for="post in posts"
      :key="post._id"
      :post="post"
      @reloadPosts="getAllPosts()"
    />
  </div>
  <h3 v-if="error" style="text-align: center;">User not found</h3>
</template>

<script>
import axios from "axios"
import Post from "../components/Post.vue"
import NewPost from "../components/NewPost.vue"

export default {
  components: { Post, NewPost },
  data () {
    return {
      user: {
        username: "",
        image: ""
      },
      posts: [],
      error: false
    }
  },
  methods: {
    request () {
      axios
        .get(`http://localhost:9000/api/get-user/${this.$route.params.id}`)
        .then((res) => {
          this.user = res.data
          // let buf = Buffer.from(res.data.image.data);
          // this.user.image = "data:image/png;base64," + buf.toString("base64");
        })
        .catch((err) => {
          console.log(err.response.data.error)
          this.error = true
        })
    },
    redirect () {
      this.$router.push("/editaccount")
    },
    getAllPosts () {
      axios
        .get(`http://localhost:9000/api/get-posts/${this.$route.params.id}`)
        .then((res) => {
          this.posts = res.data
        })
    }
  },
  created () {
    this.request()
    this.getAllPosts()
  },
  watch: {
    $route () {
      this.request()
      this.getAllPosts()
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  resize: none;
}
</style>

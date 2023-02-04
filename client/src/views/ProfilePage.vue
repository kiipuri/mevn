<template>
  <template v-if="user.username != ''">
    <v-card>
      <v-card-title class="text-h4 my-2">
        <v-avatar>
          <v-img
            :src="'http://localhost:9000/api/get-image/' + user.image"
            alt="Avatar"
          />
        </v-avatar>
        {{ user.username }}
        <template v-if="$storage.getStorageSync('userid') == $route.params.id">
          <v-btn
            variant="outlined"
            rounded="pill"
            style="right: 0; position: absolute; margin-right: 1rem;"
            @click="redirect()"
          >
            Edit profile
          </v-btn>
        </template>
      </v-card-title>
      <v-card-text
        class="text-body-1"
      >
        {{ user.bio }}
      </v-card-text>
      <v-card-subtitle class="mb-2">
        Joined {{ formatDate(user.createdAt) }}
      </v-card-subtitle>
    </v-card>
    <!-- <NewPost -->
    <!--   v-if="$storage.getStorageSync('userid') == $route.params.id" -->
    <!--   class="mt-2" -->
    <!--   @reload-posts="getAllPosts()" -->
    <!-- /> -->
    <!-- <h2 class="mt-4 mb-2"> -->
    <!--   Posts -->
    <!-- </h2> -->
    <v-divider class="my-4" />
    <UserPost
      v-for="post in posts"
      :key="post._id"
      :post="post"
      @reload-posts="getAllPosts()"
    />
  </template>
  <h3
    v-if="error"
    style="text-align: center;"
  >
    User not found
  </h3>
</template>

<script>
import axios from "axios"
import UserPost from "../components/UserPost.vue"
import NewPost from "../components/NewPost.vue"
import { formatDate } from "../utils/utils.ts"

export default {
  components: { UserPost },
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
  watch: {
    $route () {
      this.request()
      this.getAllPosts()
    }
  },
  created () {
    this.request()
    this.getAllPosts()
  },
  methods: {
    formatDate,
    request () {
      this.error = false
      axios
        .get(`http://localhost:9000/api/get-user/${this.$route.params.id}`)
        .then((res) => {
          this.user = res.data
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
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  resize: none;
}
</style>

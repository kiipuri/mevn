<template>
  <v-card v-if="isDataFetched" class="my-6">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      <v-avatar class="mr-2">
        <v-img
          :src="'http://localhost:9000/api/get-image/' + user.image"
          alt="Avatar"
        />
      </v-avatar>
      <router-link :to="'/users/' + user._id" class="user-link">
        {{ user.username }}
      </router-link>
    </v-card-title>
    <v-card-text class="text-h5" style="line-height: 2rem">
      {{ post.post }}
    </v-card-text>
    <v-card-subtitle>{{ formatDateTime(post.createdAt) }}</v-card-subtitle>
    <v-card-subtitle class="text-subtitle-2 font-weight-bold actions mt-1">
      <v-btn
        icon="system-uicons:speech-bubble"
        variant="plain"
        size="x-small"
        style="margin-bottom: 2px"
      >
        <Icon icon="system-uicons:speech-bubble" width="24" height="24" />
      </v-btn>
      {{ post.comments.length }}
      <v-btn
        icon="mdi-cached"
        class="ml-2"
        variant="plain"
        size="x-small"
        style="margin-bottom: 2px"
      >
        <Icon icon="entypo:retweet" width="24" height="24" />
      </v-btn>
      250
      <v-btn
        icon="mdi-thumb-up"
        class="ml-2"
        variant="plain"
        size="x-small"
        style="margin-bottom: 2px"
      >
        <Icon icon="mdi:cards-heart-outline" width="24" height="24" />
      </v-btn>
      10
    </v-card-subtitle>
  </v-card>
  <UserPost v-for="reply in replies" :key="reply._id" :post="reply" />
</template>

<script>
import axios from "axios"
import UserPost from "../components/UserPost.vue"
import { Icon } from "@iconify/vue"
import { formatDateTime } from "../utils/utils.ts"

export default {
  name: "UserPostView",
  components: { UserPost, Icon },
  data() {
    return {
      post: Object,
      user: Object,
      replies: [],
      isDataFetched: false,
    }
  },
  watch: {
    $route() {
      this.getPost()
    },
  },
  beforeMount() {
    this.getPost()
  },
  methods: {
    formatDateTime,
    getPost() {
      axios
        .get(`http://localhost:9000/api/get-post/${this.$route.params.id}`)
        .then((res) => {
          this.post = res.data
          this.getUser()
          this.getReplies()
          this.isDataFetched = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUser() {
      axios
        .get(`http://localhost:9000/api/get-user/${this.post.userID}`)
        .then((res) => {
          this.user = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    likePost() {
      axios
        .post("http://localhost:9000/api/like-post", {
          userID: this.$storage.getStorageSync("userid"),
          postID: this.post._id,
        })
        .then((res) => {
          this.liked = res.data.liked
        })
    },
    getReplies() {
      axios
        .get(`http://localhost:9000/api/get-replies/${this.post._id}`)
        .then((res) => {
          this.replies = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

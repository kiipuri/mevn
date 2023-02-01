<template>
  <v-card class="my-6">
    <v-card-title
      class="text-subtitle-1 font-weight-bold"
    >
      <router-link
        :to="'/users/' + user._id"
        class="user-link"
      >
        {{ user.username }}
      </router-link>
    </v-card-title>
    <v-card-text class="text-h5">
      {{ post.post }}
    </v-card-text>
    <v-card-subtitle>{{ formatDateTime(post.createdAt) }}</v-card-subtitle>
    <v-card-subtitle class="text-subtitle-2 font-weight-bold actions">
      <Icon
        icon="heroicons:chat-bubble-oval-left-20-solid"
        style="vertical-align: -2px;"
      />
      {{ replies.length }}
    </v-card-subtitle>
  </v-card>
  <UserPost
    v-for="reply in replies"
    :key="reply._id"
    :post="reply"
  />
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
    }
  },
  watch: {
    $route () {
      this.getPost()
    }
  },
  beforeMount() {
    this.getPost()
  },
  methods: {
    formatDateTime,
    getPost() {
      axios.get(`http://localhost:9000/api/get-post/${this.$route.params.id}`).then((res) => {
        this.post = res.data
        this.getUser()
        this.getReplies()
      })
        .catch((err) => {
          console.log(err)
        })
    },
    getUser() {
      axios.get(`http://localhost:9000/api/get-user/${this.post.userID}`).then((res) => {
        this.user = res.data
      })
        .catch((err) => {
          console.log(err)
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
  }
}
</script>

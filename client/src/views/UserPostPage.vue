<template>
  <v-card class="my-6">
    <v-card-title class="text-subtitle-1 font-weight-bold">
      {{ user.username }}
    </v-card-title>
    <v-card-text class="text-h5">
      {{ post.post }}
    </v-card-text>
    <v-card-subtitle>{{ dateFormatted }}</v-card-subtitle>
    <v-card-subtitle class="text-subtitle-2 font-weight-bold">
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

export default {
  name: "UserPostView",
  components: { UserPost, Icon },
  data() {
    return {
      post: Object,
      user: Object,
      replies: [],
      dateFormatted: String,
      dateOptions: {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      },
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
    getPost() {
      axios.get(`http://localhost:9000/api/get-post/${this.$route.params.id}`).then((res) => {
        this.post = res.data
        this.getUser()
        this.getReplies()

        this.dateFormatted = new Date(this.post.createdAt).toLocaleDateString(
          "fi-FI",
          this.dateOptions
        )
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

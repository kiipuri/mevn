<template>
  <v-card
    v-if="isDataFetched"
    class="my-3"
  >
    <v-card-title class="text-subtitle-1 mt-1">
      <v-avatar class="mr-2">
        <v-img
          :src="'http://localhost:9000/api/get-image/' + user.image"
          alt="Avatar"
        />
      </v-avatar>
      <router-link
        :to="'/users/' + post.userID"
        class="user-link"
      >
        {{ user.username }}
      </router-link> <span class="float-right font-weight-regular">
        {{ formatDate(post.createdAt) }}
      </span>
    </v-card-title>
    <v-card-text class="text-subtitle-1 post-text mb-n2">
      {{ post.post }}
    </v-card-text>
    <v-card-subtitle class="text-subtitle-2 font-weight-bold actions">
      <v-btn
        icon="system-uicons:speech-bubble"
        variant="plain"
        size="x-small"
        style="margin-bottom: 2px;"
      >
        <Icon
          icon="system-uicons:speech-bubble"
          width="24"
          height="24"
        />
      </v-btn>
      {{ post.comments.length }}
      <v-btn
        icon="mdi-cached"
        class="ml-2"
        variant="plain"
        size="x-small"
        style="margin-bottom: 2px;"
      >
        <Icon
          icon="entypo:retweet"
          width="24"
          height="24"
        />
      </v-btn>
      250
      <v-btn
        icon="mdi-thumb-up"
        class="ml-2"
        variant="plain"
        size="x-small"
        style="margin-bottom: 2px;"
        @click="likePost()"
      >
        <Icon
          :icon="likeIcon"
          width="24"
          height="24"
          :class="{ liked: liked }"
        />
      </v-btn>
      {{ likes.length }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
import axios from "axios"
import { formatDate } from "../utils/utils.ts"

export default {
  name: "UserPost",
  props: {
    post: {
      type: Object,
      default: new Object()
    },
  },
  data () {
    return {
      user: Object,
      liked: false,
      likes: [],
      isDataFetched: false,
    }
  },
  computed: {
    likeIcon() {
      return this.liked ? "mdi:cards-heart" : "mdi:cards-heart-outline"
    },
  },
  beforeMount() {
    this.getUser()
    this.getLikes()
  },
  methods: {
    formatDate,
    getUser() {
      axios.get(`http://localhost:9000/api/get-user/${this.post.userID}`).then((res) => {
        this.user = res.data
      })
        .catch((err) => {
          console.log(err)
        })
    },
    likePost() {
      axios.post("http://localhost:9000/api/like-post", {
        userID: this.$storage.getStorageSync("userid"),
        postID: this.post._id
      }).then((res) => {
        this.liked = res.data.liked
      })
    },
    getLikes() {
      axios.get(`http://localhost:9000/api/get-post-likes/${this.post._id}`).then((res) => {
        this.likes = res.data.map(el => el.userID)
        if(this.likes.includes(this.$storage.getStorageSync("userid"))) {
          this.liked = true
        }

        this.isDataFetched = true
      })
    }
  },
}
</script>

<style scoped>
.user-link {
  text-decoration: none;
  color: black;
  /* line-height: 1rem; */
}

.user-link:hover {
  text-decoration: underline;
}
</style>

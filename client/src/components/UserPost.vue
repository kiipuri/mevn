<template>
  <v-card
    class="my-3"
  >
    <v-card-title
      class="text-subtitle-1 font-weight-bold user-link"
    >
      <router-link
        :to="'/users/' + post.userID"
        class="user-link"
      >
        {{ user.username }}
      </router-link>
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
      >
        <Icon
          icon="mdi:cards-heart-outline"
          width="24"
          height="24"
        />
      </v-btn>
      10
    </v-card-subtitle>
  </v-card>
</template>

<script>
import axios from "axios"

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
    }
  },
  beforeMount() {
    this.getUser()
  },
  methods: {
    getUser() {
      axios.get(`http://localhost:9000/api/get-user/${this.post.userID}`).then((res) => {
        this.user = res.data
      })
        .catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>

<style scoped>
.user-link {
  text-decoration: none;
  color: black;
  line-height: 1rem;
}

.user-link:hover {
  text-decoration: underline;
}
</style>

<template>
  <router-link
    :to="'/post/' + post._id"
    style="position: absolute; height: 100%; width: 100%;"
  />
  <v-card
    class="my-3"
  >
    <v-card-title
      class="text-subtitle-1 font-weight-bold"
    >
      <router-link
        :to="'/users/' + post.userID"
        class="user-link"
      >
        {{ user.username }}
      </router-link>
    </v-card-title>
    <v-card-text class="text-subtitle-1 post-text">
      {{ post.post }}
    </v-card-text>
    <v-card-subtitle class="text-subtitle-2 font-weight-bold actions">
      <Icon
        icon="heroicons:chat-bubble-oval-left-20-solid"
        style="vertical-align: -2px;"
      />
      {{ post.comments.length }}
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
    openPost() {
      console.log("jojojoj")
    },
    // getPost() {
    //   axios.get(`http://localhost:9000/api/get-post/${this.$route.params.id}`).then((res) => {
    //     this.post = res.data
    //     this.getUser()
    //
    //     this.dateFormatted = new Date(this.post.createdAt).toLocaleDateString(
    //       "fi-FI",
    //       this.dateOptions
    //     )
    //   })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
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

.post-text {
  line-height: 1rem;
  padding: 0.5rem 1rem;
}

.actions {
  line-height: 1rem;
  margin-bottom: 0.5rem;
}
</style>

<template>
  <v-btn
    id="new-post"
    icon="mdi-pencil"
    color="blue"
    size="x-large"
    @click="dialog = true"
  />
  <v-dialog v-model="dialog">
    <v-card class="post-form pa-4">
      <v-textarea
        v-model="postText"
        label="what's happening?"
        class="text-h1"
      />
      <v-card-actions>
        <v-spacer />
        <v-btn @click="send()">
          Post
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      dialog: false,
      postText: ""
    }
  },
  methods: {
    send() {
      axios
        .post("http://localhost:9000/api/sendpost", {
          post: this.postText,
          userID: this.$storage.getStorageSync("userid"),
        })
        .then(() => {
          this.$emit("reloadPosts")
          this.postText = ""
          this.dialog = false
        })
    },
  }
}
</script>

<style scoped>
#new-post {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
  z-index: 100;
}

.post-form {
  width: 50%;
  margin: 0 auto;
}
</style>

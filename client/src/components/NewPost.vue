<template>
  <div class="component">
    <textarea
      v-model="postText"
      @input="resize()"
      rows="1"
      placeholder="Type your message for the world to see..."
      ref="textarea"
    ></textarea>
    <button class="btn btn-outline-primary mt-2" @click="send()">Send</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      postText: "",
    };
  },
  methods: {
    resize() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + "px";
    },
    send() {
      axios
        .post("http://localhost:9000/api/sendpost", {
          post: this.postText,
          userID: this.$storage.getStorageSync("userid"),
        })
        .then(() => {
          this.$emit("reloadPosts");
          this.postText = "";
        });
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  outline: none;
  border: none;
  overflow: hidden;
  resize: none;
}

#post-container {
  background-color: white;
  padding: 1em;
  border-radius: 2em;
  box-shadow: 0 0 10px 2px #bbb;
}
</style>

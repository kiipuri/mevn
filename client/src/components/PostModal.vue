<template>
  <transition name="modal" appear>
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper" @click.self="$emit('closeModal')">
        <div class="modal-container">
          <h2>
            <img v-bind:src="user.image" v-if="user.image" />
            {{ user.username }}
          </h2>
          <p id="post-text">{{ post.post }}</p>
          <p id="post-date">{{ dateFormatted }}</p>
          <div v-if="this.$storage.getStorageSync('userid')">
            <textarea
              class="form-control"
              @input="resize()"
              id="reply"
              placeholder="Write your reply..."
              v-model="reply"
              ref="modalTextarea"
            ></textarea>
            <v-btn variant="outlined" color="primary"
              class="btn btn-outline-primary mt-2"
              @click="
                sendReply();
                $emit('closeModal');
              "
            >
              Send reply
            </v-btn>
          </div>
          <h4 class="mt-2">Replies</h4>
          <Post
            v-for="reply in replies"
            :key="reply._id"
            :post="reply"
            @reloadPosts="getReplies()"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  name: "postmodal",
  props: {
    show: Boolean,
    post: {},
    dateFormatted: String,
    user: {},
  },
  data() {
    return {
      reply: "",
      replies: [],
    };
  },
  methods: {
    sendReply() {
      axios
        .post("http://localhost:9000/api/send-reply", {
          userID: this.$storage.getStorageSync("userid"),
          post: this.reply,
          parentPostID: this.post._id,
        })
        .then(() => {
          this.reply = "";
          this.$parent.$emit("reloadPosts");
        });
    },
    getReplies() {
      axios
        .get(`http://localhost:9000/api/get-replies/${this.post._id}`)
        .then((res) => {
          this.replies = res.data;
          this.$parent.showModal = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resize() {
      this.$refs.modalTextarea.style.height = "auto";
      this.$refs.modalTextarea.style.height =
        this.$refs.modalTextarea.scrollHeight + "px";
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow: auto;
  max-height: 70%;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(1.1);
}

#post-text {
  font-size: 1.7rem;
}

#reply {
  width: 100%;
  outline: none;
  overflow: hidden;
}

textarea {
  width: 100%;
  outline: none;
  overflow: hidden;
  resize: none;
}
</style>

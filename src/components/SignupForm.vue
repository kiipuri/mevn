<template>
  <form @submit.prevent="handleSubmit" class="component">
    <input
      required
      class="form-control"
      v-model="user.username"
      placeholder="Type your username"
    />
    <input
      required
      type="email"
      class="form-control mt-2"
      v-model="user.email"
      placeholder="Type your email"
    />
    <input
      required
      class="form-control mt-2"
      v-model="user.password"
      type="password"
      placeholder="Type your password"
    />
    <v-btn>Send</v-btn>
    <button class="btn btn-outline-primary mt-2">Send</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
        email: "",
      },
    };
  },
  methods: {
    handleSubmit() {
      let apiURL = "http://localhost:9000/api/new-user";

      axios
        .post(apiURL, this.user)
        .then(() => {
          console.log("asfd");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

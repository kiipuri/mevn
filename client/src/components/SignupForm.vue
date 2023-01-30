<template>
  <v-form @submit.prevent="handleSubmit" class="component" id="form">
    <v-text-field
      required
      v-model="user.username"
      placeholder="Type your username"
    />
    <v-text-field
      required
      type="email"
      v-model="user.email"
      placeholder="Type your email"
    />
    <v-text-field
      required
      v-model="user.password"
      type="password"
      placeholder="Type your password"
    />
    <v-btn color="primary" type="submit" form="form">Send</v-btn>
  </v-form>
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

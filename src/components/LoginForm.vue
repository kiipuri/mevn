<!-- <template> -->
<!--   <form @submit.prevent="handleSubmitForm" class="component"> -->
<!--     <div -->
<!--       class="alert alert-danger alert-dismissible" -->
<!--       role="alert" -->
<!--       v-if="loginFailed" -->
<!--     > -->
<!--       Login failed -->
<!--       <button -->
<!--         type="button" -->
<!--         class="btn-close" -->
<!--         data-bs-dismiss="alert" -->
<!--         aria-label="Close" -->
<!--       ></button> -->
<!--     </div> -->
<!--     <input -->
<!--       required -->
<!--       v-model="user.username" -->
<!--       class="form-control" -->
<!--       :class="{ 'is-invalid': loginFailed }" -->
<!--       placeholder="Username" -->
<!--     /> -->
<!--     <input -->
<!--       type="password" -->
<!--       required -->
<!--       v-model="user.password" -->
<!--       class="form-control mt-2" -->
<!--       :class="{ 'is-invalid': loginFailed }" -->
<!--       placeholder="Password" -->
<!--     /> -->
<!--     <v-btn>Log in</v-btn> -->
<!--     <router-link to="signup"> -->
<!--       <v-btn>Sign up</v-btn> -->
<!--     </router-link> -->
<!--   </form> -->
<!-- </template> -->

<template>
  <v-form class="component" ref="form" lazy-validation>
    <v-alert type="error" v-if="loginFailed" closable style="text-align: left" class="mb-4">Login failed</v-alert>
    <v-text-field
      required
      v-model="user.username"
      :rules="nameRules"
      placeholder="Username"
    />
    <v-text-field
      type="password"
      required
      v-model="user.password"
      :rules="passwordRules"
      placeholder="Password"
    />
    <v-btn @click="handleSubmitForm" color="primary" class="mr-2">Log in</v-btn>
    <router-link to="signup">
      <v-btn color="indigo">Sign up</v-btn>
    </router-link>
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
      },
      nameRules: [
        v => !!v || "Name is required"
      ],
      passwordRules: [
        v => !!v || "Password is required"
      ],
      loginFailed: false,
    };
  },
  methods: {
    handleSubmitForm() {
      this.$refs.form.validate();
      let apiURL = "http://localhost:9000/api/login";

      axios
        .post(apiURL, this.user)
        .then((res) => {
          if (res.data.length != 0) {
            this.$storage.setStorageSync("username", res.data[0].username);
            this.$storage.setStorageSync("userid", res.data[0]._id);
            this.$router.push("/users/" + res.data[0]._id);
          } else {
            this.loginFailed = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
input {
  outline: none !important;
}
label {
  font-size: 1em;
}
form {
  width: 100%;
}
</style>

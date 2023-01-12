<template>
  <v-form @submit.prevent="saveAccount" class="component" id="form">
    <v-alert type="error" v-if="passwordsNotMatching" closable style="text-align: left" class="mb-4">Passwords do not match</v-alert>
    <v-text-field
      v-model="user.username"
      placeholder="Enter your username"
    />
    <v-text-field
      v-model="user.email"
      placeholder="Enter your email"
    />
    <v-textarea
      @input="resize()"
      v-model="user.bio"
      placeholder="Enter your bio"
      ref="textarea"
    >asfas</v-textarea>
    <v-text-field
      type="password"
      v-model="user.password"
      placeholder="Enter your password"
      :class="{ 'is-invalid': passwordsNotMatching }"
    />
    <v-text-field
      type="password"
      v-model="password2"
      placeholder="Confirm your password"
      :class="{ 'is-invalid': passwordsNotMatching }"
    />
    <div class="input-group mt-2">
      <label for="image" class="input-group-text">Select profile picture</label>
      <v-file-input
        id="image"
        @change="savePicture"
      />
    </div>
    <v-btn color="primary" type="submit" form="form">Save profile</v-btn>
  </v-form>
</template>

<script>
import axios from "axios";
import Buffer from "buffer";

export default {
  data() {
    return {
      user: {},
      password2: "",
      passwordsNotMatching: false,
    };
  },
  beforeMount() {
    axios
      .get(`http://localhost:9000/api/get-user/${this.$storage.getStorageSync("userid")}`)
      .then((res) => {
        this.user = res.data;
        let buf = Buffer.from(res.data.image.data);
        this.user.image = "data:image/png;base64," + buf.toString("base64");
      })
      .catch((err) => {
        console.log("no image");
      });
  },
  updated() {
    this.resize();
  },
  methods: {
    saveAccount() {
      if (this.user.password !== this.password2) {
        this.passwordsNotMatching = true;
        return;
      }

      axios
        .post(`http://localhost:9000/api/save-account/`, this.user)
        .then(() => {
          this.$router.push(`/users/${this.$storage.getStorageSync("userid")}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resize() {
      this.$refs.textarea.style.height = "auto";
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + "px";
    },
    savePicture(e) {
      let files = e.target.files;
      this.createPicture(files[0]);
    },
    createPicture(file) {
      let reader = new FileReader();
      let vm = this.user;

      reader.onload = (e) => {
        let base64str = e.target.result.split(",")[1];
        vm.image = base64str;
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  outline: none;
  overflow: hidden;
  resize: none;
}

#image::file-selector-button {
  display: none;
}

.input-group:hover label {
  background-color: #dde0e3;
  cursor: pointer;
}
</style>

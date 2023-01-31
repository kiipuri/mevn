<template>
  <div class="dropdown">
    <div v-if="logged">
      <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
        {{ this.$storage.getStorageSync("username") }}
      </button>
      <ul class="dropdown-menu">
        <li>
          <router-link
            :to="'/users/' + this.$storage.getStorageSync('userid')"
            class="dropdown-item"
            href="#"
            >Profile</router-link
          >
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="logout()">Log out</a>
        </li>
      </ul>
    </div>
    <div v-else>
      <router-link to="/login">
        <button class="btn btn-primary">Log in</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logged: Boolean,
    }
  },
  methods: {
    logout() {
      this.$router.push("/logout")
    },
  },
  mounted() {
    if (this.$storage.getStorageSync("username")) {
      this.logged = true
    } else {
      this.logged = false
    }
  },
  watch: {
    $route() {
      if (this.$storage.getStorageSync("username")) {
        this.logged = true
      } else {
        this.logged = false
      }
    },
  },
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  right: 2em;
  top: 2em;
}
</style>

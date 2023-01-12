<template>
  <div>
    <h1>Logged in</h1>
    <button v-on:click="logout">Log out</button>
  </div>
</template>

<script>
export default {
  name: "Logged",
  data() {
    return {};
  },
  beforeCreate() {
    if (!this.$session.exists()) {
      this.$router.push("/");
    }
  },
  methods: {
    logout() {
      this.$session.destroy();
      this.$router.push("/");
    },
  },
};
</script>

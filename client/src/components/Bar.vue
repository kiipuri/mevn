<template>
  <div>
    <router-link id="#home-link" to="/">Home</router-link>
    <Search />
    <ProfileButton />
  </div>
</template>

<script>
import Search from "./Search.vue";
import ProfileButton from "./ProfileButton.vue";

export default {
  components: { Search, ProfileButton },
};
</script>

<style scoped>
a {
  position: absolute;
  left: 2rem;
  top: 2rem;
  font-size: 2rem;
  text-decoration: none;
}
</style>

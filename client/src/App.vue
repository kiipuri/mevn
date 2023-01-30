<template>
  <div id="container">
    <TopBar />
    <router-view></router-view>
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue"

export default {
  name: "App",
  components: { TopBar },
  created () {
    document.title = "My Cool Website"
    this.$storage.setStorageSync("test-key", "testdata")
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #f3f3f5 !important;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#container {
  width: 40%;
  margin: auto;
  padding: 1em;
}

.component {
  background-color: white;
  padding: 1em;
  border-radius: 2em;
  box-shadow: 0 0 10px 2px #bbb;
}
</style>

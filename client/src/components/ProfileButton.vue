<template>
  <v-menu v-if="logged">
    <template #activator="{ props }">
      <v-btn
        class="dropdown"
        rounded="pill"
        v-bind="props"
      >
        {{ $storage.getStorageSync("username") }}
        <template #append>
          <v-icon icon="mdi-menu-down" />
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        router
        :to="'/users/' + $storage.getStorageSync('userid')"
      >
        Profile
      </v-list-item>
      <v-list-item
        router
        :to="'/logout'"
      >
        Logout
      </v-list-item>
    </v-list>
  </v-menu>
  <v-btn
    v-else
    class="dropdown"
    rounded="pill"
    router
    :to="'/login'"
  >
    Login
  </v-btn>
</template>

<script>
export default {
  data () {
    return {
      logged: Boolean
    }
  },
  watch: {
    $route () {
      if (this.$storage.getStorageSync("username")) {
        this.logged = true
      } else {
        this.logged = false
      }
    }
  },
  mounted () {
    if (this.$storage.getStorageSync("username")) {
      this.logged = true
    } else {
      this.logged = false
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: absolute;
  right: 2em;
  top: 2em;
  left: initial;
  font-size: initial;
}
</style>

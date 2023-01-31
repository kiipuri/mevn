<template>
  <div id="search">
    <v-text-field hide-details single-line label="Search users" @input="searchUsers" v-model="searchText">
    </v-text-field>
    <v-card class="mx-auto" max-width="300" v-if="foundUsers.length > 0">
      <v-list>
        <v-list-item
          v-for="(user, i) in foundUsers"
          :key="i"
          :value="user"
          router :to="'/users/' + user._id">
          {{ user.username }}
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      searchText: "",
      foundUsers: [],
      hidden: true,
      clicked: false,
    }
  },
  methods: {
    searchUsers() {
      this.foundUsers = []
      axios
        .post(`http://localhost:9000/api/find-users/${this.searchText}`)
        .then((res) => {
          this.foundUsers = res.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  watch: {
    $route() {
      this.searchText = ""
      this.foundUsers = []
    },
  },
  computed: {
    
  },
}
</script>

<style scoped>
#search {
  margin: 1em auto;
  width: 50%;
}

#float {
  position: absolute;
  width: 20%;
}

.dropdown-item {
  background-color: #f5f1f1;
}
</style>

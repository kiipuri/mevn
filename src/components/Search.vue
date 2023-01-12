<template>
    <div id="search">
        <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            single-line
            label="Search users"
            @input="searchUsers"
            v-model="searchText">
        </v-text-field>
        <v-list v-if="foundUsers.length > 0">
            <template v-for="user in foundUsers">
                <router-link :to="'/users/' + user._id" style="text-decoration: none">
                    {{ user.username }}
                </router-link>
            </template>
        </v-list>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchText: "",
      foundUsers: [],
      hidden: true,
      clicked: false,
    };
  },
  methods: {
    searchUsers() {
      this.foundUsers = [];
      axios
        .post(`http://localhost:9000/api/find-users/${this.searchText}`)
        .then((res) => {
          this.foundUsers = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    $route() {
      this.searchText = "";
      this.foundUsers = [];
    },
  },
};
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

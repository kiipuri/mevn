<template> 
  <div class="search">
    <v-menu>
      <template #activator="{ props }">
        <v-text-field
          v-bind="props"
          v-model="searchText"
          hide-details
          single-line
          label="Search users"
          @input="searchUsers"
        />
      </template>
      <v-list v-if="foundUsers.length > 0">
        <v-list-item
          v-for="(user, i) in foundUsers"
          :key="i"
          :value="user"
          router
          :to="'/users/' + user._id"
        >
          {{ user.username }}
        </v-list-item>
      </v-list>
    </v-menu>
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
  computed: {
    
  },
  watch: {
    $route() {
      this.searchText = ""
      this.foundUsers = []
    },
  },
  methods: {
    searchUsers() {
      this.foundUsers = []

      if (this.searchText === "") {
        return
      }

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
}
</script>

<style scoped>
.search {
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

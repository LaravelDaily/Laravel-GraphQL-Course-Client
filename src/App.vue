<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Tasks</router-link> |
      <div v-if="isAuthenticated">
        <div>
          Hi, {{ user.name }} ({{ user.email }})
          <button type="button" @click="submitLogout">Log out</button>
        </div>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
</style>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("Auth", ["isAuthenticated", "user"]),
  },
  mounted() {
    this.attemptAuthentication();
  },
  methods: {
    ...mapActions("Auth", ["attemptAuthentication", "logout"]),
    submitLogout() {
      this.logout();
      this.$router.push("/login");
    },
  },
};
</script>

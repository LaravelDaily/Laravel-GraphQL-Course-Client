<template>
    <form @submit.prevent="submitLogin">
      Email
      <br/>
      <input v-model="email" type="email"/>
      <br/><br/>
      Password
      <br/>
      <input v-model="password" type="password"/>
      <br/><br/>
      <button type="submit">Log In</button>
    </form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitLogin() {
      axios
          .post(process.env.VUE_APP_SERVER_HTTP + "/api/sanctum/token", {
            email: this.email,
            password: this.password,
            device_name: navigator.userAgent,
          })
          .then(async (response) => {
            console.log("Token: " + response.data);
            this.$router.push("/");
          })
          .catch((error) => console.log(error));
    },
  },
}
</script>

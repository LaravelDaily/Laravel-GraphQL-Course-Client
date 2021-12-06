<template>
    <form @submit.prevent="submitLogin">
      Email
      <br/>
      <input v-model="authDetails.email" type="email"/>
      <br/><br/>
      Password
      <br/>
      <input v-model="authDetails.password" type="password"/>
      <br/><br/>
      <button type="submit">Log In</button>
      <div v-show="error" style="color: red">Invalid credentials.</div>
    </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      authDetails: {
        email: "",
        password: "",
      },
      error: false,
    };
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    submitLogin() {
      this.error = false;
      this.login(this.authDetails)
          .then(() => {
            this.$router.push("/");
            this.$router.push("/");
          })
          .catch((error) => {
            this.error = true;
            console.log(error)
          });
    },
  },
}
</script>

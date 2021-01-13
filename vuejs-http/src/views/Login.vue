<template>
  <div id="app">
    <h3>SignIn</h3>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button @click="login">SignIn</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login(){
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
      this.email = '',
      this.password = '';
    },
    signout() {
      axios
        .delete("http://localhost:3000/v1/auth/sign_out", {
          headers: {
            uid: this.uid,
            "access-token": this.access_token,
            client: this.client,
          },
        })
        .then((response) => {
          console.log(response);
          this.access_token = "";
          this.client = "";
          this.uid = "";
          localStorage.removeItem("uid");
          localStorage.removeItem("access-token");
          localStorage.removeItem("client");
        });
      this.tasks = [];
    }
  },
};
</script>

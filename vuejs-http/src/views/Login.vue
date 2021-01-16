<template>
  <div id="app">
    <h3>SignIn</h3>
    <v-text-field
      label="Email"
      type="email"
      filled
      rounded
      dense
      v-model="email"
    >
    </v-text-field>
    <v-text-field
      label="Password"
      type="password"
      filled
      rounded
      dense
      v-model="password"
    ></v-text-field>
    <v-btn @click="login">SignIn</v-btn>
    
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

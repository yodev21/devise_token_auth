<template>
  <div id="app">
    <h3>SignUp</h3>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button @click="signup">SignUp</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      uid: "",
      access_token: "",
      client: ""
    };
  },
  methods: {
    
    signup() {
      console.log(this.email)
      console.log(this.password)
      axios
        .post("http://localhost:3000/v1/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem(
            "access-token",
            response.headers["access-token"]
          );
          localStorage.setItem("client", response.headers["client"]);
          localStorage.setItem("uid", response.headers["uid"]);
          this.access_token = response.headers["access-token"];
          this.client = response.headers["client"];
          this.uid = response.headers["uid"];

          this.all_tasks();
        });
    },
  },
};
</script>

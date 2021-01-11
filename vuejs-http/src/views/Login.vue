<template>
  <div id="app">
    <h3>SignIn</h3>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button @click="signin">SignIn</button>
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
    signin() {
      axios
        .post("http://localhost:3000/v1/auth/sign_in", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
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
    signout() {
      axios
        .delete("http://localhost:3000/v1/auth/sign_out", {
          test: { test: "test" },
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

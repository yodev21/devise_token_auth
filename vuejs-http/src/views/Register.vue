<template>
  <div id="app">
    <h3>SignUp</h3>
    <label for="email">Email</label>
    <input id="email" type="email" v-model="email" />
    <label for="password">Password</label>
    <input id="password" type="password" v-model="password" />
    <button @click="register">SignUp</button>
          <v-toolbar color="red lighten-3" dark> <!-- 説明 3.4 -->
        <v-toolbar-title>Snippet App</v-toolbar-title> <!-- 説明 3.5 -->
        <v-spacer></v-spacer> <!-- 説明 3.6 -->
        <v-btn flat>New Snippet</v-btn> <!-- 説明 3.7 -->
      </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register',{
        email: this.email,
        password: this.password
      })
      this.email = ''
      this.password = ''
    },
  },
};
</script>

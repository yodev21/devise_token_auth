<template>
  <div id="app">
    <h3>SignUp</h3>
    <label for="email">Email</label>
    <v-text-field id="email" type="email" v-model="email" />
    <label for="password">Password</label>
    <v-text-field id="password" type="password" v-model="password" />
    <v-btn @click="register">SignUp</v-btn>

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

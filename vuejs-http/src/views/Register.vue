<template>
  <div id="app">
    <h3>SignUp</h3>
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

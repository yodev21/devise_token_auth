<template>
  <div id="app">
    <header>
      <template v-if="isAuthenticated">
        <router-link to="/" class="header-item">タスク一覧</router-link>
        <span to="/" class="header-item" @click="logout">ログアウト</span>
      </template>
      <template v-if="!isAuthenticated">
        <router-link  outer-link to="/login" class="header-item">SignIn</router-link>
        <router-link to="/register" class="header-item">SignUp</router-link>
      </template>
    </header>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  computed: {
    isAuthenticated(){
      return this.$store.getters.uidToken !== null
    }
  },
  methods: {
    logout(){
      this.$store.dispatch("logout")
    }
  }
}
</script>
<style scoped>
  .header-item{
    padding: 10px;
    cursor: pointer
  }
</style>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

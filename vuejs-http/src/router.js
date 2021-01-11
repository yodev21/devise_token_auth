import Vue from 'vue'
import Router from 'vue-router';
import Tasks from './views/Tasks.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Tasks
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/Register',
      component: Register
    }
  ]
})
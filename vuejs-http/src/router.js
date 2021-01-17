import Vue from 'vue'
import Router from 'vue-router';
import Tasks from './views/Tasks.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import TaskDetail from './views/TaskDetail.vue'
import store from './store';
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Tasks,
      beforeEnter(to, from, next) {
        if (store.getters.uidToken) {
          next();
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/login',
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.uidToken) {
          next('/');
        } else {
          next()
        }
       }
    },
    {
      path: '/Register',
      component: Register,
      beforeEnter(to, from, next) {
        if (store.getters.uidToken) {
          next('/')
        } else {
          next()
        }
      }
    },
    {
      path: '/tasks/:id',
      component: TaskDetail,
      beforeEnter(to, from, next) {
        console.log("show")
        if (store.getters.uidToken) {
          next()
        } else {
          next('/login')
        }
      }
    }
  ]
})
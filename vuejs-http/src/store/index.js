import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uidToken: null,
    accessToken: null,
    clientToken: null
  },
  getters: {
    uidToken: state => state.uidToken,
    accessToken: state => state.accessToken,
    clientToken: state => state.clientToken
  },
  mutations: {
    updateUidToken(state, uidToken) {
      localStorage.setItem("uid", uidToken);
      state.uidToken = uidToken
    },
    updateAccessToken(state, accessToken) {
      localStorage.setItem("access-token", accessToken);
      state.accessToken = accessToken
    },
    updateClientToken(state, clientToken) {
      localStorage.setItem("client", clientToken);
      state.clientToken = clientToken
    }
  },
  actions: {
    autoLogin({ commit }) {
      const uidToken = localStorage.getItem('uid')
      console.log(uidToken)
      if (!uidToken) return;
      
      commit('updateUidToken', uidToken)
    },
    login({ commit }, authData) { 
      axios
        .post("http://localhost:3000/v1/auth/sign_in", {
          email: authData.email,
          password: authData.password,
        })
        .then((response) => {
          console.log(response);
          commit('updateUidToken', response.headers["uid"])
          commit('updateAccessToken', response.headers["access-token"])
          commit('updateClientToken', response.headers["client"])
          console.log(response.data)
          router.push('/')
        });
    },
    register({commit}, authData) {
      axios
        .post("http://localhost:3000/v1/auth", {
          email: authData.email,
          password: authData.password,
        })
        .then((response) => {
          commit('updateUidToken', response.headers["uid"])
          commit('updateAccessToken', response.headers["access-token"])
          commit('updateClientToken', response.headers["client"])
          router.push('/')
        });
    },
    logout({ commit }) {
      commit('updateUidToken', null)
      localStorage.removeItem("uid");
      commit('updateAccessToken', null)
      localStorage.removeItem("access-token");
      commit('updateClientToken', null)
      localStorage.removeItem("client");
      router.push('/login')
    },
    reload({ commit }) {
      commit('updateUidToken', localStorage.getItem("uid"))
      commit('updateAccessToken', localStorage.getItem("access-token"))
      commit('updateClientToken', localStorage.getItem("client"))
    }
  }
});
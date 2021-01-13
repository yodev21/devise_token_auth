import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

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
        });
    },
    reload({ commit }) {
      commit('updateUidToken', localStorage.getItem("uid"))
      commit('updateAccessToken', localStorage.getItem("access-token"))
      commit('updateClientToken', localStorage.getItem("client"))
    }
  }
});
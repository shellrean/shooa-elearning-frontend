import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth.js'
import user from './user.js'
import materi from './materi.js'
import matpel from './matpel.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
  	auth,
  	user,
    materi,
    matpel
  },
  state: {
    errors: [],
    isLoading: false,
    loadPage: false,
    token: localStorage.getItem('token'),
  },
  getters: {
    isAuth: state => {
      return state.token != "null" && state.token != null
    },
    isLoading: state => {
      return state.isLoading
    }
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload
    },
    SET_ERRORS(state, payload) {
      state.errors = payload
    },
    CLEAR_ERRORS(state) {
      state.errors = []
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload
    },
    LOADING_PAGE(state, payload) {
      state.loadPage = payload
    }
  }
})

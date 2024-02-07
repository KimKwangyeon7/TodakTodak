// src/store/index.js

import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null, // 토큰을 저장할 상태
  },
  mutations: {
    setToken(state, token) {
      state.token = token; // 토큰 설정
    },
    clearToken(state) {
      state.token = null; // 토큰 초기화
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setToken', token); // 로그인 시 토큰 설정
    },
    logout({ commit }) {
      commit('clearToken'); // 로그아웃 시 토큰 초기화
    },
  },
  getters: {
    getToken: (state) => state.token, // 토큰 가져오기
  },
});

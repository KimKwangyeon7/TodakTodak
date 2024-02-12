<template>
  <div class="login-container">
    <div class="loginbox">
      <img src="@/assets/sleepcat.gif" alt="logo" class="login-img">
      <form @submit.prevent="logIn" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" v-model.trim="email">
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password">
        </div>
        <button type="submit" class="login-button">로그인</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
// import { useStore } from 'pinia';
import axios from 'axios';

// const store = useStore(); // 기존에 생성된 스토어에 접근

const email = ref(null);
const password = ref(null);

const logIn = async function () {
  console.log('Axios object:', axios); // axios 객체 확인
  const payload = {
    email: email.value,
    password: password.value,
  };

  try {
    // Axios를 사용하여 로그인 요청을 보냄
    const response = await axios.post('http://localhost:8080/members/login', payload);
    console.log(response);
    // 토큰을 받아옴
    const receivedToken = response.data.accessToken;
    console.log(receivedToken);

    // 받아온 토큰을 Vuex store에 저장
    // useStore.commit('token', receivedToken);

    // 받아온 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', receivedToken);
  } catch (error) {
    console.error('Login failed:', error);
    // 실패 시 필요한 로직 추가
  }
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loginbox {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

.login-img {
  display: block;
  margin: 0 auto 20px;
  max-width: 100%;
}

.login-form .form-group {
  margin-bottom: 20px;
}

.login-form label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-button {
  background-color: #2196F3;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0d8bf9;
}
</style>
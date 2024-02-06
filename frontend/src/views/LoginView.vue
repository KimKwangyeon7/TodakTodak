<template>

  <div>
  <div class="loginbox"  >

    <div style="display: flex; border-radius: 10px; color: black ; background-color: aliceblue; align-items: center; justify-content: center;" class="z-2">
      <img src="@/assets/sleepcat.gif" alt="logo" style=" width: auto; height: 350px; border-radius: 10px;">
      <form @submit.prevent="logIn" >
        <div class="containtext">
          <div>
            <label for="email">email :    </label>
          </div>
          <input type="text" name="email" id="email" v-model.trim="email"> 
        </div>
        <div class="containtext">
          <div>
            <label for="password">password : </label>
          </div>
          <input type="password" name="password" id="password" v-model.trim="password">
        </div>
        <input style="border-radius: 5px; margin-left: 55px ; " type="submit" value="로그인">
      </form>
    </div>
  </div>
</div>


</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import * as axios from 'axios';

const store = useStore(); // 기존에 생성된 스토어에 접근

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
    const response = await axios.post('your_login_endpoint', payload);

    // 토큰을 받아옴
    const receivedToken = response.data.token;

    // 받아온 토큰을 Vuex store에 저장
    store.commit('setToken', receivedToken);

    // 받아온 토큰을 로컬 스토리지에 저장
    localStorage.setItem('token', receivedToken);
  } catch (error) {
    console.error('Login failed:', error);
    // 실패 시 필요한 로직 추가
  }
};
</script>


<style>
.loginbox{
flex-direction: column;  
display: flex; 
justify-content: center; 
align-items: center;
margin-top: 10%;
}
.containtext {
display: flex; 
justify-content: space-around;
}

.containtext > input {
width: 60%  ;
border-radius: 3px;
}
.containtext > div {
width:  150px  ;
text-align: end;
}
</style>

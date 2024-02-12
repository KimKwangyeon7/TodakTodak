<template>
  <div>
    <div class="signup-container">
      <div class="signup-box">
        <img src="@/assets/happycat.gif" alt="logo" class="signup-img">
        <form @submit.prevent="signUp" class="signup-form">
          <div class="form-group">
            <label for="name">이름 :</label>
            <input type="text" id="name" v-model.trim="name">
          </div>
          <div class="form-group">
            <label for="email">이메일 :</label>
            <input type="email" id="email" v-model.trim="email">
          </div>
          <div class="form-group">
            <label for="password1">비밀번호 :</label>
            <input type="password" id="password1" v-model.trim="password1">
          </div>
          <div class="form-group">
            <label for="nickname">닉네임 :</label>
            <input type="text" id="nickname" v-model.trim="nickname">
          </div>
          <div class="form-group">
            <label for="gender">성별 :</label>
            <input type="text" id="gender" v-model.trim="gender">
          </div>
          <div class="form-group">
            <label for="phone">전화번호 :</label>
            <input type="tel" id="phone" v-model.trim="phone">
          </div>
          <div class="form-group">
            <label for="birthday">생일 :</label>
            <input type="date" id="birthday" v-model.trim="birthday">
          </div>
          <button type="submit" class="signup-button">가입하기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/api/counter'
import axios from 'axios';

const store = useCounterStore()
const name = ref(null)
const email = ref(null)
const password1 = ref(null)
const nickname = ref(null)
const gender = ref(null)
const phone = ref(null)
const birthday = ref(null)

// const signUp = function () {
//   const payload = {
//     name: name.value,
//     email: email.value,
//     password: password1.value,
//     nickname: nickname.value,
//     sex: gender.value,
//     phoneNumber: phone.value,
//     birthDate: birthday.value
//   }
//   store.signUp(payload)
// }
const signUp = function () {
  const formattedBirthday = birthday.value.split('-').join('');
  console.log('생일:', formattedBirthday); // 콘솔에 가공된 생일 값 출력
  const formattedGender = gender.value === '남' ? 0 : 1;
  console.log('성별:', formattedGender); // 콘솔에 가공된 성별 값 출력
  console.log('폰넘버:', phone.value)
  const payload = {
    name: name.value,
    email: email.value,
    password: password1.value,
    nickname: nickname.value,
    sex: formattedGender,
    phoneNumber: phone.value,
    birthDate: formattedBirthday
  }
  store.signUp(payload)
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 80px;
}

.signup-box {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

.signup-img {
  display: block;
  margin: 0 auto 20px;
  max-width: 100%;
}

.signup-form .form-group {
  margin-bottom: 20px;
}

.signup-form label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.signup-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
}

.signup-button {
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

.signup-button:hover {
  background-color: #0d8bf9;
}
</style>
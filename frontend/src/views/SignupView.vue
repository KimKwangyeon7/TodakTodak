<template>
  <div>
    <div class="signup-container">
      <div class="signup-box">
        <form @submit.prevent="signUp" class="signup-form">
          <!-- 추가된 부분 -->
          <div class="form-group">
            <div>
              <label for="name">이름 :</label>
            </div>
            <input type="text" id="name" v-model.trim="name" @input="updateUser">
          </div>
          <div class="form-group">
            <div>
              <label for="email">이메일 :</label>
            </div>
            <input type="email" id="email" v-model.trim="email" @input="updateUser">
          </div>
          <div class="form-group">
            <div>
              <label for="password1">비밀번호 :</label>
            </div>
            <input type="password" id="password1" v-model.trim="password" @input="updateUser">
          </div>
          <div class="form-group">
            <div>
              <label for="nickname">닉네임 :</label>
            </div>
            <input type="text" id="nickname" v-model.trim="nickname" @input="updateUser">
          </div>
          <div class="form-group">
            <div>
              <label for="gender">성별 :</label>
            </div>
            <input type="text" id="gender" v-model.trim="gender" @input="updateUser">
          </div>
          <div class="form-group">
            <div>
              <label for="phone">전화번호 :</label>
            </div>
            <input type="tel" id="phone" v-model.trim="phone" @input="updateUser">
          </div>
          <div class="form-group">
            <div>
              <label for="birthday">생일 :</label>
            </div>
            <input type="date" id="birthday" v-model.trim="birthday" @input="updateUser">
          </div>
          <!-- 기존 부분 유지 -->
          <input type="submit" value="가입하기" class="signup-button" @click="registerMember">
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useMemberStore } from '@/stores/auth'
import axios from 'axios';
import { signup } from "@/api/member"
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const store = useMemberStore();

const name = ref("")
const email = ref("")
const password = ref("")
const nickname = ref("")
const gender = ref("")
const phone = ref("")
const birthday = ref("")

const user = ref({
 name: "",
 email: "",
 password: "",
 nickname: "",
 sex: "",
 phoneNumber: "",
 birthDate: "",
});

const updateUser = () => {
  user.value = {
    name: name.value,
    email: email.value,
    password: password.value,
    nickname: nickname.value,
    sex: gender.value,
    phoneNumber: phone.value,
    birthDate: birthday.value,
  };
};

function registerMember() {
  const formattedGender = gender.value === '남' ? 0 : 1;
  user.value = {
    name: name.value,
    email: email.value,
    password: password.value,
    nickname: nickname.value,
    sex: formattedGender,
    phoneNumber: phone.value,
    birthDate: birthday.value,
  };
  signup(
    user.value,
    (response) => {
      let msg = '회원등록 중 문제 발생했습니다.'
      if (response.status == 200) msg = "회원가입이 완료되었습니다.";
      alert(msg);
      router.push({ name: "main" });
    },
    (error) => console.error(error)
  )
}

</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
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
</style>@/records.js/auth
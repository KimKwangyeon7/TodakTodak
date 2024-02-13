<template>
  <div>
    <div class="singupbox">
      <div style="display: flex; border-radius: 10px; color: black; background-color: aliceblue; align-items: center; justify-content: center;" class="z-2">
        <form @submit.prevent="signUp">
          <!-- 추가된 부분 -->
          <div class="containtext">
            <div>
              <label for="name">이름 :</label>
            </div>
            <input type="text" id="name" v-model.trim="name" @input="updateUser">
          </div>
          <div class="containtext">
            <div>
              <label for="email">이메일 :</label>
            </div>
            <input type="email" id="email" v-model.trim="email" @input="updateUser">
          </div>
          <div class="containtext">
            <div>
              <label for="password1">비밀번호 :</label>
            </div>
            <input type="password" id="password1" v-model.trim="password" @input="updateUser">
          </div>
          <div class="containtext">
            <div>
              <label for="nickname">닉네임 :</label>
            </div>
            <input type="text" id="nickname" v-model.trim="nickname" @input="updateUser">
          </div>
          <div class="containtext">
            <div>
              <label for="gender">성별 :</label>
            </div>
            <input type="text" id="gender" v-model.trim="gender" @input="updateUser">
          </div>
          <div class="containtext">
            <div>
              <label for="phone">전화번호 :</label>
            </div>
            <input type="tel" id="phone" v-model.trim="phone" @input="updateUser">
          </div>
          <div class="containtext">
            <div>
              <label for="birthday">생일 :</label>
            </div>
            <input type="date" id="birthday" v-model.trim="birthday" @input="updateUser">
          </div>
          <!-- 기존 부분 유지 -->
          <input style="border-radius: 5px; margin-left: 55px;" 
          type="submit" value="가입하기" @click="registerMember">
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
  console.log(formattedGender);
  user.value = {
    name: name.value,
    email: email.value,
    password: password.value,
    nickname: nickname.value,
    sex: formattedGender,
    phoneNumber: phone.value,
    birthDate: birthday.value,
  };
  console.log("회원 등록하자 ㅎㅎ", user.value)
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

<style>
.singupbox {
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
  width: 60%;
  border-radius: 3px;
}

.containtext > div {
  width: 150px;
  text-align: end;
}
</style>
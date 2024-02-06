<template>
<<<<<<< HEAD
    <div>
      <div class="singupbox"  >
  
        <div style="display: flex; border-radius: 10px; color: black ; background-color: aliceblue; align-items: center; justify-content: center;" class="z-2">
          <img src="@/assets/happycat.gif" alt="logo" style=" width: auto; height: 350px; border-radius: 10px;">
          <form @submit.prevent="signUp" >
            <div class="containtext">
              <div>
                <label for="username">username :    </label>
              </div>
              <input type="text" id="username" v-model.trim="username"> 
            </div>
            <div class="containtext">
              <div>
                <label for="password1">password : </label>
              </div>
              <input type="password" id="password1" v-model.trim="password1">
            </div>
            <div class="containtext">
              <div>
                <label for="password2">비밀번호 확인 :  </label>
              </div>
              <input type="password" id="password2" v-model.trim="password2">
            </div>
            <input style="border-radius: 5px; margin-left: 55px ; " type="submit" value="가입하기">
          </form>
        </div>
      </div>
    </div>
    
    
  
  </template>
  
  <script setup>        
    import { ref } from 'vue'
    import { useCounterStore } from '@/stores/counter'
    import axios from 'axios';
    
    const store = useCounterStore()
    const username = ref(null)
    const password1 = ref(null)
    const password2 = ref(null)
    
    const signUp = function () {
      const payload = {
        username: username.value,
        password1: password1.value,
        password2: password2.value
      }
      store.signUp(payload)
    }
    
    
    
    </script>
    
    <style>
   .singupbox{
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
    
=======
  <div>
    <div class="singupbox">
      <div style="display: flex; border-radius: 10px; color: black; background-color: aliceblue; align-items: center; justify-content: center;" class="z-2">
        <img src="@/assets/happycat.gif" alt="logo" style="width: auto; height: 350px; border-radius: 10px;">
        <form @submit.prevent="signUp">
          <!-- 추가된 부분 -->
          <div class="containtext">
            <div>
              <label for="name">이름 :</label>
            </div>
            <input type="text" id="name" v-model.trim="name">
          </div>
          <div class="containtext">
            <div>
              <label for="email">이메일 :</label>
            </div>
            <input type="email" id="email" v-model.trim="email">
          </div>
          <div class="containtext">
            <div>
              <label for="password1">비밀번호 :</label>
            </div>
            <input type="password" id="password1" v-model.trim="password1">
          </div>
          <div class="containtext">
            <div>
              <label for="nickname">닉네임 :</label>
            </div>
            <input type="text" id="nickname" v-model.trim="nickname">
          </div>
          <div class="containtext">
            <div>
              <label for="gender">성별 :</label>
            </div>
            <input type="text" id="gender" v-model.trim="gender">
          </div>
          <div class="containtext">
            <div>
              <label for="phone">전화번호 :</label>
            </div>
            <input type="tel" id="phone" v-model.trim="phone">
          </div>
          <div class="containtext">
            <div>
              <label for="birthday">생일 :</label>
            </div>
            <input type="date" id="birthday" v-model.trim="birthday">
          </div>
          <!-- 기존 부분 유지 -->
          <input style="border-radius: 5px; margin-left: 55px;" type="submit" value="가입하기">
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';

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
>>>>>>> sh

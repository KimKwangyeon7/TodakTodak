<template>

    <div>
    <div class="loginbox"  >

      <div style="display: flex; border-radius: 10px; color: black ; background-color: aliceblue; align-items: center; justify-content: center;" class="z-2">
        <img src="@/assets/sleepcat.gif" alt="logo" style=" width: auto; height: 350px; border-radius: 10px;">
        <form @submit.prevent="logIn" >
          <div class="containtext">
            <div>
<<<<<<< HEAD
              <label for="username">username :    </label>
            </div>
            <input type="text" name="username" id="username" v-model.trim="username"> 
=======
              <label for="email">email :    </label>
            </div>
            <input type="text" name="email" id="email" v-model.trim="email"> 
>>>>>>> sh
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
  import { ref } from 'vue'
<<<<<<< HEAD
  import { useCounterStore } from '@/stores/counter'
  
  const store = useCounterStore()
  const username = ref(null)
=======
  
  const email = ref(null)
>>>>>>> sh
  const password = ref(null)
  
  const logIn = function () {
    const payload = {
<<<<<<< HEAD
      username: username.value,
=======
      email: email.value,
>>>>>>> sh
      password: password.value
    }
    store.logIn(payload)
  }


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
  
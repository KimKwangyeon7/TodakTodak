<template>
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
    
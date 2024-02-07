<template>
    <div>
      <label for="password">비밀번호:</label>
      <input v-model="password" type="password" id="password" required>
      <button @click="enterRoom">입장</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const password = ref('')
  
  const enterRoom = () => {
    // 비밀번호를 사용하여 채팅방에 입장하는 로직을 추가
    // 비밀번호가 맞다면 화상 채팅방으로 이동하거나, 적절한 처리를 수행
  }
  </script>
  
  <style scoped>
  /* 필요한 스타일을 추가할 수 있습니다. */
  </style>
  
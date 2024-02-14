<template>
    <div>
      <h2>추천 사용자</h2>
      <ul>
        <li v-for="user in recommendedUsers" :key="user.id">
          {{ user.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getRandomUsers } from '@/api/friend'
  
  const recommendedUsers = ref([]);
  
  onMounted(async () => {
    try {
      // 무작위로 3명의 사용자를 추천합니다.
      await getRandomUsers(3, (users) => {
        recommendedUsers.value = users;
      }, (error) => {
        console.error('사용자 추천을 가져오는 도중 에러가 발생했습니다:', error);
      });
    } catch (error) {
      console.error('사용자 추천을 가져오는 도중 에러가 발생했습니다:', error);
    }
  });
  </script>
  
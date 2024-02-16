<template>
    <div class="goal-success-rate">
      <p class="goal-success-rate-title">목표별 성취율</p>
  
      <!-- 각 목표에 대한 성취율을 동적으로 출력 -->
      <div v-for="(goal, index) in goals" :key="index" class="goal-item">
        <p class="goal-name">{{ goal.name }}</p>
        <p class="success-rate">{{ goal.successRate }}%</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'

  const goals = ref([
    { name: '정보처리기사 자격증 획득', successRate: 80 },
    { name: '삼성전자 취업', successRate: 60 },
    { name: '공동 프로젝트 앱 완성', successRate: 70 },
    // 추가 목표는 필요에 따라 계속해서 추가
  ]);
  </script>
  
  <style scoped>
  .goal-success-rate {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    border-radius: 24px;
    background-color: #EAF3F9;
    box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
  }
  
  .goal-success-rate-title {
    font-size: 25px;
    margin-top: 20px;
    margin-right: 180px;
  }
  
  .goal-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
  }
  
  .goal-name {
    font-size: 18px;
    font-weight: bold;
  }
  
  .success-rate {
    font-size: 16px;
    color: #4CAF50; /* 성취율이면 초록색으로 변경할 수 있습니다. */
  }
  </style>
  
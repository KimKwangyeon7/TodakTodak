<template>
  <div class="goal-success-rate">
    <p class="goal-success-rate-title">월 별 성취율</p>

    <!-- 현재 선택된 목표의 월 별 성취율을 수평 막대 그래프로 동적으로 출력 -->
    <div class="goal-chart">
      <div class="goal-item">
        <p class="goal-name">{{ currentGoal.name }}</p>
        <div class="progress-bar">
          <div class="progress" v-for="(rate, index) in currentGoal.successRate" :key="index" :style="{ width: rate + '%' }">
            {{ rate }}%
          </div>
        </div>
      </div>
    </div>

    <!-- 좌우 화살표로 목표를 변경할 수 있는 슬라이더 -->
    <div class="slider">
      <button @click="prevGoal" :disabled="currentGoalIndex === 0">←</button>
      <button @click="nextGoal" :disabled="currentGoalIndex === goals.length - 1">→</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const goals = ref([
  { name: '정보처리기사 자격증 획득', successRate: [80, 70, 90] },
  { name: '삼성전자 취업', successRate: [60, 50, 70] },
  { name: '공동 프로젝트 앱 완성', successRate: [70, 80, 60] },
  // 추가 목표는 필요에 따라 계속해서 추가
]);

const currentGoalIndex = ref(0); // 현재 선택된 목표의 인덱스

function prevGoal() {
  if (currentGoalIndex.value > 0) {
    currentGoalIndex.value--;
  }
}

function nextGoal() {
  if (currentGoalIndex.value < goals.value.length - 1) {
    currentGoalIndex.value++;
  }
}

const currentGoal = computed(() => {
  return goals.value[currentGoalIndex.value];
});
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
}

.goal-chart {
  width: 80%;
  margin-top: 20px;
}

.goal-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.goal-name {
  font-size: 18px;
  font-weight: bold;
}

.progress-bar {
  width: 100%; /* 막대의 너비 설정 */
  height: 40px; /* 그래프의 높이 설정 */
  background-color: #ddd;
}

.progress {
  height: 100%;
  background-color: #4CAF50; /* 성취율에 따라 색상 변경 가능 */
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.progress-bar .progress {
  color: white;
  padding-left: 5px;
}

.slider {
  margin-top: 20px;
}

.slider button {
  font-size: 20px;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  border: none;
  background-color: #ddd;
}

.slider button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

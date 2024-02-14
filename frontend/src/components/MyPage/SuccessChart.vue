<template>
  <div class="goal-success-rate">
    <div class="goal-success-rate-title">월 별 진행률</div>

    <!-- Chart.js를 사용하여 현재 선택된 목표의 월 별 성취율을 수평 막대 그래프로 동적으로 출력 -->
    <div class="goal-chart">
      <canvas id="goalChart"></canvas>
    </div>

    <!-- 좌우 화살표로 목표를 변경할 수 있는 슬라이더 -->
    <div class="slider">
      <button class='btn' @click="prevGoal" :disabled="currentGoalIndex === 0">
        <img src="@/assets/voice/arrow-left.png" alt=""> 
      </button>
      <button class='btn' @click="nextGoal" :disabled="currentGoalIndex === goals.length - 1">
        <img src="@/assets/voice/arrow-right.png" alt="">
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const goals = ref([
  { name: '정보처리기사 자격증 획득', successRate: [20, 70, 90] },
  { name: '삼성전자 취업', successRate: [30, 50, 70] },
  { name: '공동 프로젝트 앱 완성', successRate: [70, 80, 90] },
  // 추가 목표는 필요에 따라 계속해서 추가
]);

const currentGoalIndex = ref(0);

const currentGoal = computed(() => {
  return goals.value[currentGoalIndex.value];
});

let chartInstance = null;

onMounted(() => {
  updateChart();
});

function prevGoal() {
  if (currentGoalIndex.value > 0) {
    currentGoalIndex.value--;
    updateChart();
  }
}

function nextGoal() {
  if (currentGoalIndex.value < goals.value.length - 1) {
    currentGoalIndex.value++;
    updateChart();
  }
}

function updateChart() {
  if (chartInstance) {
    chartInstance.destroy();
  }
  const ctx = document.getElementById('goalChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: currentGoal.value.successRate.map((_, index) => `${index + 1}월`),
      datasets: [{
        label: currentGoal.value.name,
        data: currentGoal.value.successRate,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'x',
      scales: {
        y: {
          beginAtZero: true
        }
      },
      aspectRatio: 2,
    }
  });
}
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
  width: 100%;
  margin-top: 20px;
}

.slider {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 5px;
}

.slider button {
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
}

.slider button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

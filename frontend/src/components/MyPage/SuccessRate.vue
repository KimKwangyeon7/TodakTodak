<template>
    <div class="goal-success-rate">
      <div class="goal-success-rate-title">목표 별 성취율</div>
      <!-- Chart.js를 사용하여 현재 선택된 목표의 성공률과 실패율을 도넛 차트로 출력 -->
      <div class="goal-chart">
        <canvas id="successRateChart"></canvas>
      </div>

      <!-- 이전/다음 목표 버튼 추가 -->
      <div class="goal-navigation">
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
import { ref, computed, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'
import { getTodosSuccessRateByDay } from '@/api/rate'
import { getGoalList } from '@/api/goals'

Chart.register(...registerables)

onMounted(() => {
  fetchGoalList()
  todosSuccessRateByDay();
  
});

const todosSuccessRate = new Map()
const todosSuccessRates = ref({}); // 각 id별 성취율을 저장할 객체


const todosSuccessRateByDay = (firstGoalId) => {
  // API 호출
  getTodosSuccessRateByDay(
    ({ data }) => {
      todosSuccessRate.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};
// 오늘
const nowDate = new Date()
const month = nowDate.getMonth()

const goalList = ref(null)
const arrayGoalListId = ref([])



const fetchGoalList = () => {
  // API 호출
  getGoalList(
    ({ data }) => {      
      goalList.value = data;
      goalList.value.forEach(item => {
        arrayGoalListId.value.push(item.id);
    });

    },
    (error) => {
      console.log(error);
    }
  );
};



const goals = ref([
  { name: '정보처리기사 자격증 획득', successRate: 70 },
  { name: '삼성전자 취업', successRate: 60 },
  { name: '공동 프로젝트 앱 완성', successRate: 70 },
  // 추가 목표는 필요에 따라 계속해서 추가
])

const currentGoalIndex = ref(0)

const currentGoal = computed(() => {
  return goals.value[currentGoalIndex.value]
})

let chartInstance = null

// 차트를 초기화하고 업데이트하는 함수
const initChart = () => {
  const ctx = document.getElementById('successRateChart').getContext('2d')
  const successRate = currentGoal.value.successRate
  const unsuccessRate = 100 - successRate

  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['완료', '미완료'],
      datasets: [{
        label: '비율',
        data: [successRate, unsuccessRate],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: currentGoal.value.name
        }
      }
    }
  })
}

// 컴포넌트가 마운트될 때 차트를 처음 그립니다.
onMounted(initChart)

// currentGoal의 변화를 감시하여 차트를 업데이트합니다.
watch(currentGoal, initChart)

// 이전/다음 목표를 변경하는 로직은 동일하게 유지
const prevGoal = () => {
  if (currentGoalIndex.value > 0) {
    currentGoalIndex.value--
  }
}

const nextGoal = () => {
  if (currentGoalIndex.value < goals.value.length - 1) {
    currentGoalIndex.value++
  }
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

.goal-navigation {
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 5px;
}

.goal-navigation button {
  padding: 10px 20px;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
}

.goal-navigation button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
  
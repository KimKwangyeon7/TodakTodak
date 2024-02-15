<template>
  <div>
    <div class="habit">습관</div>
  <!-- 모달 -->
  <div class="black-bg" v-if="is_modal_valid">
    <component :is="activeModal" :item="currentItem" @close-modal="closeModal" />
  </div>


  <!-- 습관리스트 -->
  <div class="todo-section">
    <div class="todo-date">
      <span>{{ today }}</span>
      <!-- Habit 생성버튼 -->
      <button class="add-button" @click="openModal('AddHabit')">+</button>
    </div>
    <div class="todo-items">
      <div class="todo-item" v-for="habit in habits" :key="habit.id">
        {{ habit.content }}
        <span @click="openModal('HabitDetail', habit)" class="goal-content">{{ habit.habitContent }}</span>
        <!-- <input type="checkbox"> -->
      </div>
    </div>
  </div>
</div>
</template>

<script>

import HabitDetail from '@/components/Habit/HabitDetail.vue'
import AddHabit from '@/components/Habit/AddHabit.vue'

import { getHabitList, getHabitDetail } from '@/api/habits'

export default {

  name: 'App',
  data() {
    return {
      habits: [],
      is_modal_valid: false,
      activeModal: null,
      today: '', 
      currentItem: null,
    }
  },
  components: {
      AddHabit,   
      HabitDetail,
  },
  methods: {
    // handleHabitAdded(habitData) {
    // console.log('Received habit data:', habitData);
    // // 받은 데이터를 사용하여 무언가를 수행
    // },
    async openModal(component, itemData = null) {

      if (component === 'HabitDetail' && itemData) {
        try {
          const detailedHabit = await getHabitDetail(itemData.id)
          this.currentItem = detailedHabit
        } catch (error) {
          console.error('Error fetching habit detail:', error);
          return;
        }
      }

      this.is_modal_valid = true;
      this.activeModal = component;
      this.currentItem = itemData;
    },
    fetchHabits() {
      getHabitList(
        ({ data }) => {
          console.log('습관 리스트 목록')
          console.log(data)
          this.habits = data
        },
        (error) => {
          console.log(error)
        }
      )
    },

    closeModal() {
      this.is_modal_valid = false
      this.activeModal = null
    },
  },
  mounted() {
    this.fetchHabits()
  }
}
</script>

<style scoped>
.habit {
font-size: 25px;
}

/* 상단 바 스타일링 */
.top-bar {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
background-color: #ffffff;
}

.quote {
font-size: 10px;
}


/* 할 일 목록 스타일링 */
.todo-section {
background-color: #EAF3F9; 
border-radius: 20px; 
padding: 15px;
margin: 10px 0;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.todo-date {
font-weight: bold;
margin-bottom: 5px;
text-align: left;
display: flex;
justify-content: space-between; /* 요일과 버튼을 각각 왼쪽과 오른쪽에 배치 */
align-items: center; /* 세로 중앙 정렬 */
}

.add-button {
font-size: 20px;
background-color: #EAF3F9;
color: #000; /* 검정색 텍스트 색상 */
border: none;
border-radius: 50%;
cursor: pointer;
padding: 5px; /* 내용물과 버튼 사이의 간격 조절을 위한 패딩 */
}


.todo-item {
display: flex;
align-items: center;
justify-content: space-between; /* 체크박스를 오른쪽으로 이동 */
}

.todo-item input[type="checkbox"] {
margin-right: 5px;
}

/* 하단 네비게이션 바 스타일링 */
.bottom-nav {
position: fixed;
bottom: 0;
left: 50%;
transform: translateX(-50%);
width: 100%;
display: flex;
justify-content: space-around;
background-color: #f3f3f3;
padding: 10px 0;
}

/* 모달 스타일링 */
.black-bg {
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
position: fixed;
display: flex;
align-items: center;
justify-content: center;
z-index: 2;
top: 0;
left: 0;
}

.color-bar {
width: 5px; /* Adjust the width of the color bar */
height: 15px; /* Adjust the height of the color bar */
margin-right: 10px; /* Space between the bar and the content */
}

.color-circle{
width: 10px;
height: 10px;
border-radius: 50%;
margin-right: 10px;
display: inline-block;
}

.goal-content {
flex-grow: 1;
text-align: left;
margin-right: 10px; /* Space before the checkbox */
}

input[type="checkbox"] {
margin-left: auto; /* Push the checkbox to the far right */
}
</style>
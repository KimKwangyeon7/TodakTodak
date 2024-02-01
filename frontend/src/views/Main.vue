<template>
  <div>

  <!-- 모달 -->
  <div class="black-bg" v-if="is_modal_valid">
    <component :is="activeModal" @close-modal="closeModal" />
  </div>

  <!-- 명언 -->
  <div class="top-bar">
    <div class="quote">"행복은 우연이 아니라 선택이다"</div>
    <div>짐  론</div>
  </div>

  <!-- 투두리스트 -->
  <div class="todo-section">
    <div class="todo-date">
      <span>{{ today }}</span>
      <!-- Todo 생성버튼 -->
      <button class="add-button" @click="openModal('AddTodo')">+</button>
    </div>
    <div class="todo-items">
      <div class="todo-item" v-for="(todo, index) in todoItems" :key="index">
        <label @click="openModal('TodoDetail', todo)" for="todo1">{{ todo.title }}</label>
        <input type="checkbox">
      </div>
      <div class="todo-item">
        <label @click="openModal('TodoDetail')" for="todo2">운동하기</label>
        <input type="checkbox">
      </div>
    </div>
  </div>
  
  <!-- 목표 -->
  <!-- 원래 목표는 todo 말고 goal이라고 속성값을 따로 해야 하는데, 
    어차피 동일한 것이고 귀찮으니 todo로 유지 -->
  <div class="todo-section">
    <div class="todo-date">
     <div style="margin-bottom: 5px; margin-top: 5px;">목표</div>
    </div>
    <div class="todo-items">
      <div class="todo-item">
        <label @click="openModal('GoaDetail')" for="todo1">약먹기</label>
        <input type="checkbox">
      </div>
      <div class="todo-item">
        <label @click="openModal('GoalDetail')" for="todo2">밥먹기</label>
        <input type="checkbox">
      </div>
    </div>
    <div class="todo-item" v-for="goal in goals" :key="goal.id">
      <div class="color-circle" :style="{ backgroundColor: goal.color }"></div>
      <span @click="openModal('GoalDetail', goal)" class="goal-content">{{ goal.goalContent }}</span>
      <input type="checkbox">
    </div>
    <button @click="clearGoals">테스트 차원에서 잠깐 목표 리셋 버튼 만듦</button>

  </div>
</div>
</template>

<script>
import { useGoalsStore } from '@/stores/goals' // Adjust the path if necessary


import Sidebar from '@/views/Sidebar.vue'
import TodoList from '@/views/Todo/TodoList.vue'
import TodoDetail from '@/views/Todo/TodoDetail.vue'
import GoalList from '@/views/Goal/GoalList.vue'
import GoalDetail from '@/views/Goal/GoalDetail.vue'
import AddTodo from '@/views/Todo/AddTodo.vue'

export default {
  name: 'App',
  computed: {
    goals() {
      const goalsStore = useGoalsStore();
      return goalsStore.goals;
    }
  },
  data() {
    return {
      is_modal_valid: false,
      activeModal: null,
      today: '', // 현재 날짜를 저장할 데이터 속성 추가
      todoItems: []
    }
  },
  components: {
    Sidebar,
    GoalList,
    GoalDetail,
    TodoList,
    TodoDetail,
    AddTodo,
  },
  methods: {
    openModal(component) {
      this.is_modal_valid = true
      this.activeModal = component
    },
    closeModal() {
      this.is_modal_valid = false
      this.activeModal = null
    },
    updateToday() {
      const now = new Date()
      const options = { month: '2-digit', day: '2-digit',  weekday: 'long' }
      this.today = now.toLocaleDateString('ko-KR', options)
    },
    addTodo(newTodo) {
      // 실제로는 여기에서 데이터베이스에 저장하거나 상태를 업데이트하는 등의 로직을 수행
      this.todoItems.push(newTodo);
    },
    clearGoals() {
      const goalsStore = useGoalsStore();
      goalsStore.resetGoals();
      localStorage.removeItem('my_goals'); // Clear persisted state if necessary
    },
  },
  mounted() {
    // 컴포넌트가 화면에 나타날 때 현재 날짜 업데이트
    this.updateToday()
  },
}
</script>

<style scoped>
/* 전체 앱 스타일링 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
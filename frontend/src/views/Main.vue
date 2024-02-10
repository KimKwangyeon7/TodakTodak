<template>
  <div v-if="authStore.isLogin">
    <!-- Modal -->
    <div class="black-bg" v-if="is_modal_valid">
      <component :is="activeModal" :item="currentItem" @close-modal="closeModal" />
    </div>
  
    <!-- Quote -->
    <div class="top-bar">
      <div class="quote">"행복은 우연이 아니라 선택이다"</div>
      <div>짐 론</div>
    </div>
  
    <!-- Todo List -->
    <div class="todo-section">
      <div class="todo-date">
        <span>{{ today }}</span>
        <button class="add-button" @click="openModal('AddTodo')">+</button>
      </div>
      <div class="todo-items">
        <div class="todo-item" v-for="todo in todos" :key="todo.id">
          <div class="color-bar" :style="{ backgroundColor: getGoalColor(todo) }"></div>
          <span @click="openModal('TodoDetail', todo)" class="goal-content">{{ todo.todoTitle }}</span>
          <input type="checkbox">
        </div>
      </div>
    </div>
    
    <!-- Goals -->
    <div class="todo-section">
      <div class="todo-date">
        <div style="margin-bottom: 5px; margin-top: 5px;">목표</div>
      </div>
      <div class="todo-item" v-for="goal in goals" :key="goal.id">
        <div class="color-circle" :style="{ backgroundColor: goal.color }"></div>
        <span @click="openModal('GoalDetail', goal)" class="goal-content">{{ goal.goalContent }}</span>
        <input type="checkbox">
      </div>
    </div>
  </div>
</template>

<script>
import { getGoalList, getGoalDetail } from '@/api/goals';
import { getTodoList, getTodoDetail } from '@/api/todos';
import { useAuthStore } from '@/stores/auth'

import TodoDetail from '@/components/Todo/TodoDetail.vue'
import AddTodo from '@/components/Todo/AddTodo.vue'
import GoalDetail from '@/components/Goal/GoalDetail.vue'

export default {
  name: 'App',
  data() {
    return {
      goals: [],
      todos: [],
      is_modal_valid: false,
      activeModal: null,
      today: '',
      currentItem: null,
    };
  },
  setup() {
    const authStore = useAuthStore()

    return {
      authStore,
    }
  },
  components: {
    GoalDetail,
    TodoDetail,
    AddTodo,
  },  
  methods: {
    async openModal(component, itemData = null) {
      if (component === 'GoalDetail' && itemData) {
        try {
          const detailedGoal = await getGoalDetail(itemData.id);
          this.currentItem = detailedGoal;
        } catch (error) {
          console.error('Error fetching goal detail:', error);
          return;
        }
      } else if (component === 'TodoDetail' && itemData) {
        try {
          const detailedTodo = await getTodoDetail(itemData.id);
          this.currentItem = detailedTodo; 
        } catch (error) {
          console.error('Error fetching todo detail:', error);
          return;
        }
      }
      else if (component === 'AddTodo') {
        try {
          const goalList = await getGoalList();
          if (goalList.length === 0) {
            alert('최소 한 가지 목표를 먼저 설정하세요 :)');
            return;
          }
        } catch (error) {
          console.error('Error fetching goal list:', error);
          return;
        }
      } 
      
      this.is_modal_valid = true;
      this.activeModal = component;
      this.currentItem = itemData;
    },
    async fetchGoals() {
      try {
        this.goals = await getGoalList();
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    },
    async fetchTodos() {
      try {
        this.todos = await getTodoList();
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    },
    updateToday() {
      const now = new Date()
      const options = { month: '2-digit', day: '2-digit',  weekday: 'long' }
      this.today = now.toLocaleDateString('ko-KR', options)
    },
    getGoalColor(todo) {
      // 직접 this.goals 배열에서 목표를 찾습니다.
      const goal = this.goals.find(g => g.id === todo.goalId);
      return goal ? goal.color : 'defaultColor'; // Replace 'defaultColor' with a fallback color
    },
    closeModal() {
      this.is_modal_valid = false;
      this.activeModal = null;
    },
    // Other methods remain the same
  },

  mounted() {
    this.updateToday();
    this.fetchGoals();
    this.fetchTodos();
  },
};
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
}

.quote {
  font-size: 20px;
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
  
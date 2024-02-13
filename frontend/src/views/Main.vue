<template>
  <div>

  <!-- 모달 -->
  <div class="black-bg" v-if="is_modal_valid">
    <component :is="activeModal" :item="currentItem" @close-modal="closeModal" />
  </div>

  <!-- 명언 -->
  <div class="top-bar">
    <div class="quote">"행복은 우연이 아니라 선택이다"</div>
    <div class="quote">짐  론</div>
  </div>

    <TodoList :todoList="todoList" />
    <HabitList :habitList="habitList" />

    <div class="penguin">
      <img src="@/assets/penguin.jpg">
    </div>
  </div>
</template>

<script>
import { useGoalsStore } from '@/stores/goals' // Adjust the path if necessary
import { useTodosStore } from '@/stores/todos'
import { useAlarmsStore } from '@/stores/alarms'


// import Sidebar from '@/views/Sidebar.vue'
import TodoList from '@/views/Todo/TodoList.vue'
import HabitList from '@/views/Habit/HabitList.vue'


export default {
  components: {
      TodoList,
      HabitList,
  },
  data() {
    return {
      is_modal_valid: false,
      activeModal: null,
      today: '', // 현재 날짜를 저장할 데이터 속성 추가
      // todoItems: [],
      currentItem: null,
    }
  },
  components: {
    // Sidebar,
    GoalList,
    GoalDetail,
    TodoList,
    TodoDetail,
    AddTodo,
    HabitList,
  },
  methods: {
    openModal(component, itemData = null) {

      // Assuming the goals are related to todos, check if there are any goals when opening a TodoDetail
      if (component === 'AddTodo') {
        const goalsStore = useGoalsStore();

        // Now check if there are no goals
        if (goalsStore.goals.length === 0) {
          alert('최소 한 가지 목표를 먼저 설정하세요 :)');
          return; // Exit the function early if there are no goals
        }
      }

      // If all checks pass, then proceed to open the modal
      this.is_modal_valid = true;
      this.activeModal = component; //https://lab.ssafy.com/s10-webmobile1-sub2/S10P12C210/-/blob/back/src/main/java/com/ssafy/todak/goal/controller/GoalController.java?ref_type=heads
      this.currentItem = itemData;
    },
    closeModal() {
      this.is_modal_valid = false
      this.activeModal = null
    },
    // 김요한: addTodo.vue에서도 날짜를 가지고 오는 게 있는데,
    // 날짜 가져오는 것 관련해서 의논이 필요할 것 같습니다.
    updateToday() {
      const now = new Date()
      const options = { month: '2-digit', day: '2-digit',  weekday: 'long' }
      this.today = now.toLocaleDateString('ko-KR', options)
    },
    // addTodo(newTodo) {
    //   // 실제로는 여기에서 데이터베이스에 저장하거나 상태를 업데이트하는 등의 로직을 수행
    //   this.todoItems.push(newTodo);
    // },
    getGoalColor(todo) {
      const goalsStore = useGoalsStore();
      const goal = goalsStore.goals.find(g => g.id === todo.goalId);
      return goal ? goal.color : 'defaultColor'; // Replace 'defaultColor' with a fallback color
    },
    clearGoals() {
      const goalsStore = useGoalsStore();
      const todosStore = useTodosStore();
      const alarmsStore = useAlarmsStore()
      goalsStore.resetGoals();
      todosStore.resetTodos();
      alarmsStore.resetAlarms()
      localStorage.removeItem('my_goals'); // Clear persisted state if necessary
      localStorage.removeItem('my_todos'); // Clear persisted state if necessary
      localStorage.removeItem('my_alarms')
    },
  },
  mounted() {
    // 컴포넌트가 화면에 나타날 때 현재 날짜 업데이트
    this.updateToday()
  },
}
</script>

<style scoped>
.quote {
  font-size: 16px;
}

.penguin {
  position: fixed;
  bottom: 80px; 
  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
}

.penguin img {
  opacity: 0.5;
  width: 100%;
}
</style>

<template>
  <div v-if="authStore.isLogin">
    <!-- Modal -->
    <div class="black-bg" v-if="is_modal_valid">
      <component
        :is="activeModal"
        :item="currentItem"
        @close-modal="closeModal"
      />
    </div>

    <!-- Todo List -->
    <div class="todo-section">
      <div class="todo-date">
        <span style="font-weight: bold; font-size: 18px;">{{ today }}</span>
        <button class="list-button" @click="toggleTodoList">{{ showTodoList ? '∧' : '∨' }}</button>
        <button class="add-button" @click="openModal('AddTodo')">+</button>
      </div>
      <div v-if="showTodoList" class="todo-items">
        <div class="todo-item" v-for="todo in todos" :key="todo.id">
          <div
            class="color-bar"
            :style="{ backgroundColor: getGoalColor(todo) }"
          ></div>
          <span :class="{ 'completed': todo.checked }" @click="openModal('TodoDetail', todo)" class="goal-content">{{
            todo.title
          }}</span>
          <div v-if="todo.id">
            <input
              type="checkbox"
              v-model="todo.checked"
              @change="handleTodoCheckboxChange(todo)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Goals -->
    <div class="todo-section">
      <div class="todo-date">
        <div style="margin-bottom: 5px; margin-top: 5px; font-weight: bold; font-size: 18px;">
          목표
        </div>
        <button class="list-button" @click="toggleGoalList">{{ showGoalList ? '∧' : '∨' }}</button>
        <button class="add-button" @click="openAddGoalPage">+</button>
      </div>
      <div v-if="showGoalList" class="todo-items">
      <div class="todo-item" v-for="goal in goals" :key="goal.id">
        <div
          class="color-circle"
          :style="{ backgroundColor: goal.color }"
        ></div>
        <span @click="openModal('GoalDetail', goal)" class="goal-content">{{
          goal.content
        }}</span>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { getGoalList, getGoalDetail } from "@/api/goals";
import { getTodoList, getTodoDetail, isTodoCompleted } from "@/api/todos";
import { useMemberStore } from "@/stores/auth";
import { useTodoStore } from "@/stores/todoList";

import TodoDetail from "@/components/Todo/TodoDetail.vue";
import AddTodo from "@/components/Todo/AddTodo.vue";
import AddGoal from "@/components/Goal/AddGoal.vue";
import GoalDetail from "@/components/Goal/GoalDetail.vue";
import Habit from "@/views/Habit.vue";

export default {
  name: "App",
  data() {
    return {
      goals: [],
      todos: reactive([]),
      is_modal_valid: false,
      activeModal: null,
      today: "",
      currentItem: null,
      detailedTodo: null,
      showTodoList: true,
      showGoalList: true,
    };
  },
  setup() {
    const authStore = useMemberStore();
    const todoStore = useTodoStore();
    const addTodoToStore = (newTodo) => {
      todoStore.addTodo(newTodo);
      // Todo 추가 후 필요한 로직 처리 (예: 알림 표시, 폼 초기화 등)
    };
    return {
      authStore,
      addTodoToStore,
    };
  },
  components: {
    GoalDetail,
    TodoDetail,
    AddTodo,
    AddGoal,
    Habit,
  },
  methods: {
    convertTimeFormat(timeStr) {
  // 문자열에서 시간과 분을 추출 (예: "1900" -> "19", "00")
  const formattedHours = timeStr.substring(0, 2);
  const formattedMinutes = timeStr.substring(2);

  // "HH:MM" 형식의 문자열로 변환하여 반환
  return `${formattedHours}:${formattedMinutes}`;
},

    async openModal(component, itemData = null) {
      if (component === "GoalDetail" && itemData) {
        try {
          const detailedGoal = await getGoalDetail(itemData.id);
          this.currentItem = detailedGoal;
        } catch (error) {
          console.error("Error fetching goal detail:", error);
          return;
        }
      } else if (component === "TodoDetail" && itemData) {
        try {
          getTodoDetail(
            itemData.id,
            ({ data }) => {
              console.log("목표 리스트 목록");
              console.log('TodoData', data);
              if (data.time) {
            data.time = this.convertTimeFormat(data.time);
          }
          this.detailedTodo = data;
          this.currentItem = this.detailedTodo; 
          console.log('알람시간변경:', this.currentItem)
            },
            (error) => {
              console.log(error);
            }
          );
          this.currentItem = this.detailedTodo;
        } catch (error) {
          console.error("Error fetching todo detail:", error);
          return;
        }
      }
      this.is_modal_valid = true;
      this.activeModal = component;
      this.currentItem = itemData;
    },
    async openAddGoalPage() {
      this.$router.push('/goal');
    },
    fetchGoals() {
      // API 호출
      getGoalList(
        ({ data }) => {
          console.log("목표 리스트 목록");
          console.log(data);
          this.goals = data;
        },
        (error) => {
          console.log(error);
        }
      );
    },
    fetchTodos() {
      try {
        const now = new Date();
        // 연도, 월, 일 추출
        var year = now.getFullYear().toString();
        var month = (now.getMonth() + 1).toString();
        var day = now.getDate().toString();

        console.log(year);
        console.log(month);
        console.log(day);

        // 여기서 사용할 변수명 수정
        if (month < 10) {
          month = "0" + month;
        }

        if (day < 10) {
          day = "0" + day;
        }
        console.log();
        // 여기서 사용할 변수명 수정
        const todayString = year + "" + month + "" + day;

        getTodoList(
          todayString,
          ({ data }) => {
            console.log("투두리스트 목록");
            console.log(data);
            this.todos = data;
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    },

    updateToday() {
      const now = new Date();
      const options = { month: "2-digit", day: "2-digit", weekday: "long" };
      this.today = now.toLocaleDateString("ko-KR", options);
    },
    getGoalColor(todo) {
      // 직접 this.goals 배열에서 목표를 찾습니다.
      const goal = this.goals.find((g) => g.id === todo.goalId);
      return goal ? goal.color : "defaultColor"; // Replace 'defaultColor' with a fallback color
    },
    closeModal() {
      this.is_modal_valid = false;
      this.activeModal = null;
    },
    handleTodoCheckboxChange(todo) {
      // Checkbox가 변경될 때 호출되는 메서드
      console.log(`Todo ID ${todo.id}의 체크박스 상태 변경: ${todo.checked}`);
      isTodoCompleted(
        todo.id,
        ({ data }) => {
          console.log("투두리스트 체크표시 업데이트");
          console.log(data);

          // 배열에서 업데이트된 할 일의 인덱스 찾기
          const index = this.todos.findIndex((t) => t.id === todo.id);
          // 배열에서 할 일 업데이트
          if (index !== -1) {
            const todosRefs = toRefs(this.todos);
            todosRefs[index].value = data;
            // this.$set(this.todos, index, data); // $set을 사용하여 Vue.js 반응성 보장
            // this.todos = data;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    toggleTodoList() {
      this.showTodoList = !this.showTodoList;
    },
    toggleGoalList() {
      this.showGoalList = !this.showGoalList;
    },
    
  },
  mounted() {
    this.updateToday();
    this.fetchGoals();
    this.fetchTodos();
  },
};
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
}

/* 할 일 목록 스타일링 */
.todo-section {
  background-color: #eaf3f9;
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

.list-button {
  font-size: 20px;
  background-color: #eaf3f9;
  color: #000; /* 검정색 텍스트 색상 */
  border: none;
  border-radius: 50%;
  cursor: pointer;
  margin-left: auto;
  margin-bottom: 2px;
}

.add-button {
  font-size: 20px;
  background-color: #eaf3f9;
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

.color-circle {
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

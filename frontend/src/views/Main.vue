<template>
  <div v-if="authStore.isLogin" class="mt-5">
    <div>
      <!-- 명언 -->
      <div class="top-bar">
        <div class="quote">"행복은 우연이 아니라 선택이다"</div>
        <div class="quote">짐  론</div>
      </div>

      <!-- <Example :example="example" /> -->
      <TodoList :todoList="todoList" />
      <HabitList :habitList="habitList" />

      <div class="penguin">
        <img src="@/assets/penguin.jpg">
      </div>
    </div>
  </div>

  <div v-else>
    <div>
      <RouterLink :to="{ name: 'LoginView' }">Login</RouterLink>
      <RouterLink :to="{ name: 'SignUpView' }">SignUp</RouterLink>
    </div>
  </div>
  <RouterView />
</template>

<script>
import { getGoalList, getGoalDetail } from "@/api/goals";
import { getTodoList, getTodoDetail } from "@/api/todos";
import { useMemberStore } from "@/stores/auth";
import { useTodoStore } from '@/stores/todoList';

import TodoDetail from "@/components/Todo/TodoDetail.vue";
import AddTodo from "@/components/Todo/AddTodo.vue";
import GoalDetail from "@/components/Goal/GoalDetail.vue";
import Habit from "@/views/Habit.vue";
import TodoList from '@/components/Todo/TodoList.vue'
import HabitList from '@/components/Habit/HabitList.vue'
import { useMemberStore } from '@/stores/auth'

export default {
  components: {
      TodoList,
      HabitList,
      // Example,
  },
  data() {
      return {
        habitList: null,

      };
  },
  setup() {
    const authStore = useMemberStore()

    return {
      authStore,
    }
  },
  methods: {
    async fetchQuote() {
      try {
        const response = await fetch("/members/quote");
        if (!response.ok) {
          throw new Error("Failed to fetch quote");
        }
        const data = await response.json();
        if (!Array.isArray(data) || data.length !== 2) {
          throw new Error("Invalid quote data format");
        }
        this.randomQuote = data[0];
        this.quoteAuthor = data[1];
      } catch (error) {
        console.error("Error fetching quote:", error);
        this.quoteError = true; // 에러 발생 시 플래그 설정
      }
    },
    handleLoginClick() {
      console.log(this.authStore.isLogin);
      // 여기에서 로그인 상태 확인
    }
  }
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
@/records.js/auth
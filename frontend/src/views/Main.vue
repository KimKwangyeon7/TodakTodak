<template>
  <div v-if="authStore.isLogin" class="mt-5">
    <div>
      <TodoList :todoList="todoList" />
      <HabitList :habitList="habitList" />

      <div class="penguin">
        <img src="@/assets/penguin.jpg">
      </div>
    </div>
  </div>

  <div v-else>
    <!-- <div>
      <RouterLink :to="{ name: 'LoginView' }">Login</RouterLink>
      <RouterLink :to="{ name: 'SignUpView' }">SignUp</RouterLink>
    </div> -->
  </div>
  <RouterView />
</template>

<script>
import { getGoalList, getGoalDetail } from "@/api/goals";
import { getTodoList, getTodoDetail } from "@/api/todos";
import { useMemberStore } from "@/stores/auth";
import { useTodoStore } from '@/stores/todoList';

import TodoList from '@/components/Todo/TodoList.vue'
import Example from '@/components/Todo/example.vue'
import HabitList from '@/components/Habit/HabitList.vue'

export default {
  components: {
      TodoList,
      HabitList,
      Example,
  },
  data() {
      return {
        habitList: null,
        randomQuote: "", // 명언을 저장할 변수
        quoteAuthor: "", // 작가를 저장할 변수
        quoteError: false // 에러 여부를 나타내는 변수
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
  },
  mounted() {
    // 컴포넌트가 생성될 때 명언을 가져오도록 호출
    this.fetchQuote();
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
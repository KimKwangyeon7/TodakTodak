<template>
  <div v-if="authStore.isLogin" class="mt-5">
    <div>
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
import TodoList from '@/components/Todo/TodoList.vue'
import HabitList from '@/components/Habit/HabitList.vue'
import { useMemberStore } from '@/stores/auth'

export default {
  components: {
      TodoList,
      HabitList,
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

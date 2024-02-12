<template>
  <div>
    <!-- 명언 -->
    <div class="top-bar">
      <div class="quote">"행복은 우연이 아니라 선택이다"</div>
      <div class="quote">짐  론</div>
    </div>

    <TodoList :todoList="todoList" />
    <HabitList :habitList="habitList" />
  </div>
</template>

<script>
import TodoList from '@/views/Todo/TodoList.vue'
import HabitList from '@/views/Habit/HabitList.vue'

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
}
</script>

<style scoped>
.quote {
  font-size: 16px;
}
</style>

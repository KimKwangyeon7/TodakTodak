<template>
    <div class="m-3">
        <div class="habit">습관</div>
        <HabitList :habitList="habitList" />
    </div>
</template>

<script>
import HabitList from '@/views/Habit/HabitList.vue'

export default {
  components: {
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
.habit {
  font-size: 25px;
}

</style>
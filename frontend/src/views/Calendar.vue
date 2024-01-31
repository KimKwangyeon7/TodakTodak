<template>
  <DatePicker expanded v-model="date" @click:date="handleDateClick" />
</template>

<script>
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

export default {
  components: {
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
    handleDateClick(date) {
      // 날짜를 클릭했을 때 수행할 동작을 여기에 추가
      console.log('Selected date:', date);
      // 여기에서 상세 페이지로 이동하는 라우터 네비게이션 등을 구현
      this.$router.push({ name: 'CalendarDetail', params: { date } });
    },
  },
};
</script>

<style scoped>
/* 커스텀 스타일링 */
.vcal-header {
  background-color: #3498db;
  color: #ffffff;
}

.vcal-date:hover {
  background-color: #3498db;
  color: #ffffff;
}
</style>

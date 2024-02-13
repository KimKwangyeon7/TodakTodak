<template>
  <div class="calendar-wrapper m-3" style="margin-top: 70px;">
    <main class="calendar-body">
      <button class='btn' @click="$router.back()">
       <img src="@/assets/back.png" alt="">
      </button>
      <div class="calendar-weekdays">
        <div
          v-for="(date, index) in weekDate"
          :key="index"
          class="date"
          :class="{ 'bold': index < 7 }"
        >
          {{ date }}
        </div>
      </div>
      <div class="calendar-dates">
        <div
          v-for="(day, index) in weekDates"
          :key="index"
          class="date text-center"
        >
          <span class="day">{{ day }}</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Calendar',
  data() {
    return {
      selectedDate: this.$route.params.selectedDate,
      weekDates: [],
      weekDate: ['월', '화', '수', '목', '금', '토', '일']
    };
  },
  created() {
    this.calculateWeekDates();
    console.log('Selected Date:', this.selectedDate);
    console.log('Week Dates:', this.weekDates);
  },
  methods: {
    calculateWeekDates() {
  let selectedMoment = moment(this.selectedDate, 'YYYY-MM-DD');
  let startOfWeek = selectedMoment.clone().startOf('week');

  for (let i = 1; i < 8; i++) {
    let day = startOfWeek.clone().add(i, 'days');
    this.weekDates.push(day.format('D'));
  }
}
  }
};
</script>

<style scoped>
.calendar-wrapper {
  display: flex;
  margin: 2.5em 0;
  overflow: auto;
}

.calendar-body {
  width: 384px;
  height: 394px;
}

.calendar-body button {
  margin-bottom: 7px;
}

.calendar-weekdays {
  display: flex;
  margin-bottom: 1.25rem;
  color: #2091a2;
  font-size: 16px;
}

.calendar-weekdays .date {
  width: calc(100% / 7);
  font-size: 16px;
  line-height: 1.25;
  text-align: center;
  color: #2091a2;
}

.calendar-weekdays .date.bold {  /* Add this block */
  font-weight: bold;
}

.calendar-dates {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.date:hover {
  cursor: pointer;
}

.calendar-dates .date {
  font-weight: 200;
  padding: 0.25rem 0.5rem;
  position: relative;
  width: calc(100% / 7);
  margin-top: 1px;
}

.calendar-dates .date.blank {
  color: #949ba4;
}

.calendar-dates .date.today {
  background-color: #45b7c1;
  color: white !important;
}

.date.today:first-child,
:not(.today)+.today {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.date.today+.date.today+.date.today+.date.today+.date.today {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.calendar-dates .date.now {
  border: 1px solid #45b7c1;
  border-radius: 100px;
  color: #45b7c1;
  margin-top: -1px;
}
</style>

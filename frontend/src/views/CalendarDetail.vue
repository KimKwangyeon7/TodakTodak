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
          <div v-for="todo in weekTodos" :key="todo.id">
            <span>{{ todo.title }}</span>
          </div>
        </div>
        <ul>
          <li v-for="todo in todos" :key="todo.id">{{ todo.content }}</li>
        </ul>
      </div>
    </main>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/todoList';
import { ref, onMounted } from 'vue';
import { getTodoList } from '@/api/todos'
import { useRoute } from 'vue-router';

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

  setup() {
    const todos = ref([])
    const route = useRoute(); // 현재 라우트에 접근
    const selectedDate = ref(route.params.selectedDate || moment().format('YYYY-MM-DD')); // URL 파라미터에서 selectedDate 가져오거나 기본값 설정
    onMounted(async () => {
      
      try {
        const formattedDate = moment(selectedDate.value).format('YYYYMMDD')
        console.log('formattedDate:', formattedDate)
        const response = await getTodoList(formattedDate); // API 호출을 통해 Todo 목록을 가져옴
        todos.value = response; // 가져온 Todo 목록으로 로컬 상태 업데이트
        console.log('todos:', todos.value)
      } catch (error) {
        console.error('Error fetching todos:', error); // 에러 처리
      }
    });

    return {
      todos, // 템플릿에서 사용할 수 있도록 반환
    };
  },
  created() {
    this.calculateWeekDates();
    const todoStore = useTodoStore();
    todoStore.fetchTodos();
    console.log('Selected Date:', this.selectedDate);
    console.log('Week Dates:', this.weekDates);
  },
  computed: {
    // todos() {
    //   const todoStore = useTodoStore();
    //   console.log('todos', todoStore.todos)
    //   return todoStore.todos;
    // },
    weekTodos() {
    return this.todos.filter(todo => {
      // Todo 항목의 날짜가 현재 주의 날짜 배열(weekDates)에 포함되는지 확인
      const todoDate = moment(todo.date, 'YYYY-MM-DD');
      return this.weekDates.some(weekDate => {
        const weekDateMoment = moment(this.selectedDate, 'YYYY-MM-DD').startOf('week').add(weekDate - 1, 'days');
        return todoDate.isSame(weekDateMoment, 'day');
      });
    });
  },
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

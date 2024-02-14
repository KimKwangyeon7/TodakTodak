<template>
  <div class="black-bg" v-if="isModalValid">
      <component
        :is="activeModal"
        :item="currentItem"
        :formattedDate="formattedDate.valueOf"
        @close-modal="closeModal"
      />
    </div>
    
  <div class="calendar-wrapper m-3" style="margin-top: 70px;">
    <main class="calendar-body">
      <div class="button-container">
        <button class='btn' @click="$router.back()">
          <img src="@/assets/back.png" alt="">
        </button>
        
        <button class="add-button" @click="openModal('CalendarAddTodo')">+</button>
      </div>
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
        
        
      
      <div class="todo-section">
      
      <div class="todo-item" v-for="todo in todos" :key="todo.id" >
            <div
              class="color-circle"
              :style="{ backgroundColor: todo.color }"
            >
          </div>
            <span class="todo-content">
              {{ todo.content }}
            </span>
      </div>
    </div>

        <!-- <ul>
          <li v-for="todo in todos" :key="todo.id">{{ todo.content }}
            <span class="color-circle" :style="{ 'background-color': todo.color }"></span>
          </li>
        </ul> -->
      </div>
    </main>
  </div>
</template>

<script>
import moment from 'moment';

import { useTodoStore } from '@/stores/todoList';
import { ref, onMounted } from 'vue';
import { getTodoList } from '@/api/todos'
import { useRoute } from 'vue-router';


import moment from 'moment';
import CalendarAddTodo from './CalendarAddTodo.vue';
import apiClient from '@/api/todosApiClient';



export default {
  name: 'Calendar',
  data() {
    return {
      // 모달이 열려 있는지 여부
      currentItem: null,
      selectedDate: this.$route.params.selectedDate,
      weekDates: [],
      weekDate: ['월', '화', '수', '목', '금', '토', '일'],
      
    };
  },

  setup() {
    const todos = ref([]);
    const route = useRoute();
    const selectedDate = ref(route.params.selectedDate || moment().format('YYYY-MM-DD'));
    const formattedDate = ref('');
    const isModalValid = ref(false);
    const activeModal = ref(null);
    const currentItem = ref('')
    onMounted(async () => {
      formattedDate.value = moment(selectedDate.value).format('YYYYMMDD');
      try {
        const response = await getTodoList(formattedDate.value);
        todos.value = response;
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    });

    const openModal = (component) => {
      if (component === "CalendarAddTodo") {
        console.log('formattedDate in openModal:', formattedDate.value);
        isModalValid.value = true;
        activeModal.value = component;
        currentItem.value = { formattedDate: formattedDate.value }
        console.log('currentItem:', currentItem.value)
      }
    };

    const closeModal = () => {
      isModalValid.value = false;
      activeModal.value = null;
    };

    return {
      todos,
      formattedDate,
      isModalValid,
      activeModal,
      openModal,
      closeModal
    };
  },
  created() {
    this.calculateWeekDates();
    console.log('Selected Date:', this.selectedDate);
    console.log('Week Dates:', this.weekDates);
  },
  methods: {
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
  components: {
    CalendarAddTodo,
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
/* .calendar-wrapper {
  display: flex;
  margin: 2.5em 0;
  overflow: auto;
} */

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
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  
  align-content: flex-start; /* 자식 요소들을 상단에서부터 시작하도록 정렬 */
  height: auto; /* 높이를 자동으로 조정하여 모든 항목을 포함하도록 함 */
}

.calendar-dates .date {
  
  padding: 0.5rem; /* 패딩 추가 */
  text-align: center; /* 텍스트 가운데 정렬 */
  border-radius: 4px; /* 테두리 둥글게 */
  
  transition: background-color 0.3s, color 0.3s; /* 배경 및 글자 색상 전환 효과 */
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

.color-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  justify-content: center; /* 자식 요소를 수평 중앙으로 정렬 */
  align-items: center; /* 자식 요소를 수직 중앙으로 정렬 */
}

.todo-item {
  display: flex;
  align-items: flex-start; /* 자식 요소들을 컨테이너의 시작 부분에 정렬 */
  margin-bottom: 10px; /* 각 todo-item 사이의 여백 */
  word-wrap: break-word; /* 단어 단위로 줄바꿈 */
  justify-content: center; /* 자식 요소를 수평 중앙으로 정렬 */
  align-items: center; /* 자식 요소를 수직 중앙으로 정렬 */
  /* 또는 */
}

.todo-content {
  flex-grow: 1;
  
  text-align: left;
  margin-right: 10px; /* Space before the checkbox */
}
</style>

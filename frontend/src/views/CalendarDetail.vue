<template>
  <div class="black-bg" v-if="isModalValid">
    <component
      :is="activeModal"
      :item="currentItem"
      :formattedDate="formattedDate.valueOf"
      @close-modal="closeModal"
    />
  </div>

  <div class="calendar-wrapper m-3" style="margin-top: 70px">
    <main class="calendar-body">
      <div class="button-container">
        <button class="btn" @click="$router.back()">
          <img src="@/assets/back.png" alt="" />
        </button>

        <button class="add-button" @click="openModal('CalendarAddTodo')">
          +
        </button>
      </div>
      <div class="calendar-weekdays">
        <div
          v-for="(date, index) in weekDate"
          :key="index"
          class="date"
          :class="{ bold: index < 7 }"
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

        
        <!-- <ul>
          <li v-for="todo in todos" :key="todo.id">{{ todo.content }}
            <span class="color-circle" :style="{ 'background-color': todo.color }"></span>
          </li>
        </ul> -->
      </div>
      <div class="todo-section">
        <div class="todo-item" v-for="todo in todos" :key="todo.id">
          <div
            class="color-circle"
            :style="{ backgroundColor: todo.color }"
          ></div>
          <span class="todo-content">
            {{ todo.title }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { useTodoStore } from "@/stores/todoList";
import { ref, onMounted } from "vue";
import { getTodoList } from "@/api/todos";
import { useRoute } from "vue-router";

import moment from "moment";
import CalendarAddTodo from "./CalendarAddTodo.vue";

export default {
  name: "Calendar",
  data() {
    return {
      // 모달이 열려 있는지 여부
      currentItem: null,
      selectedDate: this.$route.params.selectedDate,
      weekDates: [],
      weekDate: ["월", "화", "수", "목", "금", "토", "일"],
    };
  },

  setup() {
    const todos = ref([]);
    const route = useRoute();
    const selectedDate = ref(
      route.params.selectedDate || moment().format("YYYY-MM-DD")
    );
    const formattedDate = ref("");
    const isModalValid = ref(false);
    const activeModal = ref(null);
    const currentItem = ref("");
    onMounted(async () => {
      formattedDate.value = moment(selectedDate.value).format("YYYYMMDD");
      try {
        getTodoList(
          formattedDate.value,
          ({ data }) => {
            todos.value = data;
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    });

    const openModal = (component) => {
      if (component === "CalendarAddTodo") {
        isModalValid.value = true;
        activeModal.value = component;
        currentItem.value = { formattedDate: formattedDate.value };
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
      closeModal,
    };
  },
  created() {
    this.calculateWeekDates();
    const todoStore = useTodoStore();
    todoStore.fetchTodos();
  },
  computed: {
    weekTodos() {
      return this.todos.filter((todo) => {
        // Todo 항목의 날짜가 현재 주의 날짜 배열(weekDates)에 포함되는지 확인
        const todoDate = moment(todo.date, "YYYY-MM-DD");
        return this.weekDates.some((weekDate) => {
          const weekDateMoment = moment(this.selectedDate, "YYYY-MM-DD")
            .startOf("week")
            .add(weekDate - 1, "days");
          return todoDate.isSame(weekDateMoment, "day");
        });
      });
    },
  },
  components: {
    CalendarAddTodo,
  },
  methods: {
    calculateWeekDates() {
      let selectedMoment = moment(this.selectedDate, "YYYY-MM-DD");
      let startOfWeek = selectedMoment.clone().startOf("week");

      for (let i = 1; i < 8; i++) {
        let day = startOfWeek.clone().add(i, "days");
        this.weekDates.push(day.format("D"));
      }
    },
  },
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

.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto 0; /* 상단 여백 조정 및 가운데 정렬 */
  overflow: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  border-radius: 8px; /* 테두리 둥글게 */
}

.calendar-body {
  width: 100%; /* 전체 너비 사용 */
  max-width: 500px; /* 최대 너비 설정 */
  background-color: #ffffff; /* 배경색 설정 */
  padding: 1rem; /* 패딩 추가 */
  max-height: 800px; /* 최소 높이 설정 */
}

.calendar-body button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem; /* 버튼 하단 여백 조정 */
  background: none; /* 버튼 배경 투명화 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 포인터로 변경 */
}

.calendar-weekdays {
  display: flex;
  margin-bottom: 1rem; /* 하단 여백 조정 */
  color: #2091a2; /* 주요 색상 설정 */
}

.calendar-weekdays .date {
  flex: 1; /* 평등하게 공간 분배 */
  text-align: center;
  padding: 0.5rem 0; /* 패딩 추가 */
}

.calendar-weekdays .date.bold {
  font-weight: bold; /* 폰트 굵게 */
}

.calendar-dates {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between; /* 날짜 간격을 균등하게 조정 */
  padding: 0 7px; /* 상하 여백은 0, 좌우 여백은 20px */
}

.calendar-dates .date {
  padding: 0.5rem; /* 패딩 추가 */
  text-align: center; /* 텍스트 가운데 정렬 */
  border-radius: 4px; /* 테두리 둥글게 */

  transition: background-color 0.3s, color 0.3s; /* 배경 및 글자 색상 전환 효과 */
}

.date:hover {
  background-color: #e8f0f2; /* 호버 시 배경색 변경 */
  color: #333; /* 호버 시 글자 색상 변경 */
}

.calendar-dates .date.today {
  background-color: #45b7c1; /* 오늘 날짜 배경색 */
  color: white; /* 오늘 날짜 글자색 */
  font-weight: bold; /* 오늘 날짜 굵게 */
}

.calendar-dates .date.now {
  border: 2px solid #45b7c1; /* 현재 시간 테두리 */
  color: #45b7c1; /* 현재 시간 글자색 */
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%; /* 컨테이너 너비를 최대로 설정 */
  margin-bottom: 1rem; /* 버튼 하단 여백 */
}

.btn,
.add-button {
  cursor: pointer; /* 커서 포인터로 변경 */
  background: none; /* 배경 투명화 */
  border: none; /* 테두리 제거 */
}

.add-button {
  font-size: 1.5rem; /* + 버튼의 글자 크기를 키움 */
  padding: 0.5rem 1rem; /* 패딩 추가로 버튼 크기 조정 */
  border-radius: 50%; /* 원형으로 만듬 */
  line-height: 1; /* 라인 높이 조정 */
  margin-left: auto; /* 왼쪽 자동 마진으로 오른쪽 정렬 */
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
  margin-left: 5px; /* Space before the checkbox */
  margin-top: 5px
}

.todo-section {
  margin-top: 20px;
  margin-left: 10px;
}
</style>
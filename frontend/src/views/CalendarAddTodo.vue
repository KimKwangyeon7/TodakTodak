<template>
  <div class="modal-content" style="border-radius: 10px;">

    <div class="modal-title">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
    </div>
    <form>

      <!-- 상속 목표 -->
      <div class="form-group">
        <label for="selectedGoal">목표:</label>
        <select v-model="selectedGoal" id="selectedGoal" class="form-control">
          <option v-for="goal in goals" :key="goal.id" :value="goal">
            {{ goal.content }}
          </option>
        </select>
      </div>
      <!-- 제목 입력 -->
      <div class="form-group">
        <label for="todoTitle">제목:</label>
        <input v-model="todoTitle" type="text" id="todoTitle" class="form-control" required>
      </div>

      <!-- 내용 입력 -->
      <div class="form-group">
        <label for="todoContent">내용:</label>
        <textarea v-model="todoContent" id="todoContent" class="form-control" rows="3"></textarea>
      </div>
      

      <!-- is_important -->
      <div class="form-group">
        <label>중요여부:</label>
        <div class="form-check form-switch">
          <input v-model="isImportant" class="form-check-input" type="checkbox" role="switch" id="importantSwitch">
          <label class="form-check-label" for="importantSwitch"></label>
        </div>
      </div>

      <!-- isOutside -->
      <div class="form-group">
        <label>외출 여부:</label>
        <div class="form-check form-switch">
          <input v-model="isOutside" class="form-check-input" type="checkbox" role="switch" id="outsideSwitch">
          <label class="form-check-label" for="outsideSwitch"></label>
        </div>
      </div>

      <!-- 알람 여부 선택 -->
      <!-- isAlarmed -->
      <div class="form-group">
        <label>알람 여부:</label>
        <div class="custom-control custom-switch">
          
          <div class="form-check form-switch">
            <input v-model="isAlarmed" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
          </div>
        </div>
      </div>

      <!-- 알람 시간 입력 -->
      <div class="form-group" v-if="isAlarmed">
        <label for="time">알람 시간:</label>
        <input v-model="time" type="time" id="time" class="form-control">
      </div>
      <!-- <p>Formatted Date: {{ formattedDate }}</p> -->
      <div>
      </div>
      <button type="submit" class="btn calendar-save" @click.prevent="addTodo()">저장</button>
    </form>
  </div>
</template>

<script>
import { addTodo } from '@/api/todos';
import { getGoalList } from '@/api/goals'; 
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import moment from 'moment';

export default {
  props: {
    formattedDate: Object,
    item: Object
  },
  data() {
    return {
      // todo-list
      selectedGoal: null,
      todoId: '',
      todoTitle: '',
      todoContent: '',
      todoDate: '',
      isImportant: false,
      // alarm(알람 설정할 때만 필요한 영역)
      isAlarmed: false,
      day: '',
      time: '',
      important: false,
      outside: false,
      alarmed: false,
      checked: false,
      completed: false,
      goals: [],
      selectedDate: this.$route.params.selectedDate,
      
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
      
    });

    const openModal = (component) => {
      if (component === "CalendarAddTodo") {
        isModalValid.value = true;
        activeModal.value = component;
        currentItem.value = { formattedDate: formattedDate.value }
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

  methods: {
    async addTodo() {
  try {
    // Todo 항목의 데이터 준비
    const todo = {
      title: this.todoTitle, // 제목
      content: this.todoContent, // 내용
      color: this.selectedGoal.color, // 색상
      important: this.isImportant, // 중요여부
      outside: this.isOutside, // 외출여부
      alarmed: this.time, // 알람시간
    };

    // 성공 콜백 함수
    const onSuccess = (response) => {
      window.location.reload();
    };

    // 실패 콜백 함수
    const onFail = (error) => {
      console.error('Error creating todo:', error);
    };
    const goalId = this.selectedGoal.id
    // addTodo 함수 호출
    addTodo(goalId, todo, this.formattedDate, onSuccess, onFail);
  } catch (error) {
    console.error('Error in addTodo:', error);
  }
},
    closeModal() {
      this.$emit('close-modal');
    },

    async fetchGoals() {
      try {
        getGoalList(
      ({ data }) => {
        this.goals = data;
      },
      (error) => {
        console.log(error);
      }
    );
      } catch (error) {
        console.error('Error fetching goals:', error);
      }
    },

    fourDigitTime(t) {
      const [hours, minutes] = t.split(':')
      return hours + minutes   
    },

    eightDigitDate(d) {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
      const dd = String(currentDate.getDate()).padStart(2, '0'); // 날짜를 2자리로 만듭니다.
      const curDate= `${yyyy}${mm}${dd}`;
      return curDate
    },


    fourDigitTime(t) {
      const [hours, minutes] = t.split(':')
      return hours + minutes   
    },

    async fnAdd(event) {
event.preventDefault(); // 폼의 기본 제출 동작 방지

// 오늘 날짜와 시간 설정
const d = new Date();
this.day = (d.getDay() + 6) % 7; // 월요일을 0으로 설정
const setTime = this.fourDigitTime(this.time);
this.time = setTime;

try {
  const todoData = {
  title: this.todoTitle, // 제목
  content: this.todoContent, // 내용
  color: this.isImportant, // 중요 여부
  important: this.isImportant, // 외출 여부
  outside: this.isOutside, // 알람 여부
  alarmed: this.time, // 알람 시간 (서버가 요구하는 필드명과 일치하는지 확인 필요)
  goalId: this.selectedGoal.id, // selectedGoal에서 goalId 추출
};

// addTodo 함수를 호출하고 todoData 객체를 인자로 전달
await addTodo(todoData);

  this.closeModal(); // 모달 닫기
} catch (error) {
  console.error('Error adding todo:', error);
  // 에러 처리 로직 (예: 사용자에게 에러 메시지 표시)
}
}

  },
  mounted() {
    this.fetchGoals();
  }  
}
</script>

<style scoped>
.modal-content {
  background: #fff; /* 나머지 부분은 하얀색 배경 */
}

.modal-title {
  background: #EAF3F9; /* 제목 부분에만 #EAF3F9 배경 색상 적용 */
  padding: 10px; /* 여백 추가 */
  border-radius: 8px;
  margin-bottom: 20px; /* 여백 추가 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
}

.btn-close {
  width: 20px;
  height: 20px;
  background-color: #EAF3F9; /* 배경 색상 수정 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto; /* 나머지 공간을 최대한 차지하여 왼쪽으로 이동 */
}
.form-group {
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}

.custom-control-label {
  padding-left: 10px;
}

.calendar-save {
  display: flex;
  margin-left: auto;
}

</style>
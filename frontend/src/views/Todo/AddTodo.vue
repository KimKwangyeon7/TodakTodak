<template>
  <div class="modal-content" style="border-radius: 10px;">

    <div class="modal-title">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
    </div>
    <form @submit.prevent="submitTodo">

      <!-- 상속 목표 -->
      <div class="form-group">
        <label for="selectedGoal">목표:</label>
        <select v-model="selectedGoal" id="selectedGoal" class="form-control">
          <option v-for="goal in goals" :key="goal.id" :value="goal">
            {{ goal.goalContent }}
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
            <input v-model="isAlarm" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
          </div>
        </div>
      </div>

      <!-- 알람 시간 입력 -->
      <div class="form-group" v-if="isAlarm">
        <label for="time">알람 시간:</label>
        <input v-model="time" type="time" id="alarmTime" class="form-control">
      </div>

      <form @submit.prevent="submitTodo">
        <button type="submit" class="btn btn-primary" @click="submitTodo">저장</button>
      </form>
    </form>
  </div>
</template>

<script>
import { useTodosStore } from '@/stores/todos';
import { useGoalsStore } from '@/stores/goals';


export default {
  data() {
    return {
      // todo-list
      selectedGoal: '',
      todoTitle: '',
      todoContent: '',
      todoDate: '',
      isImportant: false,
      // alarm(알람 설정할 때만 필요한 영역)
      isAlarm: '',
      day: '',
      time: '',
      isOutside: false,
      isChecked: false,
      isCompleted: false,
    };
  },
  computed: {
    goals() {
      const goalsStore = useGoalsStore()
      return goalsStore.goals
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    submitTodo() {

      const todosStore = useTodosStore()

      // 우선 오늘 날짜로 테스트
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
      const dd = String(currentDate.getDate()).padStart(2, '0'); // 날짜를 2자리로 만듭니다.
      const eightDigitDate = `${yyyy}${mm}${dd}`;

      // 알람에 넣을 요일(알람 설정 하지 않으면 불필요한 영역)
      const days = [0, 1, 2, 3, 4, 5, 6] // 원래는 0이 일요일
      // 이렇게 하여 0을 월요일로 바꿈
      const day = (currentDate.getDay() + 6) % 7

      // todos 배열에 넣기
      todosStore.addTodo({ 
        goalId: this.selectedGoal.id,
        todoTitle: this.todoTitle,
        todoContent: this.todoContent,
        todoDate: eightDigitDate,
        isImportant: this.isImportant, })
      console.log(todosStore)
      this.closeModal()    
    },
    // setAlarm() {
    // const newAlarm = {
    //   todoTitle: this.todoTitle,
    //   todoContent: this.todoContent,
    //   isOutside: this.isOutside,
    //   alarm: this.alarm,
    //   alarmTime: this.alarmTime,
    // }
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
  margin-right: auto; /* 나머지 공간을 최대한 차지하여 왼쪽으로 이동 */
}
.form-group {
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}

.custom-control-label {
  padding-left: 10px;
}
</style>
<template>
  <div class="modal-content" style="border-radius: 10px">
    <div class="modal-title">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"
      ></button>
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
        <input
          v-model="todoTitle"
          type="text"
          id="todoTitle"
          class="form-control"
          required
        />
      </div>

      <!-- 내용 입력 -->
      <div class="form-group">
        <label for="todoContent">내용:</label>
        <textarea
          v-model="todoContent"
          id="todoContent"
          class="form-control"
          rows="3"
        ></textarea>
      </div>

      <!-- is_important -->
      <div class="form-group">
        <label>중요여부:</label>
        <div class="form-check form-switch">
          <input
            v-model="important"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="importantSwitch"
          />
          <label class="form-check-label" for="importantSwitch"></label>
        </div>
      </div>

      <!-- isOutside -->
      <div class="form-group">
        <label>외출 여부:</label>
        <div class="form-check form-switch">
          <input
            v-model="outside"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="outsideSwitch"
          />
          <label class="form-check-label" for="outsideSwitch"></label>
        </div>
      </div>

      <!-- 알람 여부 선택 -->
      <!-- isAlarmed -->
      <div class="form-group">
        <label>알람 여부:</label>
        <div class="custom-control custom-switch">
          <div class="form-check form-switch">
            <input
              v-model="alarmed"
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked
            />
            <label
              class="form-check-label"
              for="flexSwitchCheckChecked"
            ></label>
          </div>
        </div>
      </div>

      <!-- 알람 시간 입력 -->
      <div class="form-group" v-if="alarmed">
        <label for="time">알람 시간:</label>
        <input v-model="time" type="time" id="time" class="form-control" />
      </div>

      <button
        type="submit"
        class="btn todo-save"
        @click.prevent="registerTodo()"
      >
        저장
      </button>
    </form>
  </div>
</template>

<script>
import { addTodo } from "@/api/todos";
import { getGoalList } from "@/api/goals";

export default {
  data() {
    return {
      // todo-list
      selectedGoal: null,
      todoId: "",
      todoTitle: "",
      todoContent: "",
      todoDate: "",
      // alarm(알람 설정할 때만 필요한 영역)
      day: "",
      time: "",
      important: false,
      outside: false,
      alarmed: false,
      checked: false,
      completed: false,
      goals: [],
    };
  },

  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
    registerTodo() {
      try {
        const now = new Date();
        var year = now.getFullYear().toString();
        var month = (now.getMonth() + 1).toString();
        var day = now.getDate().toString();
        if (month < 10) {
          month = "0" + month;
        }

        if (day < 10) {
          day = "0" + day;
        }
        const todoDate = year + "" + month + "" + day;
        const alarmTime = this.fourDigitTime(this.time);

        console.log("todoDate:", todoDate);

        const goalColor = this.selectedGoal.color;
        console.log("goalColor:", goalColor);
        const goalId = this.selectedGoal.id;
        console.log("goalId:", goalId);
        // selectedGoal 객체에서 goalId를 가져옵니다.
        const todo = {
          title: this.todoTitle, // 제목
          content: this.todoContent, // 내용
          color: goalColor, // 색상
          important: this.important, // 중요여부
          outside: this.outside, // 외출여부
          alarmed: this.alarmed, // 알람여부
          time: alarmTime, // 알람시간
        };

        try {
          addTodo(goalId, todo, todoDate,
            ({ data }) => {
              console.log("Todo added:", data);
              console.log(data);
            },
            (error) => {
              console.log(error);
            }
          );
          console.log("goals", this.goals);
          // this.goals = await getGoalList();
        } catch (error) {
          console.error("Error fetching goals:", error);
        }
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    },
    async fetchGoals() {
      console.log("fetchGoals 실행");
      try {
        getGoalList(
          ({ data }) => {
            console.log("목표리스트");
            console.log(data);
            this.goals = data;
          },
          (error) => {
            console.log(error);
          }
        );
        console.log("goals", this.goals);
        // this.goals = await getGoalList();
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    },

    fourDigitTime(t) {
      const [hours, minutes] = t.split(":");
      return hours + minutes;
    },

    eightDigitDate(d) {
      const currentDate = new Date();
      const yyyy = currentDate.getFullYear();
      const mm = String(currentDate.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
      const dd = String(currentDate.getDate()).padStart(2, "0"); // 날짜를 2자리로 만듭니다.
      const curDate = `${yyyy}${mm}${dd}`;
      return curDate;
    },

    fourDigitTime(t) {
      const [hours, minutes] = t.split(":");
      return hours + minutes;
    },
  },

  mounted() {
    this.fetchGoals();
  },
};
</script>

<style scoped>
.modal-content {
  background: #fff; /* 나머지 부분은 하얀색 배경 */
}

.modal-title {
  background: #eaf3f9; /* 제목 부분에만 #EAF3F9 배경 색상 적용 */
  padding: 10px; /* 여백 추가 */
  border-radius: 8px;
  margin-bottom: 20px; /* 여백 추가 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
}

.btn-close {
  width: 20px;
  height: 20px;
  background-color: #eaf3f9; /* 배경 색상 수정 */
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

.todo-save {
    display: flex;
    margin-left: auto;
  }

</style>

<template>
  <div class="modal-content">
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="closeModal"
    ></button>
    <div class="form-group">
      <label for="selectedGoal">목표:</label>
      <select v-model="item.goalId" id="selectedGoal" class="form-control">
        <option v-for="goal in goals" :key="goal.id" :value="goal.id">
          {{ goal.content }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="todoTitle">제목:</label>
      <input
        v-model="item.title"
        type="text"
        id="todoTitle"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="todoContent">내용:</label>
      <textarea
        v-model="item.content"
        id="todoContent"
        class="form-control"
        rows="3"
      ></textarea>
    </div>
    <div class="form-group">
      <label for="todoContent">알림 문구:</label>
      <textarea
        v-model="item.text"
        id="todoText"
        class="form-control"
        rows="2"
      ></textarea>
    </div>
    <div class="form-group">
      <label>중요여부:</label>
      <div class="form-check form-switch">
        <input
          v-model="item.important"
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="importantSwitch"
        />
        <label class="form-check-label" for="importantSwitch"></label>
      </div>
    </div>
    <div class="form-group">
      <label>외출 여부:</label>
      <div class="form-check form-switch">
        <input
          v-model="item.outside"
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="outsideSwitch"
        />
        <label class="form-check-label" for="outsideSwitch"></label>
      </div>
    </div>
    <div class="form-group">
      <label>알람 여부:</label>
      <div class="custom-control custom-switch">
        <div class="form-check form-switch">
          <input
            v-model="item.alarmed"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="alarmSwitch"
          />
          <label class="form-check-label" for="alarmSwitch"></label>
        </div>
      </div>
    </div>
    <div class="form-group" v-if="item.alarmed">
      <label for="time">알람 시간:</label>
      <input v-model="item.time" type="time" id="time" class="form-control" />
    </div>
    <div class="form-group">
      <label>완료 여부:</label>
      <div class="custom-control custom-switch">
        <div class="form-check form-switch">
          <input
            v-model="item.checked"
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            checked
          />
          <label class="form-check-label" for="flexSwitchCheckChecked"></label>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button class="btn" @click="fnDelete">삭제</button>
      <button class="btn" @click="fnSave">저장</button>
    </div>
  </div>
</template>

<script>
import { getGoalList } from "@/api/goals";
import { updateTodo, deleteTodo, isTodoCompleted } from "@/api/todos";

export default {
  data() {
    return {
      originalItem: {},
      goals: [],
    };
  },
  created() {
    this.originalItem = { ...this.item };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    localSelectedGoal: {
      get() {
        // If the goal is already selected, use it; otherwise, use the first goal
        return this.item || (this.goals.length > 0 ? this.goals[0].id : null);
      },
      set(newValue) {
        // Update the local item's selected goal when changed
        this.item.selectedGoal = newValue;
      },
    },
  },
  methods: {
    closeModal() {
      Object.assign(this.item, this.originalItem);
      this.editableItem = { ...this.item };
      this.$emit("close-modal");
    },
    async fnDelete() {
      try {
        deleteTodo(
          this.item.id,
          (response) => {
            let msg = "투두 삭제 처리시 문제 발생했습니다.";
            if (response.status == 200) msg = "투두 삭제가 완료되었습니다.";
            alert(msg);
          },
          (error) => console.log(error)
        );
        this.$emit("close-modal");
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    },
    async fnSave() {
      try {
        updateTodo(
          this.item.id, this.item,
          (response) => {
            let msg = "투두 수정 시 문제 발생했습니다.";
            if (response.status == 200) msg = "투두 수정시 완료되었습니다.";
            alert(msg);
          },
          (error) => console.log(error)
        );
        this.$emit("close-modal");
      } catch (error) {
        console.error("Error deleting todo:", error);
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
  },
  mounted() {
    console.log(this.item);
    this.fetchGoals();
  },
};
</script>

<style scoped>
.modal-content {
  background: #eaf3f9;
  border-radius: 8px;
  padding: 20px;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.form-group {
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  flex: 1;
  margin-right: 10px; /* 버튼 간격 조절 */
}
</style>

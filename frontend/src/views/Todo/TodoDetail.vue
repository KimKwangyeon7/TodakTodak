<template>
  <div class="modal-content">
    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
    <div class="form-group">
      <label for="selectedGoal">목표:</label>
      <select v-model="localSelectedGoal" id="selectedGoal" class="form-control">
        <option v-for="goal in goals" :key="goal.id" :value="goal.id">
          {{ goal.goalContent }}
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="todoTitle">제목:</label>
      <input v-model="item.todoTitle" type="text" id="todoTitle" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="todoContent">내용:</label>
      <textarea v-model="item.todoContent" id="todoContent" class="form-control" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label>중요여부:</label>
      <div class="form-check form-switch">
        <input v-model="item.isImportant" class="form-check-input" type="checkbox" role="switch" id="importantSwitch">
        <label class="form-check-label" for="importantSwitch"></label>
      </div>
    </div>
    <div class="form-group">
      <label>외출 여부:</label>
      <div class="form-check form-switch">
        <input v-model="item.isOutside" class="form-check-input" type="checkbox" role="switch" id="outsideSwitch">
        <label class="form-check-label" for="outsideSwitch"></label>
      </div>
    </div>
    <div class="form-group">
      <label>알람 여부:</label>
      <div class="custom-control custom-switch">
        <div class="form-check form-switch">
          <input v-model="item.isAlarmed" class="form-check-input" type="checkbox" role="switch" id="alarmSwitch">
          <label class="form-check-label" for="alarmSwitch"></label>
        </div>
      </div>   
    </div>
    <div class="form-group" v-if="item.isAlarmed">
      <label for="time">알람 시간:</label>
      <input v-model="alarmTime" type="time" id="time" class="form-control">
    </div>
    <button class="" @click="fnDelete">삭제</button>
    <button class="" @click="fnSave">저장</button>

  </div>
</template>

<script>
import { useGoalsStore } from '@/stores/goals';
import { useTodosStore } from '@/stores/todos';
import { useAlarmsStore } from '@/stores/alarms';

export default {
  data() {
    return {
      originalItem: {}
    }
  },
  created() {
    this.originalItem = {...this.item}
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    goals() {
      // This will reactively update when the store's state changes
      return useGoalsStore().goals;
    },
    localSelectedGoal: {
      get() {
        // If the goal is already selected, use it; otherwise, use the first goal
        return this.item.selectedGoal || this.goals[0]?.id;
      },
      set(newValue) {
        // Update the local item's selected goal when changed
        this.item.selectedGoal = newValue;
      }
    },
    alarmTime: {
      get() {
        // Get the alarm for the current todo item
        const alarmStore = useAlarmsStore();
        const alarm = alarmStore.alarms.find(alarm => alarm.todoId === this.item.id);
        return alarm ? alarm.time : null;
      },
      set(newTime) {
        // Update the alarm time
        const alarmStore = useAlarmsStore();
        const alarmIndex = alarmStore.alarms.findIndex(alarm => alarm.todoId === this.item.id);
        if (alarmIndex !== -1) {
          alarmStore.alarms[alarmIndex].time = newTime;
        } else {
          // Handle the case where there's no existing alarm for this todo item
          // Possibly by creating a new alarm
        }
      }
    }
  },
  methods: {
    closeModal() {
      Object.assign(this.item, this.originalItem)
      this.editableItem = {...this.item};
      this.$emit('close-modal');    
    },
    async fnDelete() {
      try {
        const todoStore = useTodosStore();
        await todoStore.deleteTodo(this.item.id);
        this.$emit('close-modal');
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    },
    async fnSave() {
      try {
        const todoStore = useTodosStore(); 
        await todoStore.updateTodo(this.item.id, this.item); 
        this.$emit('close-modal'); 
      } catch (error) {
        console.error('Error updating todo:', error);
      }
    },
  }
};
</script>

<style scoped>
.modal-content {
  background: #EAF3F9;
  border-radius: 8px;
  padding: 20px;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: #ccc;
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
</style>

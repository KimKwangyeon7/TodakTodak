<template>
    <div class="modal-content">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      <div class="form-group">
        <label for="selectedGoal">목표:</label>
        <select v-model="localSelectedGoal" id="selectedGoal" class="form-control">
          <option v-for="goal in goals" :key="goal.id" :value="goal.id">
            {{ goal.content }}
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
      <div class="form-group">
        <label>완료 여부:</label>
        <div class="custom-control custom-switch">
          <div class="form-check form-switch">
            <input v-model="isChecked" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getGoalList } from '@/api/goals';
  import { updateTodo, deleteTodo, checkTodoComplete } from '@/api/todos';
  
  export default {
    data() {
      return {
        originalItem: {},
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
      async goals() {
        // This will reactively update when the store's state changes
        this.goals = await getGoalList()
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
    },
    methods: {
      closeModal() {
        Object.assign(this.item, this.originalItem)
        this.editableItem = {...this.item};
        if (item.isChecked === true) {
          checkTodoComplete(item.id)
        }
        this.$emit('close-modal');    
      },
      async fnDelete() {
        try {
          await deleteTodo(this.item.id);
          this.$emit('close-modal');
        } catch (error) {
          console.error('Error deleting todo:', error);
        }
      },
      async fnSave() {
        try {
          await updateTodo(this.item.id, this.item); 
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
  
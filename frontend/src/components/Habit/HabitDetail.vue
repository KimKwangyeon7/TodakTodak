<template>
    <div class="modal-content">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      <div class="form-group">
        <label for="habitContent">내용:</label>
        <input v-model="item.habitContent" type="text" id="todoTitle" class="form-control" required>
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
        <input v-model="item.time" type="time" id="time" class="form-control">
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
  import { deleteHabit, updateHabit, isHabitCompleted } from '@/api/habits'


  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeModal() {
        if (item.isChecked === true) {
          isHabitCompleted(alarm.id, item.id)
        }
        this.$emit('close-modal');
      },
      async fnDelete() {
        try {
          await deleteHabit(this.item.id);
          this.$emit('close-modal');
        } catch (error) {
          console.error('Error deleting habit:', error);
        }
      },
      async fnSave() {
        try {
          await updateHabit(this.item.id, this.item); 
          this.$emit('close-modal'); 
        } catch (error) {
          console.error('Error updating habit:', error);
        }
      },
      async finish(){

      }
    },
  };
  </script>
  
  <style scoped>
 .modal-content {
    background: #EAF3F9;
    border-radius: 8px;
    padding: 20px;
  }

  .close-button {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 20px;
  height: 20px;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.custom-control-label {
    padding-left: 10px;
  }
</style>



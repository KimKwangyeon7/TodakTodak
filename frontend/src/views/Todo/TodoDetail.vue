<template>
    <div class="modal-content">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
<<<<<<< HEAD:frontend/src/views/TodoList.vue
      <h4>TodoList 모달</h4>
      <p>TodoList 모달</p>
=======
      <h4>TodoDetail 모달</h4>
      <p>TodoDetail 모달</p>
      <p> 제목: {{ item.todoTitle }}</p>
      <p> 내용: {{ item.todoContent }}</p>
      <p> 외출 여부: {{ item.isOutside }}</p>
      <p> 알람 시간: {{ item.time }}</p>
>>>>>>> 4a0503d1cac1b39ca6331fc165aacd5708ab8644:frontend/src/views/Todo/TodoDetail.vue
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
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
<<<<<<< HEAD:frontend/src/views/TodoList.vue
  </style>
<<<<<<< HEAD
  
=======
>>>>>>> 7ab7ce81c580c0d8f18a96ee52f74bba60d5af67
=======
  </style>
>>>>>>> 4a0503d1cac1b39ca6331fc165aacd5708ab8644:frontend/src/views/Todo/TodoDetail.vue

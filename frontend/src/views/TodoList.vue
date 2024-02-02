<template>
    <div class="modal-content">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      <h4>TodoList 모달</h4>
      <p>TodoList 모달</p>
    </div>
  </template>
  
  <script>
  export default {
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
  </style>
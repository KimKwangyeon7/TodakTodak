<!-- TodoList.vue -->
<template>
    <div class="modal-content">
      <h4>목표 상세페이지</h4>
      <p>목표 상세페이지 내용임</p>
      <button class="close-button" @click="closeModal">x</button>
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
    background: white;
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
  

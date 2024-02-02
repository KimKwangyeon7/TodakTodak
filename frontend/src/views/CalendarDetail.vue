<template>
    <div>
      <!-- 모달 창 -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <!-- 상세 내용 표시 -->
          <h2>Calendar Detail</h2>
          <p>Date: {{ selectedDate }}</p>
          <!-- 여기에 상세 내용 추가 -->
        </div>
      </div>
  
      <!-- 캘린더 -->
      <DatePicker expanded v-model="date" @click:date="openModal" />
    </div>
  </template>
  
  <script>
  import { DatePicker } from 'v-calendar';
  import 'v-calendar/style.css';
  
  export default {
    components: {
      DatePicker,
    },
    data() {
      return {
        date: new Date(),
        showModal: false,
        selectedDate: null,
      };
    },
    methods: {
      openModal(date) {
        // 모달 창 열기
        this.showModal = true;
        this.selectedDate = date;
      },
      closeModal() {
        // 모달 창 닫기
        this.showModal = false;
        this.selectedDate = null;
      },
    },
  };
  </script>
  
  <style scoped>
  /* 여러분의 모달 스타일링 추가 */
  .modal {
    display: none; /* 모달 초기에는 숨김 */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    padding-top: 60px;
  }
  
  .modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }
  
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  
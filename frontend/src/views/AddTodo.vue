<template>
    <div class="modal-content" style="border-radius: 10px;">
  
      <div class="modal-title">
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <form @submit.prevent="submitTodo">
        <!-- 제목 입력 -->
        <div class="form-group">
          <label for="title">제목:</label>
          <input v-model="title" type="text" id="title" class="form-control" required>
        </div>
  
        <!-- 내용 입력 -->
        <div class="form-group">
          <label for="content">내용:</label>
          <textarea v-model="content" id="content" class="form-control" rows="3"></textarea>
        </div>
  
        <!-- 외출 여부 선택 -->
        <div class="form-group">
          <label>외출 여부:</label>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
          </div>
        </div>
  
        <!-- 알람 여부 선택 -->
        <div class="form-group">
          <label>알람 여부:</label>
          <div class="custom-control custom-switch">
            
            <div class="form-check form-switch">
  <input v-model="alarm" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
  <label class="form-check-label" for="flexSwitchCheckChecked"></label>
</div>
          </div>
          
        </div>
  
        <!-- 알람 시간 입력 -->
        <div class="form-group" v-if="alarm">
          <label for="alarmTime">알람 시간:</label>
          <input v-model="alarmTime" type="time" id="alarmTime" class="form-control">
        </div>
  
        <button type="submit" class="btn btn-primary">저장</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        content: '',
        goingOut: 'false',
        alarm: false,
        alarmTime: '',
      };
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
      submitTodo() {
        // 여기에 할일 추가 로직을 작성하세요.
        // this.title, this.content 등의 데이터를 활용하여 할일을 저장하거나 더 복잡한 로직을 수행할 수 있습니다.
        // 이후 모달을 닫거나, 할일 목록을 갱신하는 등의 작업을 수행할 수 있습니다.
        this.closeModal();
      },
    },
  };
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
  
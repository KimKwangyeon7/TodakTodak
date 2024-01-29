<template>
    <div class="modal" @click.self="$emit('close')">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">모임 방 추가</h5>
            <button type="button" class="close" @click="$emit('close')">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createRoom">
              <div class="form-group">
                <label for="roomTitle">방 제목:</label>
                <input v-model="newRoom.title" type="text" class="form-control" id="roomTitle" required>
              </div>
              <!-- 추가 필드 및 입력 폼은 필요에 따라 확장 가능 -->
              <button type="submit" class="btn btn-primary">추가</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        newRoom: {
          title: '',
          // 추가 필드는 필요에 따라 여기에 추가
        },
      };
    },
    methods: {
      createRoom() {
        this.$emit('create', this.newRoom); // 부모 컴포넌트로 새로운 방 정보를 전달
      },
    },
  };
  </script>
  
  <style scoped>
  /* 필요에 따라 스타일링을 추가할 수 있습니다. */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-dialog {
    max-width: 400px;
    width: 100%;
  }
  
  .modal-content {
    position: relative;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #007bff;
    color: #fff;
    padding: 10px;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  </style>
  
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
                <label for="roomMember">참여 인원 제한:</label>
                <input v-model="newRoom.title" type="text" class="form-control" id="roomTitle" required>
                <label for="roomPassword">비밀번호:</label>
                <input v-model="newRoom.title" type="text" class="form-control" id="roomTitle" required>
              </div>
              <button type="submit" class="create-room-button btn btn-primary">추가</button>
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

  .create-room-button {
    margin-left: auto;
    display: flex;
  }
  
  </style>
  
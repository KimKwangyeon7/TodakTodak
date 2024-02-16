<template>
  <div class="modal-content" style="border-radius: 10px;">
    <form>
      <!-- Goal Content Input -->
      <div class="form-group">
        <label for="content">목표 내용:</label>
        <input v-model="content" type="text" id="content" class="form-control" required>
      </div>

      <!-- Color Input using Bootstrap classes -->
      <div class="form-group">
        <label for="color">목표 색상:</label>
        <button @click.prevent="openColorDetailModal" class="btn">색상 선택</button>
      </div>
      <div v-if="selectedColor" class="selected-color">
        <p>선택한 색상: {{ selectedColor }}</p>
        <div :key="color" class="color-option" :style="{ backgroundColor: color }"></div>
      </div>
      <button @click.prevent="submitGoal" class="btn goal-save">저장</button>

      <!-- Color Detail Modal -->
      <div v-if="showColorDetailModal" class="color-modal">
        <div class="color-modal-content">
          <div class="color-options">
            <div v-for="color in colorOptions" :key="color" @click="selectColor(color)" class="color-option" :style="{ backgroundColor: color }"></div>
          </div>
          <button @click="closeColorDetailModal" class="btn color-select">닫기</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { addGoal } from '@/api/goals'

export default {
  data() {
    return {
        selectedColor: "", // Main 컴포넌트에서 선택한 색상
      content: '',
      color: '#46beff',
      showColorDetailModal: false,
      colorOptions: [
        '#fff56e', '#ffa500', '#ffdbc1', '#ffbc9b',
        '#e6c178', '#dc9146', '#ffcfda', '#ff9e9b',
        '#ff7493', '#ff96ff', '#75ffca', '#b4f0b4',
        '#6dd66d', '#32bebe', '#9ab9ff', '#46beff'
      ],
      selectedColor: '', // 추가: 선택한 색상 저장 변수
    };
  },
  methods: {
    openColorDetailModal() {
      this.showColorDetailModal = true;
    },
    closeColorDetailModal() {
      this.showColorDetailModal = false;
      // 추가: 모달이 닫힐 때 선택한 색상을 표시
    },
    selectColor(selectedColor) {
      this.color = selectedColor;
      this.selectedColor = selectedColor; // 추가: 선택한 색상 저장
    },
    submitGoal() {
      const onSuccess = (response) => {
      console.log(response.data);
      this.clearForm();
      this.$router.push('/Main');
    };

      // 실패 콜백 함수 정의
      const onFail = (error) => {
      console.error("Error adding goal:", error);
    };

    // `addgoal` 함수 호출
    addGoal({ content: this.content, color: this.color }, onSuccess, onFail);
    },
    clearForm() {
      this.content = '';
      this.color = '#000000';
      this.selectedColor = ''; // 추가: 저장된 선택한 색상 초기화
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #EAF3F9;
}

.form-group {
  margin-bottom: 15px;
}

.goal-save{
  display: flex;
  margin-left: auto;
}

.selected-color {
  margin-top: 10px;
}

.color-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.color-modal-content {
  background-color: #EAF3F9;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.color-option {
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.color-select {
  display: flex;
  margin-top: 10px;
  margin-left: auto;
}
</style>@/records.js/goals
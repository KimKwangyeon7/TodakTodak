<template>
  <div class="modal-content" style="border-radius: 10px;">
        <form @submit.prevent="fnAdd">
            <!-- Goal Content Input -->
            <div class="form-group">
                <label for="goalContent">목표 내용:</label>
                <input v-model="goalContent" type="text" id="goalContent" class="form-control" required>
            </div>

      <!-- Color Input using Bootstrap classes -->
      <div class="form-group">
        <label for="color">목표 색상:</label>
        <button @click.prevent="openColorDetailModal" class="btn btn-primary">색상 선택</button>
      </div>
      <div v-if="selectedColor" class="selected-color">
        <p>선택한 색상: {{ selectedColor }}</p>
        <div :key="color" class="color-option" :style="{ backgroundColor: color }"></div>
      </div>
      <button @click.prevent="submitGoal" class="btn btn-primary">저장</button>

      <!-- Color Detail Modal -->
      <div v-if="showColorDetailModal" class="color-modal">
        <div class="color-modal-content">
          <div class="color-options">
            <div v-for="color in colorOptions" :key="color" @click="selectColor(color)" class="color-option" :style="{ backgroundColor: color }"></div>
          </div>
        </div>
        <button @click="closeColorDetailModal" class="btn btn-primary">닫기</button>
      </div>
    </form>
  </div>
</template>

<script>
    import { addGoal } from '@/api/goals' // Adjust the path if necessary

    export default {
        data() {
            return {
              goalContent: '',
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
            async fnAdd() {
                addGoal({ goalContent: this.goalContent, color: this.color });
                // Redirect after adding goal
                this.$router.push('/Main');
            },

            openColorDetailModal() {
              this.showColorDetailModal = true;
              console.log(`Goal Content:',${this.goalContent} `)
            },
            closeColorDetailModal() {
              this.showColorDetailModal = false;
              // 추가: 모달이 닫힐 때 선택한 색상을 표시
              console.log(`Selected Color: ${this.selectedColor}`);
            },
            selectColor(selectedColor) {
              this.color = selectedColor;
              this.selectedColor = selectedColor; // 추가: 선택한 색상 저장
            },
            submitGoal() {
              const goalsStore = useGoalsStore();
              goalsStore.addGoal({ goalContent: this.goalContent, color: this.color });
              this.clearForm();
              this.$router.push('/Main');
            },
            clearForm() {
              this.goalContent = '';
              this.color = '#000000';
              this.selectedColor = ''; // 추가: 저장된 선택한 색상 초기화
            },
        }
      }
</script>

<style scoped>
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

.selected-color {
  margin-top: 10px;
}
</style>

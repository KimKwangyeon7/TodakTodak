<template>
  <div class="modal-content">
    <button
      type="button"
      class="btn-close"
      aria-label="Close"
      @click="closeModal"
    ></button>
    <div class="form-group">
      <label for="content">목표 내용:</label>
      <input
        v-model="item.content"
        type="text"
        id="content"
        class="form-control"
        required
      />
    </div>
    <div class="form-group">
      <label for="selectedColor">목표 색상:</label>
      <div class="form-group">
        <button @click.prevent="openColorDetailModal" class="btn">
          색상 선택
        </button>
      </div>
      <div v-if="selectedColor" class="selected-color">
        <p>선택한 색상: {{ selectedColor }}</p>
        <div
          :key="color"
          class="color-option"
          :style="{ backgroundColor: color }"
        ></div>
      </div>
      <div v-if="showColorDetailModal" class="color-modal">
        <div class="color-modal-content">
          <div class="color-options">
            <div
              v-for="color in colorOptions"
              :key="color"
              @click="selectColor(color)"
              class="color-option"
              :style="{ backgroundColor: color }"
            ></div>
          </div>
          <button @click="closeColorDetailModal" class="btn color-select">
            닫기
          </button>
        </div>
      </div>
    </div>
    <div class="button-group">
      <button class="btn" @click="fnDelete">삭제</button>
      <button class="btn" @click="fnSave">저장</button>
    </div>
  </div>
</template>

<script>
import { deleteGoal, updateGoal, getGoalList } from "@/api/goals";

export default {
  data() {
    return {
      originalItem: {},
      selectedColor: null,
      goals: [],
      content: "",
      showColorDetailModal: false,
      colorOptions: [
        "#fff56e",
        "#ffa500",
        "#ffdbc1",
        "#ffbc9b",
        "#e6c178",
        "#dc9146",
        "#ffcfda",
        "#ff9e9b",
        "#ff7493",
        "#ff96ff",
        "#75ffca",
        "#b4f0b4",
        "#6dd66d",
        "#32bebe",
        "#9ab9ff",
        "#46beff",
      ],
    };
  },
  created() {
    this.originalItem = { ...this.item };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    get() {
      return this.item.selectedColor || this.goals[0]?.id;
    },
    set(newValue) {
      this.item.selectedColor = newValue;
    },
  },
  methods: {
    openColorDetailModal() {
      this.showColorDetailModal = true;
      console.log(`Goal Content:',${this.content} `);
    },
    closeColorDetailModal() {
      this.showColorDetailModal = false;
      // 추가: 모달이 닫힐 때 선택한 색상을 표시
      console.log(`Selected Color: ${this.selectedColor}`);
    },
    closeModal() {
      Object.assign(this.item, this.originalItem);
      this.editableItem = { ...this.item };
      this.$emit("close-modal");
    },
    selectColor(selectedColor) {
      this.color = selectedColor;
      this.selectedColor = selectedColor; // 추가: 선택한 색상 저장
    },
    async fnDelete() {
      try {
        await deleteGoal(this.item.id);
        this.$emit("close-modal");
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    },
    async fnSave() {
      try {
        await updateGoal(this.item.id, this.item);
        this.$emit("close-modal");
      } catch (error) {
        console.error("Error updating goal:", error);
      }
    },
  },

  mounted() {
    getGoalList(
      ({ data }) => {
        console.log("목표 리스트 목록");
        console.log(data);
        this.goals = data;
        this.item.selectedColor = this.goals[0]?.id;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.btn-close {
  display: flex;
  margin-left: auto;
}

.modal-content {
  background: #eaf3f9;
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

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.button-group button {
  flex: 1;
  margin-right: 10px; /* 버튼 간격 조절 */
}
.color-option {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.color-modal-content {
  background-color: #eaf3f9;
  border-radius: 20px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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

.color-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
</style>

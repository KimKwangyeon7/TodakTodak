<template>
  <div class="modal-content">
    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
    <div class="form-group">
      <label for="content">목표 내용:</label>
      <input v-model="item.content" type="text" id="content" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="selectedColor">목표 색상:</label>
      <select v-model="localSelectedColor" id="selectedColor" class="form-control">
        <option v-for="goal in goals" :key="goal.id" :value="goal.id">
          {{ goal.color }}
        </option>
      </select>
    </div>
    <div class="button-group">
      <button class="btn" @click="fnDelete">삭제</button>
      <button class="btn" @click="fnSave">저장</button>
    </div>
  </div>
</template>

<script>
import { deleteGoal, updateGoal } from '@/api/goals';

export default {
  data() {
    return {
      originalItem: {}
    }
  },
  created() {
    this.originalItem = {...this.item}
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    async goals() {
      this.goals = await getGoalList()
    },
    get() {
      return this.item.selectedColor || this.goals[0]?.id;
    },
    set(newValue) {
      this.item.selectedColor = newValue
    }
  },
  methods: {
    closeModal() {
      Object.assign(this.item, this.originalItem)
      this.editableItem = {...this.item};
      this.$emit('close-modal');
    },
    async fnDelete() {
      try {
        await deleteGoal(this.item.id);
        this.$emit('close-modal');
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
    async fnSave() {
      try {
        await updateGoal(this.item.id, this.item); 
        this.$emit('close-modal'); 
      } catch (error) {
        console.error('Error updating goal:', error);
      }
    },
  },
};
</script>

<style scoped>
.btn-close {
  display: flex;
  margin-left: auto;
}

.modal-content {
  background: #EAF3F9;
  border-radius: 8px;
  padding: 20px;
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
</style>
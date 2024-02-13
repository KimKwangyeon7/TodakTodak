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
    <button class="" @click="fnDelete">삭제</button>
    <button class="" @click="fnSave">저장</button>

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
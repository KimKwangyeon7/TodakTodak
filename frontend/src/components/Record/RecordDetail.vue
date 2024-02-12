<template>
  <div class="modal-content">
    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
    <div class="form-group">
      <label for="recordName">이름: </label>
      <input v-model="item.name" type="text" id="todoTitle" class="form-control" required>
    </div>
    <div class="form-group">
      <label for="recordMemo">메모: </label>
      <input v-model="item.memo" type="text" id="todoTitle" class="form-control" required>
    </div> 
    <button class="" @click="fnSave">저장</button>
    <button class="" @click="recordCont">이어 녹음하기</button>
  </div>
</template>

<script>
import { modifyVoice } from '@/api/records'


export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    onSuccess(response){
      console.log(response.data)
    },
    onFail(error){
        console.error(error)
      },
    closeModal() {
      this.$emit('close-modal');
    },
    async fnSave() {
      try {
        await modifyVoice(this.item.id, 
                          this.item.name, 
                          this.item.memo,
                          this.onSuccess,
                          this.onFail); 
        this.$emit('close-modal'); 
      } catch (error) {
        console.error('Error updating voice:', error);
      }
    },
    async recordCont() {
      this.$router.push({ name: 'Trainer', params: { recordId: this.item.id } });
          console.error(err);
      }
    }
  }
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

.custom-control-label {
  padding-left: 10px;
}
</style>



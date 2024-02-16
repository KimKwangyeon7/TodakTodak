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
    <div class="button-group">
      <button class="edit-button" @click="fnSave">수정하기</button>
      <button class="continue-button" @click="recordCont">이어 녹음하기</button>
      <button class="learning-button" @click="learningVoice" :disabled="!this.isRecorded">
        {{ isLearning ? '학습 중' : '학습하기' }}
      </button>
    </div>
  </div>
</template>

<script>
import { modifyVoice, getUser } from '@/api/records'
import { startLearning } from '@/api/learning'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data(){
    return {
      isLearning: false, 
      isRecorded: null, 
    }
  },
  computed: {
    isRecorded() {
      return this.isRecordingAvailable; // Corrected to return the data property
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
    handleRecordCompleted(recordId) {
      if (this.item.id === recordId) {
        this.recordingCompleted = true
      }
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
    async learningVoice() {
      this.isLearning = true; // 학습 시작 시
      try {
        await startLearning(this.item.id)
      } catch (error) {
        console.error('Error learning voice:', error)
      }
    },
    recordCont() {
        this.$router.push({ name: 'Trainer', params: { recordId: this.item.id } });
    },
    async checkRecording() {
      try {
        const userData = await getUser(this.item.id);
        this.isRecorded = userData.prompt >= 16; 
      } catch (error) {
        console.error(error);
        this.isRecorded = false;
      }
    }
  },  
  mounted() {
    this.checkRecording();
  }
}
</script>

<style scoped>
.modal-content {
  background: #EAF3F9;
  border-radius: 8px;
  padding: 20px;
}

.button-group {
  display: flex;
  justify-content: space-around;
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

.edit-button,
.continue-button,
.learning-button {
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  /* Add your own styling for the buttons here */
}


.custom-control-label {
  padding-left: 10px;
}


</style>



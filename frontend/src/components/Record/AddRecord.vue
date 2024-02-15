<template>
    <div class="modal-content" style="border-radius: 10px;">
  
      <div class="modal-title">
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <form>

        <!-- 제목 입력 -->
        <div class="form-group">
          <label for="name">이름:</label>
          <input v-model="name" type="text" id="name" class="form-control" required>
        </div>
  
        <!-- 내용 입력 -->
        <div class="form-group">
          <label for="memo">메모:</label>
          <input v-model="memo" type="text" id="memo" class="form-control" required>
        </div>
        <button type="submit" class="btn to-add-record" @click.prevent="fnAdd">녹음 화면으로 가기</button>
    </form>
    </div>
  </template>
  
  <script>
  import { getUser, createNewVoice } from '@/api/records';
  
  export default {
    data() {
      return {
        name: '',
        memo: '',
      };
    },
    computed: {
        
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
      fnAdd() {
        if (this.name === "" || this.memo === "") {
          alert('이름과 메모를 입력하세요');
          return;
        }
        
        const voiceData = {
          name: this.name, 
          memo: this.memo
        };

        createNewVoice(
          voiceData,
          (response) => {
            console.log("Voice created successfully:", response.data);
            console.log('response.data :', response.data)
            // If you need to use the recordId from the created voice, you should get it from the response
            const createdRecordId = response.data; // Assuming the response data has the id of the created record
            this.$router.push({ name: 'Trainer', params: { recordId: createdRecordId } });
            this.$emit('add-voice', voiceData);
          },
          (error) => {
            console.error("Error creating new voice:", error);
          }
        );

      }
    }  
  }
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
  
  .to-add-record {
    display: flex;
    margin-left: auto;
    padding: 20px;
  }
  </style>@/api/records
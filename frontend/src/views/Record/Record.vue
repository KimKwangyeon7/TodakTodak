<template>
  <div class="app mt-5">

    <div class="black-bg" v-if="is_modal_valid">
      <component :is="activeModal" :item="currentItem" @close-modal="closeModal" />
    </div>

    <p class="word-voice-edit">음성
      <button class="add-button" @click="openModal('AddRecord')" style="font-size: 40px">+</button>
    </p>

    <!-- 기본 성우 -->
    <p class="voice-title">기본 성우</p>
    <div class="voice-box">
      <dl>
        <div v-for="basicVoice in basicVoices" :key="basicVoice.id" class="voice">
          <dt @click="openModal('RecordDetail', recordedVoice)">{{ basicVoice.name }}</dt>
          <dd>
            <button class="toggle-button" :class="{ 'active': basicVoice.isActive }" @click="toggleVoice(basicVoice)">
              {{ basicVoice.isActive ? '사용 중' : '적용하기' }}
            </button>
            <button class="delete-button" @click="fnDelete(basicVoice.id)">삭제</button>
          </dd>
        </div>
      </dl>
    </div>

    <br>
    <!-- 학습 중인 음성 -->
    <p class="voice-title">학습 중인 음성</p>
    <div class="voice-box">
      <dl>
        <div v-for="recordedVoice in recordedVoices" :key="recordedVoice .id" class="voice">
          <dt @click="openModal('RecordDetail', recordedVoice)">{{ recordedVoice.name }}</dt>
          <dd>
            <button class="toggle-button" :class="{ 'active': recordedVoice .isActive }" @click="toggleVoice(recordedVoice )">
              {{ recordedVoice .isActive ? '사용 중' : '적용하기' }}
            </button>
            <button class="delete-button" @click="fnDelete(recordedVoice.id)">삭제</button>
          </dd>
        </div>
      </dl>
    </div>

  </div>
</template>

<script>
import { selectVoice, fetchVoiceList, fetchVoiceDetail, deleteVoice, } from '@/api/records'
import RecordDetail from '@/components/Record/RecordDetail.vue'
import AddRecord from '@/components/Record/AddRecord.vue'

export default {
  name: 'Record',
  data() {
    return {
      basicVoices: [{id: 0, name: '김영희의 음성'}, 
                    {id: 1, name: '김철수의 음성'},
                    {id: 2, name: '이잼민의 음성'}
                  ],
      recordedVoices: [],
      is_modal_valid: false,
      activeModal: null,
      currentItem: null,
    }
  },
  components: {
    RecordDetail,
    AddRecord
  },
  methods: {
    onSuccess(response){
        console.log(response.data)
      },
    onFail(error){
        console.error(error)
      },
    async toggleVoice(voice) {
          if (!voice.isActive) {
        voice.isActive = true;
        this.recordedVoices.forEach(v => {
          if (v.id !== voice.id) v.isActive = false;
        });

        try {
          await selectVoice(voice.id, this.onSuccess, this.onFail);
        } catch (error) {
          console.error('Error selecting voice:', error);
        }
      }
    },
    async openModal(component = 'RecordDetail', itemData = null) {
      if (component === 'RecordDetail' && itemData) {
        try {
          const detailedRecord = await fetchVoiceDetail(itemData.id);
          this.currentItem = detailedRecord;
        } catch (error) {
          console.error('Error fetching record detail:', error);
          return;
        }
      } else if (component === 'AddRecord') {
        console.log('AddRecord is going to be opened...')
      }
    
      this.is_modal_valid = true;
      this.activeModal = component;
      this.currentItem = itemData;
    },
    async closeModal() {
      this.is_modal_valid = false;
      this.activeModal= null;
      this.currentItem = null;
    },
    async fetchRecords() {
      console.log("fetchRecords 실행");
      try {
        const voices = await fetchVoiceList();
        console.log('Fetched Voices:', voices);
        this.recordedVoices = voices || []; // Fallback to an empty array if undefined
      } catch (error) {
        console.error('Error fetching records:', error);
        this.recordedVoices = []; // Fallback to an empty array in case of catch
      }
    },
    async fnDelete(recordId) {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      if (confirmed){
        try {
          // Ensure you're passing an object with the property `recordId`
          await deleteVoice(recordId, this.onSuccess, this.onFail);
          // After a successful delete, remove the voice from the local list as well
          this.recordedVoices = this.recordedVoices.filter(voice => voice.id !== recordId);
        } catch (error) {
          console.error('Error deleting voice', error);
        }
      }
    },
  },
  mounted() {
    this.fetchRecords();
  }
}
</script>


<style scoped>
.voice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.word-voice-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  font-size: 30px;
  font-weight: bold;
}

.voice-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 30px;
}

.voice-box {
  overflow-y: scroll;
  max-height: 500px;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  background-color: #EAF3F9;
  padding: 10px;
  border-radius: 24px;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
}

.toggle-button {
  cursor: pointer;
  background: #e0e0e0;
  border: none;
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 14px;
}

.toggle-button.active {
  background: red;
  color: white;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 0;
  left: 0;
}

.delete-button {
  cursor: pointer;
  background: #ff3333; /* 삭제 버튼 색상은 사용자에게 명확하게 나타내기 위해 변경 가능 */
  border: none;
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 14px;
  margin-left: 10px; /* 삭제 버튼 간격 조절 가능 */
  color: white;
}

.add-button {
  font-size: 20px;
  background-color: #ffffff;
  color: #000; /* 검정색 텍스트 색상 */
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 5px; /* 내용물과 버튼 사이의 간격 조절을 위한 패딩 */
}
</style>
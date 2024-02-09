<template>
  <div class="app mt-5">
    <p class="word-voice-edit">음성
      <router-link :to="{ name: 'VoiceTrainer' }" style="font-size: 40px;">+</router-link>
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
import { fetchVoiceList, fetchVoiceDetail, deleteVoice, } from '@/api/record'
import { RecordDetail } from '@/components/RecordDetail.vue'

export default {
  name: 'Record',
  data() {
    return {
      basicVoices: ['김영희의 음성', '김철수의 음성', '이잼민의 음성'],
      recordedVoices: [],
      is_modal_valid: false,
      activeModal: null,
      currentItem: null,
    }
  },
  components: {
    RecordDetail
  },
  methods: {
    toggleVoice(voice) {
      voice.isActive = !voice.isActive;
    },
    async fetchRecords() {
      try {
        this.recordedVoices = await fetchVoiceList();
      } catch(error) {
        console.log('Error fetching records:', error)
      }
    },
    async openModal(component = RecordDetail, itemData = null) {
      try {
        const detailedRecord = await fetchVoiceDetail(itemData.id)
        this.currentItem = detailedRecord
      } catch (error) {
        console.error('Error fetching record detail:', error);
        return;
      }
      this.is_modal_valid = true
      this.activeModal = component
      this.currentItem = itemData
    },
    async fnDelete(voiceId) {
      const confirmed = window.confirm('정말 삭제하시겠습니까?');
      if (confirmed){
        try {
          await deleteVoice(voiceId)
        } catch (error) {
          console.error('Error deleting voice', error)
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
</style>@/api/records
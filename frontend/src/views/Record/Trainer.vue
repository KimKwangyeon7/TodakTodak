<template>
  <div class="app mt-5">
    <p class="voice-title">음성 학습
      <button class='btn' @click="handleBackButton">back</button>
    </p>

    <div class="sentence-box">
      <div class="inner-box">
        <p class="inner-instruction-box">다음 문장을 소리내어 읽으세요.</p>
        <p style="font-size: 16px">{{ currentSentence.sentence || '문장을 불러오는 중...' }}</p>
      </div>
      <div class="buttons inner-buttons-box">
        <button class="btn left-btn" @click="prevSentence" :disabled="currentSentenceId === 0">
          <img src="@/assets/voice/arrow-left.png" alt="">
        </button>
        <p>{{ this.currentSentenceId + 1 }} / {{ sentences.length }}</p>
        <button class="btn right-btn" @click="nextSentence" :disabled="currentSentenceId === sentences.length - 1">
          <img src="@/assets/voice/arrow-right.png" alt="">
        </button>
      </div>
    </div>  

    <p class="voice-title">음성 녹음</p>

    <div class="voice-box">
      <div class="inner-box-3">
        <div v-if="currentRecordHistory.length > 0">
          <div v-for="record in currentRecordHistory" :key="record.id">
            <div v-if="record.elapsedTime > 60">
              <div>{{ record.promptNum }}번 녹음 시간: {{ Math.floor(record.elapsedTime / 60) }} 분 {{ record.elapsedTime % 60 }} 초</div>
            </div>
            <div v-else>
              <div>{{ record.promptNum }}번 녹음 시간: {{ record.elapsedTime }} 초</div>
            </div>
          </div>
        </div>
          
        <div v-if="recording">
            <div v-if="elapsedTime > 60">
                <div>{{ currentSentenceId + 1 }}번 녹음 시간: {{ Math.floor(elapsedTime / 60) }} 분 {{ elapsedTime % 60 }} 초</div>
            </div>
            <div v-else>
                <div>{{ currentSentenceId + 1 }}번 녹음 시간: {{ elapsedTime }} 초</div>
            </div>
        </div>
      </div>
      <div class="inner-box-4">
          <div v-if="totalRecordingTime > 60">
            <div>총 녹음 시간: {{ Math.floor(totalRecordingTime / 60) }} 분 {{ totalRecordingTime }} 초</div>
          </div>
          <div v-else>
            <div>총 녹음 시간: {{ totalRecordingTime }} 초</div>
          </div>
        </div>
      <div>
        <button class="mr-4" @click="record">
          <img :src="recordingStatus === 'Record Sound' ? recordSoundImage : stopRecordingImage" alt="Recording Status" />
          <!-- {{ recordingStatus }} -->
        </button>
      </div>
    </div>

    <!-- <br>
    <p class="voice-title">학습 중인 음성</p>
    <div class="voice-box">
    </div>     -->
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { getUser, saveRecord, goOutFromTrainer } from '@/api/records'
import { loadKoreanCorpus } from '@/stores/koreanCorpus'
import { useRecordHistorystore } from '@/stores/recordHistory'
import { useRoute } from 'vue-router'
import { startLearning } from '@/api/learning'

import recordSoundImage from '@/assets/voice/record_sound.png';
import stopRecordingImage from '@/assets/voice/stop_recording.png';


export default {
  name: 'VoiceTrainer',
  setup() {
    const route = useRoute()
    const recordId = ref(route.params.recordId)
    const recordHistoryStore = useRecordHistorystore();
    const sentences = ref([]);
    const currentSentenceId = ref(0);
    const currentSentence = computed(() => sentences.value[currentSentenceId.value] || '');

    loadKoreanCorpus().then(sentencesArray => {
      sentences.value = sentencesArray.slice(0, 3); // 4000천 개의 문장 중에 우선 5개만
      console.log('sentences: ', sentences.value)
    }).catch(error => {
      console.error('Error loading Korean corpus:', error);
    });

    return { recordHistoryStore, recordId, sentences, currentSentenceId, currentSentence };
  },
  created() {
    const route = useRoute()
    const recordId = ref(route.params.recordId)
    if (recordId) {
      // If recordId is available, do something with it
      console.log('The recordId from URL is:', recordId);
      // You can store it in your component's data if you need to use it later
      this.recordId = recordId;
    } else {
      console.error('RecordId is not defined in the URL');
    }
    window.addEventListener('beforeunload', this.goOut);
    this.loadUserData();
  },
  unmounted() {
    window.removeEventListener('beforeunload', this.goOut);
  },
  data() {
    return {
      recordingStatus: "Record Sound",
      recording: false,
      recorder: null,
      blob: null,
      stream: null,
      audioPlayer: null,
      isPlaying: false,
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      recordingStartTime: null,
      elapsedTime: 0,
      recordingDurations: [],
      recordId: null,
      recordSoundImage,
      stopRecordingImage,
    };
  },
  computed: {
    currentRecordHistory() {
      const history = this.recordHistoryStore.histories[this.recordId.toString()] || [];
      console.log('Current Record History:', history);
      return history.records || [];
    },
    cantSave() {
      return this.name === "" || !this.blob;
    },
    recordHistory() {
      return this.recordHistoryStore.recordHistory;
    },
    totalRecordingTime() {
      const recordHistory = this.recordHistoryStore.histories[this.recordId];
      console.log('Record History:', recordHistory); // Check if record history is available
      if (recordHistory && recordHistory.durations) {
        const totalDuration = recordHistory.durations.reduce((total, duration) => total + duration, 0);
        console.log('Total Duration:', totalDuration); // Check the calculated total duration
        return totalDuration;
      }
      console.log('No record history or durations found.'); // Log if there's no record history or durations
      return 0; // If there's no history or durations, return 0
    },

    hasRecordedCurrent() {
      const currentHistory = this.recordHistoryStore.histories[this.recordId.toString()];
      console.log('currentHistory', currentHistory)
      if (currentHistory && currentHistory.records) {
        return currentHistory.records.some(record => record.promptNum === this.currentSentenceId + 1);
      }
      return false;
    },
    nameExists() {
      return this.records.some(record => record.name === this.name)
    },
  },
  methods: {
    async loadUserData() {
      try {
        const userData = await getUser(this.recordId);
        if (userData) {
          console.log('userData.prompt: ', userData.prompt)
          console.log('userData.time: ', userData.time)
          
          if (parseInt(userData.prompt) - 1 >= this.sentences.length) {
            this.currentSentenceId = this.sentences.length; // getUser에서 받은 prompt 값을 현재 문장 ID로 설정
          } else {
            this.currentSentenceId = parseInt(userData.prompt) - 1; // getUser에서 받은 prompt 값을 현재 문장 ID로 설정
          }
          this.totalRecordingTime = parseInt(userData.time); // getUser에서 받은 time 값을 총 녹음 시간으로 설정
          console.log('loadUserData this.currentSentenceId: ', this.currentSentenceId)
          console.log('loadUserData this.totalRecordingTime: ', this.totalRecordingTime)
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    async checkAllRecordingsDone() {
      if (this.currentRecordHistory.length === this.sentences.length) {
        const learning = window.confirm('모든 문장 녹음이 끝났으니 음성 모델을 학습합니다!')
        if (learning) {
          try {
            await startLearning(this.recordId);
          } catch (error) {
            console.error(error);
          }
        }
      }
    },
    handleBackButton() {
      this.goOut();
      this.$router.go(-1);
    },
    onSuccess(response) {
      console.log('Recording saved successfully:', response);
      // Handle the successful response, e.g., navigate to another page or show a message
    },

    // Failure callback
    onFail(error) {
      console.error('Failed to save recording:', error);
      // Handle the error, e.g., show an error message to the user
    },
    prevSentence() {
        if (this.currentSentenceId > 0) {
        this.currentSentenceId--;
        }
    },
    nextSentence() {
        if (this.currentSentenceId < this.sentences.length - 1) {
        this.currentSentenceId++;
        }
    },
    async record() {

      if (!this.audioContext) {
          console.error("AudioContext not initialized");
          return;
      }

      if (this.hasRecordedCurrent) {
          alert("이 문장은 이미 녹음되었습니다. 다른 문장을 선택해 주세요.");
          return;
      }

      if (this.recording) {
        this.stopRecording();
        return;
      }

      try {
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }

      console.log(this.audioContext.state)
      
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const input = this.audioContext.createMediaStreamSource(this.stream);

      let configs = { workerDir: "/web-audio-recorder/" };
      let recorder = new WebAudioRecorder(input, configs);
      this.setupRecorder(recorder);
      recorder.startRecording();

      this.recordingStatus = "Stop Recording";
      this.recording = true;
      this.blob = null;
      this.recordingStartTime = Date.now();
      this.updateElapsedTime();  // Make sure this method is defined

      } catch (error) {
      console.error("Error during recording setup:", error);
      }
  },


    updateElapsedTime() {
      this.timer = setInterval(() => {
      this.elapsedTime = Math.round((Date.now() - this.recordingStartTime) / 1000);
      }, 1000);
  },
    
    setupRecorder(recorder) {
      recorder.setOptions({
        timeLimit: 30,
        encodeAfterRecord: true,
        ogg: { quality: 0.5 },
        mp3: { bitRate: 160 },
      });

      recorder.onComplete = (recorder, blob) => {
        console.log('onCompleteblob: ', blob)
        this.blob = blob;
        this.recordHistoryStore.addRecord(this.recordId, {
          id: this.currentSentenceId, // Assuming this is the correct id to use
          promptNum: this.currentSentenceId + 1,
          elapsedTime: this.elapsedTime,
        });
 
        if (this.blob) {
        saveRecord(
          this.recordId,
          this.blob,
          // this.onSuccess, // pass the onSuccess callback
          // this.onFail    // pass the onFail callback
        );
        this.checkAllRecordingsDone()
      } else {
        console.error('Blob is not defined at the time of stopping the recording.');
      }

      };
      this.recorder = recorder;
    },

    stopRecording() {
      this.stream.getAudioTracks().forEach(track => track.stop());
      if (this.recorder) {
        this.recorder.finishRecording();
      }
      this.recordingStatus = "Record Sound";
      this.recording = false;
      clearInterval(this.timer);
      const duration = Math.round((Date.now() - this.recordingStartTime) / 1000);
      this.recordingDurations.push(duration);
      this.recordHistoryStore.addRecordingDuration(this.recordId, duration);
      this.elapsedTime = duration;
      this.recordingStartTime = null;
    },

    async goOut() {
      console.log('goOutrecordId: ', this.recordId)
      console.log('goOutprompt: ', this.currentSentenceId + 1)
      console.log('goOuttime: ', this.totalRecordingTime)
      console.log('goOutsuccess: ', this.onSuccess)
      console.log('goOutfail: ', this.onFail)
      goOutFromTrainer(
        this.recordId, 
        this.currentSentenceId,
        this.totalRecordingTime,
        this.onSuccess,
        this.onFail
      )
    }
  },
  beforeRouteLeave(to, from, next) {
    this.goOut()
    next()
  }
};

</script>

<style scoped>
.sentence-box {
  /* overflow: auto; */
  /* overflow-y: scroll;  */
  /* 오직 수직 스크롤만 활성화 */
  /* max-height: 500px; 적절한 최대 높이 설정 */
  justify-content: space-between;
  text-align: center;
  background-color: #EAF3F9;
  padding: 10px;
  margin: 10px 0;
  height: 380px;
  border-radius: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  position: relative;
}

.inner-box-3 {
  border: 1px solid #e0e0e0; /* 테두리 색 */
  border-radius: 24px; /* 모서리 둥글게 */
  padding: 40px; /* 내부 여백 */
  background-color: #f9f9f9; /* 배경색 */
  height: 10px; /* 고정 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로축 중앙 정렬 */
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 생성 */
}

.inner-box-4 {
  border: 1px solid #e0e0e0; /* 테두리 색 */
  border-radius: 24px; /* 모서리 둥글게 */
  padding: 40px; /* 내부 여백 */
  background-color: #f9f9f9; /* 배경색 */
  height: 8px; /* 고정 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 세로축 중앙 정렬 */
}

.inner-buttons-box {
  display: flex;
  justify-content: space-between;
  align-items: center; /* This ensures vertical centering */
  border: 1px solid #e0e0e0; /* Keep your styling */
  border-radius: 24px; /* Keep your styling */
  padding: 30px; /* Adjust as necessary */
  background-color: #f9f9f9; /* Keep your styling */
}



.inner-buttons-box {
  border: 1px solid #e0e0e0; /* 테두리 색 */
  border-radius: 24px; /* 모서리 둥글게 */
  padding: 30px; /* 내부 여백 */
  background-color: #f9f9f9; /* 배경색 */
}

.sentence-btn {
  position: absolute;
  top: 90%;
  transform: translateY(-50%);
}

.sentence-text {
  font-weight: bold;
  margin-top: 35px;
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

.left-btn img,
.right-btn img {
  width: 30px; /* 원하는 크기로 조정 */
  height: 30px; /* 원하는 크기로 조정 */
}


/* .left-btn {
  width: 180px;
  left: 0;
} */

.right-btn {
  width: 180px;
  right: 0;
}

.left-btn {
  left: 0;
}

.voice-title {
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 8px; 
  font-size: 30px; 
}

.voice-title button {
  font-size: 20px;
}

#app {
  text-align: center;
  color: #e47932;
}
</style>




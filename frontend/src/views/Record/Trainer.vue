<template>
  <div class="app mt-5">
    <p class="voice-title">음성 학습
      <button class='btn' @click="$router.back()">back</button>
    </p>

    <div class="sentence-box">
      <p>다음 문장을 소리내어 읽으세요.</p>
      <p>{{ currentSentence.sentence || '문장을 불러오는 중...' }}</p>
      <p>{{ currentSentenceId + 1 }} / {{ sentences.length }}</p>
      <div class="buttons">
        <button class="btn left-btn" @click="prevSentence" :disabled="currentSentenceId === 0">
          <img src="@/assets/voice/arrow-left.png" alt="">
        </button>
        <button class="btn right-btn" @click="nextSentence" :disabled="currentSentenceId === sentences.length - 1">
          <img src="@/assets/voice/arrow-right.png" alt="">
        </button>
      </div>
    </div>  

    <p class="voice-title">음성 녹음</p>

    <div class="voice-box">
      <div v-if="currentRecordHistory.length > 0">
        <div v-for="record in currentRecordHistory" :key="record.id">
          <div v-if="record.elapsedTime > 60">
            <div>{{ record.id + 1 }}번 녹음 시간: {{ Math.floor(record.elapsedTime / 60) }} 분 {{ record.elapsedTime % 60 }} 초</div>
          </div>
          <div v-else>
            <div>{{ record.id + 1 }}번 녹음 시간: {{ record.elapsedTime }} 초</div>
          </div>
        </div>
      </div>
        
      <div v-if="recording">
          <div v-if="elapsedTime > 60">
              <div>{{ currentSentenceId + 1}}번 녹음 시간: {{ Math.floor(elapsedTime / 60) }} 분 {{ elapsedTime % 60 }} 초</div>
          </div>
          <div v-else>
              <div>{{ currentSentenceId + 1}}번 녹음 시간: {{ elapsedTime }} 초</div>
          </div>
      </div>
      <div>
        <div v-if="totalRecordingTime > 60">
          <div>총 녹음 시간: {{ Math.floor(totalRecordingTime / 60) }} 분 {{ totalRecordingTime }} 초</div>
        </div>
        <div v-else>
          <div>총 녹음 시간: {{ totalRecordingTime }} 초</div>
        </div>
      </div>
      <div>
        <button class="mr-4" @click="record">
          {{ recordingStatus }}
        </button>
        <button color="primary" @click="fnFinish" :disabled="!isAllRecordingsDone">녹음 완료</button>
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
import { saveRecord, saveAudio } from '@/api/records'
import { loadKoreanCorpus } from '@/stores/koreanCorpus'
import { useRecordHistorystore } from '@/stores/recordHistory'
import { useRoute } from 'vue-router'



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
      sentences.value = sentencesArray.slice(0, 5); // 4000천 개의 문장 중에 우선 5개만
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
      recordId: null
    };
  },
  computed: {
    currentRecordHistory() {
      return this.recordHistoryStore.histories[this.recordId.toString()] || [];
    },
    cantSave() {
      return this.name === "" || !this.blob;
    },
    recordHistory() {
      return this.recordHistoryStore.recordHistory;
    },
    isAllRecordingsDone() {
      return this.recordHistoryStore.recordHistory?.length === this.sentences?.length;
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
      const currentHistory = this.recordHistoryStore.histories[this.recordId];
      if (Array.isArray(currentHistory)) {
        return currentHistory.some(record => record.id === this.currentSentenceId);
      }
      return false;
    },
    nameExists() {
      return this.records.some(record => record.name === this.name)
    },
  },
  methods: {
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
        this.recordHistoryStore.addRecord(this.recordId, {
          id: this.currentSentenceId, // Assuming this is the correct id to use
          promptNum: this.currentSentenceId + 1,
          elapsedTime: this.elapsedTime,
        });
        this.blob = blob;
        console.log("recordHistory", this.recordHistory)


        if (this.blob) {
        saveRecord(
          this.recordId,
          this.blob,
          this.currentSentenceId + 1,
          this.elapsedTime,
          this.onSuccess, // pass the onSuccess callback
          this.onFail    // pass the onFail callback
        );
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


    async fnFinish() {
      saveAudio({
        promptNum: this.sentences.length,
        success: this.onSuccess,
        fail: this.onFail
      })
      this.$router.push({name: 'Record'})
    }
  },
};

</script>

<style scoped>
.sentence-box {
  /* overflow: auto; */
  overflow-y: scroll; /* 오직 수직 스크롤만 활성화 */
  max-height: 500px; /* 적절한 최대 높이 설정 */
  justify-content: space-between;
  text-align: center;
  background-color: #EAF3F9;
  padding: 10px;
  margin: 10px 0;
  height: 260px;
  border-radius: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  position: relative;
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


.left-btn {
  width: 180px;
  left: 0;
}

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




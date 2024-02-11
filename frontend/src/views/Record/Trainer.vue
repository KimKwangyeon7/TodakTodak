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
        <div v-if="recordHistory.length > 0">
            <div v-for="record in recordHistory" :key="record.id">
              <div v-if="record.elapsedTime > 60">
                <div>{{ record.id+ 1  }}번 녹음 시간: {{ Math.floor(record.elapsedTime / 60) }} 분 {{ record.elapsedTime % 60 }} 초</div>
              </div>
              <div v-else>
                <div>{{ record.id+ 1  }}번 녹음 시간: {{ record.elapsedTime }} 초</div>
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
          <div>
              <label for="sound-name">Name:</label>
              <input id="sound-name" type="text" v-model="name" required placeholder="Enter Sound Name">
          </div>
          <div>
              <label for="sound-memo">Memo:</label>
              <input id="sound-memo" type="text" v-model="memo" placeholder="Enter Memo">
          </div>
        <button class="mr-4" @click="record">
          {{ recordingStatus }}
        </button>
        <button color="primary" @click="recordSave" :disabled="!isAllRecordingsDone">Save</button>
      </div>
    </div>
    
    <br>
    <p class="voice-title">학습 중인 음성</p>
    <div class="voice-box">
      <div v-for="record in records" :key="record.id">
          <div>name: {{ record.name }} / 총 녹음 시간 {{ totalRecordingTime }}초</div>
      </div>
    </div>    
  </div>
</template>

<script>
import { ref, computed } from 'vue'
  import { createNewVoice, saveRecord, saveAudio } from '@/api/records'
import { loadKoreanCorpus } from '@/stores/koreanCorpus'

export default {
  name: 'VoiceTrainer',
  setup() {
    const currentSentenceId = ref(0);
    const sentences = ref([]);
    const currentSentence = computed(() => sentences.value[currentSentenceId.value] || '');

    loadKoreanCorpus().then(sentencesArray => {
      sentences.value = sentencesArray.slice(0, 5); // 4000천 개의 문장 중에 우선 5개만
    }).catch(error => {
      console.error('Error loading Korean corpus:', error);
    });

    return { sentences, currentSentenceId, currentSentence, };
  },
  data() {
    return {
      recordingStatus: "Record Sound",
      recording: false,
      // records: [],
      recordHistory: [],
      name: "",
      memo: "",
      recorder: null,
      blob: null,
      stream: null,
      audioPlayer: null,
      isPlaying: false,
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      recordingStartTime: null,
      elapsedTime: 0,
      recordingDurations: [],
    };
  },
  computed: {
    cantSave() {
      return this.name === "" || !this.blob;
    },
    isAllRecordingsDone() {
      return this.recordHistory.length === this.sentences.length;
    },
    totalRecordingTime() {
      return this.recordingDurations.reduce((total, duration) => total + duration, 0);
    },
    hasRecordedCurrent() {
      return this.recordHistory.some(record => record.id  === this.currentSentenceId);
    },
    nameExists() {
      return this.records.some(record => record.name === this.name)
    },
    onSuccess(response){
        console.log(response.data)
    },
    onFail(error){
        console.error(error)
    },
  },
  methods: {
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

      if (this.name === "" || this.memo === "") {
          alert("녹음을 시작하기 전에 음성 제목과 메모를 입력해야 합니다.");
          return;
      } 
      
      if (!this.nameExists) {
          this.records.push({ id: this.currentSentenceId, name: this.name });
          // 음성 생성 api(post)
          // console.log("createNewVoice({ name: this.name, memo: this.memo }")
          createNewVoice({ name: this.name, memo: this.memo, onSuccess, onFail })
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
        this.recordingStatus = "Record Sound";
        this.blob = blob;
        this.recordHistory.push({ 
          id: this.currentSentenceId,
          promptNum: this.currentSentenceId + 1,
          elapsedTime: this.elapsedTime });
      };

      this.recorder = recorder;
    },

    stopRecording() {
      this.stream.getAudioTracks().forEach(track => track.stop());
      this.recorder.finishRecording();
      this.recordingStatus = "Record Sound";
      this.recording = false;
      clearInterval(this.timer);
      const duration = Math.round((Date.now() - this.recordingStartTime) / 1000);
      this.recordingDurations.push(duration);
      this.elapsedTime = duration;
      this.recordingStartTime = null;

      console.log("Current sentence ID:", this.currentSentenceId);

      console.log("recordHistory", this.recordHistory)

      saveRecord({ promptNum: this.current})
    },

    recordSave() {
      saveAudio
    },
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




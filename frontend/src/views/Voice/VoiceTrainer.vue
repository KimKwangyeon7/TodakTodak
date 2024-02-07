<template>
  <div class="app mt-5">
    <p class="voice-title">음성 학습
      <button @click="$router.back()">back</button>
    </p>

    <div class="sentence-box">
      <p>다음 문장을 소리내어 읽으세요.</p>
      <p>{{ currentSentence || '문장을 불러오는 중...' }}</p>
      <p>{{ currentSentenceId + 1 }} / {{ sentences.length }}</p>
      <div class="buttons">
        <button @click="nextSentence" :disabled="currentSentenceId === sentences.length - 1">></button>
      </div>
      <div v-if="recording">
        녹음 시간: {{ elapsedTime }} 초
      </div>
    </div>    

    <div id="app">
      <div>
        <input type="text" label="Sound Name" required v-model="title" />
        <button class="mr-4" @click="record">
          {{ recordingStatus }}
        </button>
        <button class="mr-4" @click="togglePlayPause">
          {{ isPlaying ? "Pause" : "Play Sound" }}
        </button>
        <button class="mr-4" @click="restartPlayback" :disabled="!blob || !audioPlayer">
          Restart
        </button>
        <button color="primary" @click="recordSave" :disabled="cantSave">Save</button>
      </div>
      <button v-if="isAllRecordingsDone" @click="startLearningProcess">학습하기</button>
    </div>

    <br>
    <p class="voice-title">학습 중인 음성</p>
    <div class="voice-box">
      <!-- Content here -->
    </div>    
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useVoicesStore } from '@/api/voices'
import { loadKoreanCorpus } from '@/stores/koreanCorpus'

export default {
  name: 'VoiceTrainer',
  setup() {
    const voicesStore = useVoicesStore()
    const currentSentenceId = ref(0)
    const sentences = ref(loadKoreanCorpus())
    const currentSentence = computed(() => sentences.value[currentSentenceId.value] || '')

    onMounted(async () => {
      await sentences.value;
      voicesStore.fetchCurrentSentence(voicesStore.state.user.uuid);
    });

    function nextSentence() {
      if (currentSentenceId.value < sentences.value.length - 1) {
        currentSentenceId.value++;
      }
    }

    return { sentences, currentSentenceId, currentSentence, nextSentence };
  },
  data() {
    return {
      recordingStatus: "Record Sound",
      recording: false,
      title: "",
      recorder: null,
      blob: null,
      stream: null,
      audioPlayer: null,
      isPlaying: false,
      audioContext: new (window.AudioContext || window.webkitAudioContext)(),
      recordingStartTime: null,
      elapsedTime: 0,
    };
  },
  computed: {
    cantSave() {
      return this.title === "" || !this.blob;
    },
    isAllRecordingsDone() {
      return this.currentSentenceId >= this.sentences.length;
    },
  },
  methods: {

  nextSentence() {
    if (this.currentSentenceId < this.sentences.length - 1) {
      this.currentSentenceId++;
    }
  },

  async record() {
      if (this.recording) {
        this.stopRecording();
        return;
      }

      try {
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }

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
        this.updateElapsedTime();
      } catch (error) {
        console.error("Error during recording setup:", error);
      }
    },

  async recordSave() {
    if (!this.blob) {
      console.error("No recording available to save");
      return;
    }

    // Transmit to server
    try {
      // voice.js 스토어의 saveRecord와 saveAudio 호출
      await voicesStore.dispatch('voices/saveRecord', this.currentSentenceId);
      await voicesStore.dispatch('voices/saveAudio', {
        prompt: this.currentSentence,
        promptNum: this.currentSentenceId
      });

      console.log("Record saved successfully");

      voicesStore.state.voices.currentSentenceIndex = voicesStore.currentSentenceId
      
      // 다음 프롬프트로 자동 이동
      this.nextSentence();
    } catch (error) {
      console.error('Error during saving record:', error);
    }
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
        this.setupAudioPlayer(blob);
      };

      this.recorder = recorder;
    },

    setupAudioPlayer(blob) {
      if (this.audioPlayer) {
        window.URL.revokeObjectURL(this.audioPlayer.src);
      }
      this.audioPlayer = new window.Audio();
      this.audioPlayer.src = window.URL.createObjectURL(blob);
      this.audioPlayer.addEventListener("ended", () => {
        this.isPlaying = false;
      });
    },

    stopRecording() {
      this.stream.getAudioTracks().forEach(track => track.stop());
      this.recorder.finishRecording();
      this.recordingStatus = "Record Sound";
      this.recording = false;
      clearInterval(this.timer);
      this.elapsedTime = Math.round((Date.now() - this.recordingStartTime) / 1000);
      this.recordingStartTime = null;
    },

    updateElapsedTime() {
      this.timer = setInterval(() => {
        this.elapsedTime = Math.round((Date.now() - this.recordingStartTime) / 1000);
      }, 1000);
    },

    togglePlayPause() {
      if (this.blob) {
        if (!this.audioPlayer) {
          this.setupAudioPlayer(this.blob);
        }
        this.isPlaying ? this.pauseAudio() : this.playAudio();
      }
    },

    playAudio() {
      if (this.audioPlayer && !this.isPlaying) {
        this.audioPlayer.play().then(() => {
          this.isPlaying = true;
        }).catch(error => {
          console.error("Playback error:", error);
          this.isPlaying = false;
        });
      }
    },
    
    pauseAudio() {
      if (this.audioPlayer && this.isPlaying) {
        this.audioPlayer.pause();
        this.isPlaying = false;
      }
    },

    restartPlayback() {
      if (this.audioPlayer) {
        this.audioPlayer.currentTime = 0;
        this.playAudio();
      }
    },

    async startLearningProcess() {
      const voicesStore = useVoicesStore();
      try {
        await voicesStore.startLearning();
        console.log("학습이 시작되었습니다.");
        // 추가적인 로직 (예: 다음 페이지로 이동)
      } catch (error) {
        console.error('학습 시작 중 오류 발생:', error);
      }
    },

  },
};
</script>

<style scoped>
  .sentence-box {
    /* overflow: auto; 요소 갯수에 알맞게 자동으로 높이 조절하는 역할 */
    overflow-y: scroll; /* 오직 수직 스크롤만 활성화 */
    max-height: 500px; /* 적절한 최대 높이 설정 */
    justify-content: space-between;
    text-align: center;
    align-items: right;
    flex-shrink: 0;
    background-color: #EAF3F9;
    padding: 10px;
    margin: 10px 0;
    border-radius: 24px;
    box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  }

  .voice-title {
    display: flex; /* Flexbox 레이아웃을 사용하여 내부 요소들을 가로로 배치 */
    justify-content: space-between; /* 요소들을 양 끝에 정렬 */
    align-items: center; /* 요소들을 세로로 가운데 정렬 */
    padding: 8px; /* 내부 여백 설정 */
    font-size: 30px; /* 폰트 크기 설정 (모바일 화면에서 크기 조절) */
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #e47932;
    margin-top: 60px;
  }
</style>
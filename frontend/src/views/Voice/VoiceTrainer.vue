<template>
  <div class="voice-trainer mt-5">
      
    <!-- 음성 학습 -->
    <p class="voice-title">음성 학습
      <button class='btn' @click="$router.back()">back</button>
    </p>
  
    <div class="sentence-box">
      <p class="sentence-head">다음 문장을 소리내어 읽으세요.</p>
      <p class="sentence-text">{{ currentSentence ? currentSentence.sentence : '문장을 불러오는 중...' }}</p>
      <!-- <p class="sentence-text">{{ currentSentenceId }} / {{ sentences.length }}</p> -->
      
      <div class="sentence-btn">
        <button class="btn left-btn" @click="prevSentence" :disabled="currentSentenceIndex === 0">
          <img src="@/assets/voice/arrow-left.png" alt="">
        </button>
        <button class="btn right-btn" @click="nextSentence" :disabled="currentSentenceIndex === sentences.length - 1">
          <img src="@/assets/voice/arrow-right.png" alt="">
        </button>
      </div>
    </div>    
    
    <div id="voice-training">
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
    </div>
    
    <br>
    
    <!-- 학습 중인 음성 -->
    <p class="voice-title">학습 중인 음성</p>
    <div class="voice-box">
    </div>    

  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { loadKoreanCorpus } from '@/stores/koreanCorpus'


export default {
  name: 'App',
  setup() {
    const sentences = ref([]);
    const currentSentenceId = ref(1);
    //test

    onMounted(async () => {
      try {
        sentences.value = await loadKoreanCorpus();
      } catch (error) {
        console.error('Error loading sentences:', error);
      }
    });

    const currentSentence = computed(() => {
      return sentences.value[currentSentenceId.value - 1] || {};
    });

    function prevSentence() {
      if (currentSentenceId.value > 1) {
        currentSentenceId.value--;
      }
    }

    function nextSentence() {
      if (currentSentenceId.value < sentences.value.length) {
        currentSentenceId.value++;
      }
    }

    return { sentences, currentSentenceId, currentSentence, prevSentence, nextSentence };
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
    };
  },
computed: {
  currentSentence() {
    return this.sentences[this.currentSentenceId];
  },
  cantSave() {
      return this.title === "" || !this.blob;
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
      } catch (error) {
        console.error("Error during recording setup:", error);
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
    async recordSave() {
      if (!this.blob) {
        console.error("No recording available to save");
        return;
      }
      
      // save in loacl
      const url = window.URL.createObjectURL(this.blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = this.title + ".wav";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);


      //transmit to server
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("audio", this.blob, this.title + ".wav");

      try {
        const response = await fetch('record/save/member', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log("Sound saved successfully");
        // 추가적인 처리 (예: 페이지 이동)
      } catch (error) {
        console.error("Error during sound saving:", error);
      }
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
  height: 220px;
  border-radius: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 17px;
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

.voice-title {
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  padding: 8px; 
  font-size: 25px; 
}

.voice-title button {
  font-size: 20px;
}

#app {
  text-align: center;
  color: #e47932;
}
</style>
<template>
  <div class="app mt-5">
      
    <!-- 음성 학습 -->
    <p class="voice-title">음성 학습
      <button class='btn' @click="$router.back()">back</button>
    </p>
  
    <div class="sentence-box">
      <p>다음 문장을 소리내어 읽으세요.</p>
      <p>{{ currentSentence ? currentSentence.sentence : '문장을 불러오는 중...' }}</p>
      <p p>{{ currentSentenceId + 1 }} / {{ sentences.length }}</p>
      <div class="buttons">
        <button class="btn" @click="prevSentence" :disabled="currentSentenceIndex === 0"><</button>
        <button class="btn" @click="nextSentence" :disabled="currentSentenceIndex === sentences.length - 1">></button>
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
import apiClient from '@/stores/apiClient'

export default {
  name: 'App',
  setup() {
    const sentences = ref([]);
    const currentSentenceId = ref(1);
    
    const voiceList = ref([]);

    const fetchVoiceList = async () => {
      try {
        const response = await apiClient.get('/record');
        voiceList.value = response.data;
      } catch (error) {
        console.error('Error fetching voice list:', error);
      }
    };

    onMounted(async () => {
      await fetchVoiceList();
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

    return { sentences, currentSentenceId, currentSentence, prevSentence, nextSentence, voiceList, fetchVoiceList };
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
  async createNewVoice() {
    if (this.title === "") {
      console.error("Title is required");
      return;
    }

    const payload = {
      title: this.title,
      memo: this.memo 
    };

    try {
      const response = await apiClient.post('/record', payload);
      if (response.status === 200) {
        console.log("New voice created successfully");
        // 추가 로직을 넣을 수 있음 (예: 상태 업데이트, 사용자에게 알림 등)
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error creating new voice:", error);
    }
  },
  async fetchVoiceDetail(recordId) {
    try {
      const response = await apiClient.get(`/record/${recordId}`);
      this.voiceDetail = response.data; // 'voiceDetail'을 데이터 속성으로 추가해야 합니다.
    } catch (error) {
      console.error('Error fetching voice detail:', error);
    }
  },
  async modifyVoice(recordId, title, memo) {
    const payload = {
      title,
      memo
    };
    try {
      const response = await apiClient.put(`/record/${recordId}`, payload);
      if (response.status === 200) {
        console.log("Voice modified successfully");
        // 추가 로직을 넣을 수 있음 (예: 상태 업데이트, 사용자에게 알림 등)
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error modifying voice:', error);
    }
  },
  async deleteVoice(recordId) {
    try {
      const response = await apiClient.delete(`/record/${recordId}`);
      if (response.status === 200) {
        console.log("Voice deleted successfully");
        // 추가적인 상태 업데이트나 사용자 알림 로직을 여기에 넣을 수 있습니다.
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting voice:', error);
    }
  },
  async selectVoice(recordId) {
    try {
      const response = await apiClient.put(`record/use`, { recordId });
      if (response.status === 200) {
        console.log("Voice selected successfully");
        // 여기에 추가적인 상태 업데이트나 사용자 알림 로직을 넣을 수 있습니다.
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error selecting voice:', error);
    }
  },
  async fetchRecordingPrompt(uuid) {
    try {
      const response = await apiClient.get(`record/prompt/${uuid}`);
      this.currentPrompt = response.data; // 'currentPrompt'를 데이터 속성으로 추가해야 합니다.
    } catch (error) {
      console.error('Error fetching recording prompt:', error);
    }
  },
  async saveRecord(promptNum) {
  try {
    await apiClient.post('record/save/member', { promptNum });
    console.log("Record saved successfully");
    // 추가적인 처리가 필요한 경우 여기에 로직 추가
  } catch (error) {
    console.error('Error saving record:', error);
  }
},
async saveAudio(prompt, promptNum) {
  const formData = new FormData();
  formData.append("audio", this.blob, `${this.title}.wav`);
  formData.append("prompt", prompt);
  formData.append("promptNum", promptNum);

  try {
    const response = await apiClient.post('record/save/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    this.nextPrompt = response.data; // 'nextPrompt'를 데이터 속성으로 추가해야 합니다.
  } catch (error) {
    console.error('Error saving audio:', error);
  }
},
async startLearning() {
  try {
    await apiClient.post('/learning');
    console.log("Learning started successfully");
    // 추가적인 처리가 필요한 경우 여기에 로직 추가
  } catch (error) {
    console.error('Error starting learning process:', error);
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
      
      // Save in local
      const url = window.URL.createObjectURL(this.blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = this.title + ".wav";
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Transmit to server
      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("audio", this.blob, this.title + ".wav");

      try {
        const response = await fetch('/api/record/save/member', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        console.log("Sound saved successfully");
        // Additional handling (e.g., page navigation)
      } catch (error) {
        console.error("Error during sound saving:", error);
      }
    },
    async saveRecordingToServer() {
      if (!this.blob) {
        console.error("No recording available to upload");
        return;
      }

      const formData = new FormData();
      formData.append("title", this.title);
      formData.append("audio", this.blob, `${this.title}.wav`);

      try {
        const response = await apiClient.post('/api/record/save/member', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        if (response.status === 200) {
          console.log("Recording uploaded successfully");
          // 여기에 추가 로직을 넣을 수 있음 (예: 상태 업데이트, 사용자에게 알림 등)
        } else {
          throw new Error(`Error: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error uploading recording:", error);
      }
    }
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
  height: 300px;
  border-radius: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 20px;
  position: relative;
}

.sentence-box button {
  font-size: 30px;
}

.voice-title {
  display: flex; /* Flexbox 레이아웃을 사용하여 내부 요소들을 가로로 배치 */
  justify-content: space-between; /* 요소들을 양 끝에 정렬 */
  align-items: center; /* 요소들을 세로로 가운데 정렬 */
  padding: 8px; /* 내부 여백 설정 */
  font-size: 30px; /* 폰트 크기 설정 (모바일 화면에서 크기 조절) */
}

.voice-title button {
  font-size: 20px;
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
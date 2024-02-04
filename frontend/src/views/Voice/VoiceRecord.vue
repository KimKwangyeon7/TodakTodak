<template>
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
      <button color="primary" @click="save" :disabled="cantSave">Save</button>
    </div>
    <canvas ref="canvas" width="800" height="100"></canvas>
  </div>
</template>

<script>
/*global WebAudioRecorder*/
export default {
  name: "App",

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
      animationFrameRequest: null, // 추가: 시각화를 위한 애니메이션 프레임 요청 ID
    };
  },
  computed: {
    cantSave() {
      return this.title === "" || !this.blob;
    },
  },
  mounted(){
    this.initializeCanvas()
  },
  methods: {


    initializeCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      // 캔버스 초기화
      ctx.fillStyle = 'rgb(200, 200, 200)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 기본 웨이브폼 그리기 (예시)
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(0, 0, 0)';
      ctx.beginPath();
      const middleY = canvas.height / 2;
      ctx.moveTo(0, middleY);
      for (let x = 0; x < canvas.width; x += 10) {
        ctx.lineTo(x, middleY);
      }
      ctx.stroke();
    },

    async record() {
      if (this.recording) {
        this.startVisualizing()
        this.stopRecording();
        return;
      }

      try {
        if (this.audioContext.state === 'suspended') {
          await this.audioContext.resume();
        }

        console.log("begin record");

        this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        const input = this.audioContext.createMediaStreamSource(this.stream);

        let configs = { workerDir: "/web-audio-recorder/" };
        let recorder = new WebAudioRecorder(input, configs);
        this.setupRecorder(recorder);
        recorder.startRecording();

        this.recordingStatus = "Stop Recording";
        this.recording = true;
        this.blob = null;
        console.log("Recording started");
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
        this.pauseAudio();
        this.visualize(this.stream);
      };

      this.recorder = recorder;
    },
    setupAudioPlayer(blob) {
      if (this.audioPlayer) {
        window.URL.revokeObjectURL(this.audioPlayer.src); // 이전 blob URL 해제
      }
      this.audioPlayer = new window.Audio();
      this.audioPlayer.src = window.URL.createObjectURL(blob);
      this.audioPlayer.addEventListener("ended", this.pauseAudio);
    },
    stopRecording() {
      this.stream.getAudioTracks().forEach(track => track.stop());
      this.recorder.finishRecording();
      this.recordingStatus = "Record Sound";
      this.recording = false;
      this.pauseAudio();
      if (this.animationFrameRequest) {
        cancelAnimationFrame(this.animationFrameRequest); // 시각화 중지
      }
      console.log("Recording stopped");
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
          this.startVisualizing(true);
          this.isPlaying = true;
          console.log("Playback started");
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
        if (this.animationFrameRequest) {
          cancelAnimationFrame(this.animationFrameRequest); // 시각화 중지
        }
        console.log("Playback paused");
      }
    },
    restartPlayback() {
      if (this.audioPlayer) {
        this.audioPlayer.currentTime = 0;
        this.playAudio();
      }
    },
    startVisualizing(isPlayback = false) {
      const analyser = this.audioContext.createAnalyser();
      let source
      
      if (isPlayback) {
        // 재생 시 사용할 소스 설정
        source = this.audioContext.createMediaElementSource(this.audioPlayer);
      } else {
        // 녹음 시 사용할 소스 설정
        source = this.audioContext.createMediaStreamSource(this.stream);
      }
      
      source.connect(analyser);
      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvas = this.$refs.canvas;
      const canvasContext = canvas.getContext('2d');

      const draw = () => {
        this.animationFrameRequest = requestAnimationFrame(draw);
        analyser.getByteTimeDomainData(dataArray);
        canvasContext.fillStyle = 'rgb(0, 0, 0)';
        canvasContext.fillRect(0, 0, canvas.width, canvas.height);
        canvasContext.lineWidth = 2;
        canvasContext.strokeStyle = 'rgb(255, 99, 71)';
        canvasContext.beginPath();
        let sliceWidth = canvas.width * 1.0 / bufferLength;
        let x = 0;
        for (let i = 0; i < bufferLength; i++) {
          let v = dataArray[i] / 128.0;
          let y = v * canvas.height / 2;
          if (i === 0) {
            canvasContext.moveTo(x, y);
          } else {
            canvasContext.lineTo(x, y);
          }
          x += sliceWidth;
        }
        canvasContext.lineTo(canvas.width, canvas.height / 2);
        canvasContext.stroke();
      };
      draw();
    },
    // save into local
    save() {
      if (!this.blob) {
      console.error("No recording available to save");
      return;
    }

    const url = window.URL.createObjectURL(this.blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = this.title + ".wav"; // 또는 .mp3, .ogg 등
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
    // transmit to server
//     async save() {
//   if (!this.blob) {
//     console.error("No recording available to save");
//     return;
//   }

//   const formData = new FormData();
//   formData.append("title", this.title);
//   formData.append("audio", this.blob, this.title + ".wav");

//   try {
//     const response = await fetch('YOUR_SERVER_ENDPOINT', {
//       method: 'POST',
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     console.log("Sound saved successfully");
//     // 추가적인 처리 (예: 페이지 이동)
//   } catch (error) {
//     console.error("Error during sound saving:", error);
//   }
// }

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e47932;
  margin-top: 60px;
}
</style>

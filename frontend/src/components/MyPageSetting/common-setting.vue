<!-- <template>
  <div>
    <button class="settings-back-button btn" @click="goBack">
        <img src="@/assets/back.png" alt="">
    </button>

    <div class="four-leaf-clover-page">
      <h1>행운의 네잎클로버</h1>
      <img src="@/assets/four-leaf-clover.jpg" class="mt-3" />
      <p>이 페이지에서 행운의 네잎클로버를 감상하세요!</p>
    </div>
  </div>
</template>

<script setup>
function goBack() {
    window.history.back()
}
</script>

<style scoped>
.settings-back-button {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: auto;
  display: flex;
  margin-bottom: 10px;
}

.four-leaf-clover-page {
  text-align: center;
  margin-top: 50px;
}

img {
  max-width: 100%; /* 이미지의 최대 너비를 화면 크기에 맞게 조정 */
}

h1 {
  font-size: 24px;
  color: #333;
}

p {
  font-size: 16px;
  color: #666;
  margin-top: 20px;
}
</style> -->
<template>
  <div>
    <audio ref="audioPlayer"></audio>
    <button @click="playFirstAudio">재생</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      audioList: [
        '/src/assets/audio/2_20240206_202920.wav',
        '/src/assets/audio/2_20240206_203020.wav',
      ]
    };
  },
  methods: {
    async playFirstAudio() {
      if (this.audioList.length > 0) {
        const audioUrl = this.audioList[0];

        // 음성 파일 재생
        const audioPlayer = this.$refs.audioPlayer;
        audioPlayer.src = audioUrl;
        await audioPlayer.play();

        // 재생이 끝나면 파일 삭제
        this.deleteAudioFile(audioUrl);
      }
    },
    async deleteAudioFile(audioUrl) {
      try {
        // 서버로 요청하여 음성 파일 삭제
        await axios.delete('/delete-audio', { data: { audioUrl } });

        // 음성 파일 리스트에서 삭제
        this.audioList.shift(); // 첫 번째 요소 삭제
      } catch (error) {
        console.error('음성 파일 삭제 중 오류 발생:', error);
      }
    }
  }
};
</script>

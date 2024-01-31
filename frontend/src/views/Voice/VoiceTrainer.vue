<template>
    <div class="app mt-5">
        
      <!-- 음성 학습 -->
      <p class="voice-title">음성 학습
        <button @click="$router.back()">back</button>
      </p>
    
      <div class="sentence-box">
        <p>다음 문장을 소리내어 읽으세요.</p>
        <p>{{ currentSentence.name }}</p>
        <p p>{{ currentSentence.id }} / {{ sentences.length }}</p>
        <div class="buttons">
          <button @click="prevSentence" :disabled="currentSentenceIndex === 0"><</button>
          <button @click="nextSentence" :disabled="currentSentenceIndex === sentences.length - 1">></button>
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
import { ref } from 'vue'

let sentences = ref([{id: 1, name: '안녕하세요. 좋은 아침입니다.'},
                     {id: 2, name: '안녕하세요. 좋은 점심입니다.'},
                     {id: 3, name: '안녕하세요. 좋은 저녁입니다.'}])

let currentSentenceId = ref(1)

export default {
  name: 'App',
  data() {
    return {
      sentences,
      currentSentenceId
    };
  },
  computed: {
    currentSentence() {
      return this.sentences[this.currentSentenceId];
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
</style>
<template>
    <div id="app">
        
      <!-- 음성 학습 -->
      <p class="voice-title">음성 학습
        <button @click="$router.back()">back</button>
      </p>
    
      <div class="sentence-box">
        <div class="buttons">
          <button @click="prevSentence" :disabled="currentSentenceIndex === 0"><</button>
          <button @click="nextSentence" :disabled="currentSentenceIndex === sentences.length - 1">></button>
        </div>
        <p>다음 문장을 소리내어 읽으세요.</p>
        <p>{{ currentSentence.name }}</p>
        <p p>{{ currentSentence.id }} / {{ sentences.length }}</p>
      </div>    
      
      <br>
      <!-- 학습 중인 음성 -->
      <p class="voice-title">학습 중인 음성</p>
      <div class="voice-box">
        
      </div>    
  
      <!-- 하단 네비게이션 바 -->
      <div class="bottom-nav">
        <div class="nav-item">Home</div>
        <div class="nav-item">Calendar</div>
        <div class="nav-item">Chat</div>
        <div class="nav-item">Meeting</div>
        <div class="nav-item">MyPage</div>
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
<style>

/* 전체 앱 스타일링 */
#app {
font-family: 'Avenir', Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
/* text-align: center; */
color: #2c3e50;
}

.voice {
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
}

/* 음성 선택*/
.voice-title {
display: flex;
justify-content: space-between;
align-items: center;
padding: 8px;
font-size: 25px;
font-weight: bold;
}

/* 음성 선택 */

.sentence-box {
width: 400px;
/* overflow: auto; 요소 갯수에 알맞게 자동으로 높이 조절하는 역할 */
overflow-y: scroll; /* 오직 수직 스크롤만 활성화 */
max-height: 500px; /* 적절한 최대 높이 설정 */
justify-content: space-between;
text-align: left;
align-items: right;
flex-shrink: 0;
background-color: #EAF3F9;
padding: 10px;
margin: 10px 0;
border-radius: 24px;
box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
}


/* 하단 네비게이션 바 스타일링 */
.bottom-nav {
position: fixed;
bottom: 0;
left: 50%; /* 가운데 정렬을 위해 왼쪽 50%로 설정 */
transform: translateX(-50%); /* 가운데 정렬을 위한 변형 */
width: 100%;
display: flex;
justify-content: space-around;
background-color: #f3f3f3;
padding: 10px 0;
}


.nav-item {
padding: 5px 10px;
}


.material-switch > input[type="checkbox"] {
display: none;
}

.material-switch > label {
cursor: pointer;
height: 0px;
position: relative;
top: 2px;
width: 40px;
}

.material-switch > label::before {
background: rgb(255, 255, 255);
border-radius: 16px;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
content: '';
height: 24px;
left: 12px;
margin-top: -12px;
position: absolute;
top: -4px;
transition: all 0.3s ease-in-out;
width: 24px;
}

.material-switch > label::after {
background: rgb(0, 0, 0);
box-shadow: inset 0px 0px 10px rgba(161, 160, 160, 0.5);
border-radius: 8px;
content: '';
height: 16px;
margin-top: -12px;
position: absolute;
opacity: 0.3;
transition: all 0.4s ease-in-out;
width: 50px;
}

.material-switch > input[type="checkbox"]:checked + label::before {
background: inherit;
left: 50px;
}

.material-switch > input[type="checkbox"]:checked + label::after {
background: #9EDBC5;
opacity: 0.6;
}


</style>
<template>
    <div id="app">
      <!-- 편집-->
      <p class="word-voice-edit">편집
        <router-link :to="{ name: 'VoiceTrainer' }" style="font-size: 40px;">+</router-link>
      </p>

      <!-- 음성 선택 -->
      <p class="voice-title">음성 선택</p>
      <div class="voice-box">
        <dl>
          <div v-for="voice in usable" :key="voice.id" class="voice">
            <dt>{{ voice.name }}</dt>
            <dd>
              <div class="material-switch">
                <input :id="`switch-${voice.id}`" name="s`switch-${voice.id}`" type="checkbox">
                <label :for="`switch-${voice.id}`" class="default-color"></label>
              </div>
            </dd>
          </div>
        </dl>
      </div>    
      
      <br>
      <!-- 학습 중인 음성 -->
      <p class="voice-title">학습 중인 음성</p>
      <div class="voice-box">
        <dl>
          <div v-for="voice in training" :key="voice.id" class="voice">
            <dt>{{ voice.name }}</dt>
            <dd>
              <div class="material-switch">
                <input :id="`switch-${voice.id}`" name="s`switch-${voice.id}`" type="checkbox">
                <label :for="`switch-${voice.id}`" class="default-color"></label>
              </div>
            </dd>

          </div>
        </dl>
      </div>    
  
    </div>
</template>

<script>
import { ref } from 'vue'

const usable = ref([])
const training = ref([])

for (let i = 1; i <= 15; i++) {
  usable.value.push({ id: `usable-${i}`, name: '학습된 음성 ' + i })
  training.value.push({ id: `training-${i}`, name: '훈련 중 ' + i })
}


export default {
  name: 'App',
  components: {
  },
  data() {
      return {
          usable,
          training
      }
  }
}
</script>

<style scoped>
.voice {
  display: flex; /* Flexbox 레이아웃을 사용하여 내부 요소들을 가로로 배치 */
  justify-content: space-between; /* 요소들을 양 끝에 정렬 */
  align-items: center; /* 요소들을 세로로 가운데 정렬 */
  padding: 10px; /* 내부 여백 설정 */
  border-bottom: 2px solid #e0e0e0; /* 밑줄 추가 */
}

.word-voice-edit {
  display: flex; /* Flexbox 레이아웃을 사용하여 내부 요소들을 가로로 배치 */
  justify-content: space-between; /* 요소들을 양 끝에 정렬 */
  align-items: center; /* 요소들을 세로로 가운데 정렬 */
  padding: 20px; /* 내부 여백 설정 */
  font-size: 30px; /* 폰트 크기 설정 (모바일 화면에서 크기 조절) */
}
/* 음성 선택*/
.voice-title {
  display: flex; /* Flexbox 레이아웃을 사용하여 내부 요소들을 가로로 배치 */
  justify-content: space-between; /* 요소들을 양 끝에 정렬 */
  align-items: center; /* 요소들을 세로로 가운데 정렬 */
  padding: 8px; /* 내부 여백 설정 */
  font-size: 30px; /* 폰트 크기 설정 (모바일 화면에서 크기 조절) */
  font-weight: bold; /* 글꼴 굵기 설정 */
}

/* 음성 선택 */
.voice-box {
  overflow-y: scroll; /* 수직 스크롤 활성화 */
  max-height: 500px; /* 최대 높이 설정 */
  justify-content: space-between; /* 요소들을 양 끝에 정렬 */
  align-items: center; /* 요소들을 세로로 가운데 정렬 */
  flex-shrink: 0; /* Flex 컨테이너에서 크기 조절 금지 */
  background-color: #EAF3F9; /* 배경색 설정 */
  padding: 10px; /* 내부 여백 설정 */
  border-radius: 24px; /* 테두리 반경 설정 */
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25); /* 그림자 효과 설정 */
}

.material-switch > input[type="checkbox"] {
  display: none; /* 체크박스 감춤 */
}

.material-switch > label {
  cursor: pointer; /* 포인터 모양으로 커서 변경 */
  height: 10px; /* 높이 설정 */
  position: relative; /* 상대 위치 설정 */
  top: 2px; /* 위쪽으로 약간 이동 */
  width: 40px; /* 너비 설정 */
}

  .material-switch > label::before {
  background: rgb(255, 255, 255); /* 배경색 설정 */
  border-radius: 16px; /* 테두리 반경 설정 */
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3); /* 그림자 효과 설정 */
  content: ''; /* 가상 요소의 내용 비우기 */
  height: 24px; /* 높이 설정 */
  left: -10px; /* 왼쪽으로 이동 */
  margin-top: -4px; /* 위쪽 여백 설정 */
  position: absolute; /* 절대 위치 설정 */
  transition: all 0.3s ease-in-out; /* 전체 속성에 대한 변화를 부드럽게 설정 */
  width: 24px; /* 너비 설정 */
  z-index: 1;
}

.material-switch > label::after {
  background: rgb(0, 0, 0); /* 배경색 설정 */
  box-shadow: inset 0px 0px 10px rgba(161, 160, 160, 0.5); /* 그림자 효과 설정 */
  border-radius: 10px; /* 테두리 반경 설정 */
  content: ''; /* 가상 요소의 내용 비우기 */
  height: 16px; /* 높이 설정 */
  margin-top: 0px; /* 위쪽 여백 설정 */
  position: absolute; /* 절대 위치 설정 */
  left: -10px; /* 왼쪽으로 이동 */
  opacity: 0.3; /* 불투명도 설정 */
  transition: all 0.4s ease-in-out; /* 전체 속성에 대한 변화를 부드럽게 설정 */
  width: 50px; /* 너비 설정 */
}


.material-switch > input[type="checkbox"]:checked + label::before {
  background: inherit; /* 체크 상태에서 배경색 유지 */
  left: 25px; /* 오른쪽으로 이동하여 체크 표시 */
}

.material-switch > input[type="checkbox"]:checked + label::after {
  background: red; /* 체크 상태에서 배경색 변경 */
  opacity: 0.6; /* 불투명도 설정 */
}


</style>
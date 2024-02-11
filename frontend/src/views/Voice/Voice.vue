<template>
  <div class="app mt-5">
    <p class="word-voice-edit">음성
      <router-link :to="{ name: 'VoiceTrainer' }" style="font-size: 40px;">+</router-link>
    </p>

    <!-- 음성 선택 -->
    <p class="voice-title">음성 선택</p>
    <div class="voice-box">
      <dl>
        <div v-for="voice in usable" :key="voice.id" class="voice">
          <dt>{{ voice.name }}</dt>
          <dd>
            <button class="toggle-button" :class="{ 'active': voice.isActive }" @click="toggleVoice(voice)">
              {{ voice.isActive ? '사용 중' : '적용하기' }}
            </button>
            <button class="delete-button" @click="showDeleteConfirmation(usable, voice.id)">삭제</button>
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
            <button class="toggle-button" :class="{ 'active': voice.isActive }" @click="toggleVoice(voice)">
              {{ voice.isActive ? '사용 중' : '적용하기' }}
            </button>
            <button class="delete-button" @click="showDeleteConfirmation(training, voice.id)">삭제</button>
          </dd>
        </div>
      </dl>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const usable = ref([]);
const training = ref([]);

for (let i = 1; i <= 5; i++) {
  usable.value.push({ id: `usable-${i}`, name: '학습된 음성 ' + i, isActive: false });
  training.value.push({ id: `training-${i}`, name: '훈련 중 ' + i, isActive: false });
}

const toggleVoice = (voice) => {
  voice.isActive = !voice.isActive;
};

const showDeleteConfirmation = (list, id) => {
  const confirmed = window.confirm('정말 삭제하시겠습니까?');
  if (confirmed) {
    deleteVoice(list, id);
  }
}

const deleteVoice = (list, id) => {
  const index = list.findIndex(voice => voice.id === id);
  if (index !== -1) {
    list.splice(index, 1);
  }
}


</script>


<style scoped>
.voice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 2px solid #e0e0e0;
}

.word-voice-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px;
  font-size: 25px;
  font-weight: bold;
}

.voice-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 20px;
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

.toggle-button {
  cursor: pointer;
  background: #e0e0e0;
  border: none;
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 14px;
}

.toggle-button.active {
  background: red;
  color: white;
}

.delete-button {
  cursor: pointer;
  background: #ff3333; /* 삭제 버튼 색상은 사용자에게 명확하게 나타내기 위해 변경 가능 */
  border: none;
  border-radius: 16px;
  padding: 5px 10px;
  font-size: 14px;
  margin-left: 10px; /* 삭제 버튼 간격 조절 가능 */
  color: white;
}
</style>

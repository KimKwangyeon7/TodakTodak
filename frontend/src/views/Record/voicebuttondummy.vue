
<template>
    <div class="app mt-5">
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
  
  <script setup>
  import { ref } from 'vue';
  
  const usable = ref([]);
  const training = ref([]);
  
  for (let i = 1; i <= 15; i++) {
    usable.value.push({ id: `usable-${i}`, name: '학습된 음성 ' + i });
    training.value.push({ id: `training-${i}`, name: '훈련 중 ' + i });
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
    font-size: 30px;
    font-weight: bold;
  }
  
  .voice-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    font-size: 30px;
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
  
  .material-switch > input[type="checkbox"] {
    display: none;
  }
  
  .material-switch > label {
    cursor: pointer;
    height: 10px;
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
    left: -10px;
    margin-top: -4px;
    position: absolute;
    transition: all 0.3s ease-in-out;
    width: 24px;
    z-index: 1;
  }
  
  .material-switch > label::after {
    background: rgb(0, 0, 0);
    box-shadow: inset 0px 0px 10px rgba(161, 160, 160, 0.5);
    border-radius: 10px;
    content: '';
    height: 16px;
    margin-top: 0px;
    position: absolute;
    left: -10px;
    opacity: 0.3;
    transition: all 0.4s ease-in-out;
    width: 50px;
  }
  
  .material-switch > input[type="checkbox"]:checked + label::before {
    background: inherit;
    left: 25px;
  }
  
  .material-switch > input[type="checkbox"]:checked + label::after {
    background: red;
    opacity: 0.6;
  }
  </style>
  
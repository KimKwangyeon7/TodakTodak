<template>
    <div>
        <button class="settings-back-button btn" @click="goBack">
          <img src="@/assets/back.png" alt="">
        </button>
        <div class="settings">
          <router-link to="/goal" class="nav-link">
              개인정보 변경
            </router-link>
            <router-link to="/calendar" class="nav-link">
              알림 관리
            </router-link>
            <router-link to="/board" class="nav-link">
              일반 설정
            </router-link>
            <router-link to="/meet" class="nav-link">
              앱 정보
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

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
}

.settings {
  font-size: 25px;
  padding: 20px;
  margin-left: 10px;
}
</style>
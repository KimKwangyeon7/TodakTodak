<template>
    <div class="friend-profile">
      <div class="modal-background" @click="closeProfile"></div>
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">친구 프로필</h5>
            <button class="back-button" @click="goBack">뒤로가기</button>
          </div>
          <div class="modal-body" v-if="friend">
            <p><strong>이름:</strong> {{ friend.name }}</p>
            <p><strong>나이:</strong> {{ friend.age }}</p>
          </div>
        </div>
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
/* 적절한 스타일링 코드를 추가하세요. */
</style>

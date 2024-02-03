<template>
    <div>
        <button class="settings-back-button" @click="goBack">뒤로가기</button>
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
  background-color: #0084ff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: auto;
  display: flex;
}

</style>
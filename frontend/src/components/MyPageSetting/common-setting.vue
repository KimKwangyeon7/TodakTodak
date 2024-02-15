<template>
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
</style>

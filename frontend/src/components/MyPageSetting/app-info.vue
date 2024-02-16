<template>
    <div>
        <button class="settings-back-button btn" @click="goBack">
            <img src="@/assets/back.png" alt="">
        </button>
        <div class="app-info">
        <h2>Todak Todak</h2><br>
        <p>삼성 청년 SW 아카데미 10기</p>
        <p>공통 프로젝트</p>
        <p>광주 2반 10팀</p>
        <p>김광연, 김도휘, 김요한, 김준형, 천승현</p>
        <p>버전: 1.0.0</p>
        <p>배포일: 2024년 2월 16일</p>
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


.app-info {
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}
</style>
  
<!-- eslint-disable no-unused-vars -->

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Main from "@/views/Main.vue";
import MyPage from "@/views/MyPage.vue";
import { RouterLink, RouterView } from "vue-router";
import { useMemberStore } from "@/stores/auth";

// import { initializeApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   isSupported,
// } from "firebase/messaging";

let today = new Date();

const authStore = useMemberStore();

const closeModal = () => {
  is_modal_valid.value = false;
};

const handleLoginClick = () => {
  // 여기에서 로그인 상태 확인
};
</script>

<template>
  <div v-if="authStore.isLogin" class="mt-5">
    <Sidebar />
    <!-- 하단 네비게이션 바 -->
    <div class="bottom-nav">
      <RouterLink to="/Main" class="nav-item">
        <img class="nav-icon" src="@/assets/bottom-nav/home.png" alt="" /> Home
      </RouterLink>
      <RouterLink to="/Calendar" class="nav-item">
        <img class="nav-icon" src="@/assets/sidebar/calendar.png" alt="" />
        Calendar
      </RouterLink>
      <RouterLink to="/friends" class="nav-item">
        <img class="nav-icon" src="@/assets/bottom-nav/Lucide.png" alt="" />
        Friends
      </RouterLink>
      <RouterLink to="/mypage" class="nav-item">
        <img class="nav-icon" src="@/assets/bottom-nav/profile.png" alt="" />
        MyPage
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <div class="welcome-screen">
      <h1 class="welcome-message">Todak Todak
        <img src="" alt="">
      </h1>
        <div class="auth-buttons">
          <RouterLink to="/login" class="auth-button">로그인</RouterLink>
          <RouterLink to="/signup" class="auth-button">회원가입</RouterLink>
        </div>
    </div>
  </div>
  <RouterView />
</template>

<style>
/* 전체 앱 스타일링 */
#app {
  font-family: "SUITE-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 25px;
  padding-bottom: 90px;
}

/* 상단 바 스타일링 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
}

.quote {
  font-size: 10px;
}

/* 할 일 목록 스타일링 */

/* 하단 네비게이션 바 스타일링 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%; /* 가운데 정렬을 위해 왼쪽 50%로 설정 */
  transform: translateX(-50%); /* 가운데 정렬을 위한 변형 */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center; /* 세로 가운데 정렬 추가 */
  background-color: #eaf3f9;
  padding: 10px;
  z-index: 999;
  height: 80px;
  font-size: 12px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
}

.nav-icon {
  width: 30px;
  height: 30px;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0, 5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

@font-face {
  font-family: "SUITE-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2")
    format("woff2");
  font-weight: 400;
  font-style: normal;
}

.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-message {
  font-size: 24px;
  margin-bottom: 30px;
}

.auth-buttons {
  display: flex;
  flex-direction: row;
}

.auth-button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #3498db;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
}

.auth-button:hover {
  background-color: #2980b9;
  transform: scale(1.05); /* 마우스를 올렸을 때 버튼이 확대되는 효과 */
  transition: transform 0.3s ease; /* 부드러운 변화를 위한 transition 추가 */
}

</style>

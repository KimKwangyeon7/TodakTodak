<template>
  <div>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/" class="navbar-brand mx-auto">Todak Todak</router-link>
        <button type="button" class="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNotifications" aria-controls="offcanvasNotifications">
          <img src="@/assets/bell.png" alt="">
        </button>
        <!-- 수정된 부분: Notifications 컴포넌트 추가 -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" data-bs-toggle="offcanvas">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">메뉴 전체보기</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <router-link to="/main" class="nav-link">
              <img src="@/assets/sidebar/todo.png" alt=""> To-do
            </router-link>
            <router-link to="/goal" class="nav-link">
              <img src="@/assets/sidebar/goal.png" alt=""> 목표 만들기
            </router-link>
            <router-link to="/calendar" class="nav-link">
              <img src="@/assets/sidebar/calander.png" alt=""> 캘린더
            </router-link>
            <router-link to="/meeting" class="nav-link">
              <img src="@/assets/sidebar/meeting.png" alt=""> 모임
            </router-link>
            <router-link to="/board" class="nav-link">
              <img src="@/assets/sidebar/board.png" alt=""> 게시판
            </router-link>
            <router-link to="/Friend" class="nav-link">
              <img src="@/assets/sidebar/friend.png" alt=""> 친구
            </router-link>
            <router-link to="/habit" class="nav-link">
              <img src="@/assets/sidebar/habit.png" alt=""> 습관
            </router-link>
            <router-link to="/voice" class="nav-link">
              <img src="@/assets/sidebar/voice.png" alt=""> 음성
            </router-link>
            <router-link to="/mypage" class="nav-link">
              <img src="@/assets/sidebar/profile.png" alt=""> 마이페이지
            </router-link>
            <p style="color:red">잠깐 아래 부분 푸시 알림 테스트 용도로 쓸게요!!</p>
            <router-link to="/subscribe" class="nav-link" style="color:red"><span class="emoji"></span> subscribe</router-link>
            <router-link to="/pushnotify" class="nav-link" style="color:red"><span class="emoji"></span> pushnotify</router-link>

          </div>
        </div>
      </div>
    </nav>
    
    <!-- 수정된 부분: Notifications 컴포넌트 추가 -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNotifications" aria-labelledby="offcanvasNotificationsLabel" data-bs-toggle="offcanvas">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasNotificationsLabel">알림</h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <notifications></notifications>
      </div>
    </div>
  </div>
</template>

<script setup>
import Friend from '@/views/Friend.vue'
import Notifications from '@/components/Notifications.vue'

const components = {
  Friend,
  Notifications,
}
</script>

<style scoped>
.offcanvas-title {
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
  font-family: 'SUITE-Regular';
}

.offcanvas-body {
  font-size: 27px;
  text-align: left;
  display: flex;
  flex-direction: column;
  font-family: 'SUITE-Regular';
}

.offcanvas-body .nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: 10px;
}

.offcanvas-body img {
  margin-right: 20px;
  max-width: 35px; 
}

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}
</style>

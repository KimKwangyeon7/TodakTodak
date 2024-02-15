<template>
  <div>
    <nav class="navbar bg-white fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/main" class="todak-logo navbar-brand mx-auto">
          <img src="@/assets/todak/todak-logo.png" alt="">
        </router-link>
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
              <img src="@/assets/sidebar/calendar.png" alt=""> 캘린더
            </router-link>
            <router-link to="/friends" class="nav-link">
              <img src="@/assets/sidebar/friend.png" alt=""> 친구
            </router-link>
            <router-link to="/habit" class="nav-link">
              <img src="@/assets/sidebar/habit.png" alt=""> 습관
            </router-link>
            <router-link to="/records" class="nav-link">
              <img src="@/assets/sidebar/voice.png" alt=""> 음성
            </router-link>
            <router-link to="/mypage" class="nav-link">
              <img src="@/assets/sidebar/profile.png" alt=""> 마이페이지
            </router-link>
            <!-- <router-link to="/subscribe" class="nav-link" style="color:red"><span class="emoji"></span> subscribe</router-link>
            <router-link to="/pushnotify" class="nav-link" style="color:red"><span class="emoji"></span> pushnotify</router-link> -->
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
import Notifications from '@/components/Notifications.vue'

</script>

<style scoped>
.todak-logo img {
  max-width: 100px;
}
.offcanvas-title {
  font-size: 24px;
  font-weight: 400;
  margin-left: 10px;
  font-family: 'SUITE-Regular';
}

.offcanvas-body {
  font-size: 18px;
  text-align: left;
  display: flex;
  flex-direction: column;
  font-family: 'SUITE-Regular';
}

.offcanvas-body .nav-link {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: 20px;
}

.offcanvas-body img {
  margin-right: 20px;
  max-width: 30px; 
}

.navbar-toggler:focus {
  outline: none; /* 포커스 시 아웃라인 제거 */
  box-shadow: none; /* 포커스 시 박스 쉐도우 제거 */
}

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}
</style>

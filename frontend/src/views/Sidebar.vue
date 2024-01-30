<template>
  <div>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/" class="navbar-brand mx-auto">Todak Todak</router-link>
        <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNotifications" aria-controls="offcanvasNotifications">
          알림
        </button>
        <!-- 수정된 부분: Notifications 컴포넌트 추가 -->
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" data-bs-toggle="offcanvas">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">메뉴 전체보기</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <router-link to="/goal" class="nav-link"><span class="emoji">🎯</span> 목표 만들기</router-link>
            <router-link to="/calendar" class="nav-link"><span class="emoji">📅</span> 캘린더</router-link>
            <router-link to="/meeting" class="nav-link"><span class="emoji">🤝</span> 모임</router-link>
            <router-link to="/board" class="nav-link"><span class="emoji">📋</span> 게시판</router-link>
            <router-link to="/Friend" class="nav-link"><span class="emoji">👫</span> 친구</router-link>
            <router-link to="/habit" class="nav-link"><span class="emoji">🔄</span> 습관</router-link>
            <router-link to="/voice" class="nav-link"><span class="emoji">🔊</span> 음성</router-link>
            <router-link to="/mypage" class="nav-link"><span class="emoji">👤</span> 마이페이지</router-link>
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
  font-size: 35px;
  font-weight: bold;
  font-family: 'SOYOMapleBoldTTF';
}

.offcanvas-body {
  font-size: 30px;
  text-align: left;
  font-family: 'SOYOMapleBoldTTF';
}

.offcanvas-body .emoji {
  margin-right: 15px;
}

@font-face {
  font-family: 'SOYOMapleBoldTTF';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/SOYOMapleBoldTTF.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
}
</style>

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
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" data-bs-toggle="offcanvas">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Todak</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <router-link to="/goal" class="nav-link">목표 만들기</router-link>
            <router-link to="/calendar" class="nav-link">캘린더</router-link>
            <router-link to="/meeting" class="nav-link">모임</router-link>
            <router-link to="/board" class="nav-link">게시판</router-link>
            <router-link to="/Friend" class="nav-link">친구</router-link>
            <router-link to="/habit" class="nav-link">습관</router-link>
            <router-link to="/voice" class="nav-link">음성</router-link>
            <router-link to="/mypage" class="nav-link">마이페이지</router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Friend from '@/views/Friend.vue'

export default {
  name: 'Sidebar',
  components: {
    Friend,
  },
}
</script>

<style scoped>
/* 여기에 컴포넌트의 스타일을 추가하세요 */
</style>

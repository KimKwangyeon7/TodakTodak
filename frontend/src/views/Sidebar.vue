<template>
  <div>
    <nav class="navbar bg-body-tertiary fixed-top">
      <div class="container-fluid d-flex justify-content-between align-items-center">
        <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand mx-auto" href="#">토닥토닥</a>
        <button type="button" class="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNotifications" aria-controls="offcanvasNotifications">
          알림
        </button>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Todak</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li class="nav-item">
                <RouterLink @click.native="closeSidebar" to="/calendar">캘린더1111</RouterLink>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">캘린더</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">모임</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">게시판</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">친구</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">습관</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">마이페이지</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Calendar from '@/views/Calendar.vue'

import { RouterLink, RouterView } from 'vue-router'

export default {
  name: 'Sidebar',
  components: {
    Calendar,
    RouterView,
    RouterLink,
  },
  methods: {
      // 변경된 부분: 페이지 이동 시 Sidebar를 닫는 메서드
      closeSidebar() {
        console.log('closeSidebar method called');
        this.$root.$emit('bv::toggle::offcanvas', 'offcanvasNavbar');
      },
    },
}
</script>

<style scoped>
/* 여기에 컴포넌트의 스타일을 추가하세요 */
</style>
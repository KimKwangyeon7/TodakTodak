<template>
  <div class="mt-5">
    <Sidebar />

    <!-- 하단 네비게이션 바 -->
    <div class="bottom-nav">
      <RouterLink to="/Main" class="nav-item">
        <img class='nav-icon' src="@/assets/bottom-nav/home.png" alt=""> Home
      </RouterLink>
      <RouterLink to="/Calendar" class="nav-item">
        <img class='nav-icon' src="@/assets/sidebar/calendar.png" alt=""> Calendar
      </RouterLink>
      <RouterLink to="/Friend" class="nav-item">
        <img class='nav-icon' src="@/assets/bottom-nav/Lucide.png" alt=""> Friends
      </RouterLink>
      <RouterLink to="/mypage" class="nav-item">
        <img class='nav-icon' src="@/assets/bottom-nav/profile.png" alt=""> MyPage
      </RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import TodoList from '@/views/Todo/TodoList.vue'
import Main from '@/views/Main.vue'
import MyPage from '@/views/MyPage.vue'

import { RouterLink, RouterView } from 'vue-router'

let today = new Date()
console.log(today)

export default {
  name: 'App',
  data() {
    return {
      is_modal_valid: false,
    }
  },
  components: {
    Sidebar,
    TodoList,
    Main,
    MyPage,
    RouterView,
    RouterLink,
},
  methods: {
    closeModal() {
      this.is_modal_valid = false
    }
  }
}
</script>

<style>
/* 전체 앱 스타일링 */
#app {
    font-family: 'SUITE-Regular';
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
  background-color: #EAF3F9;
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
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0, 5);
  position: fixed; padding: 20px;
}

.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}

@font-face {
    font-family: 'SUITE-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
}
</style>
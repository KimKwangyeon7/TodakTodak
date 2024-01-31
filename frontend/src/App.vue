<template>
  <div id="app">
    <Sidebar />

    <!-- 하단 네비게이션 바 -->
    <div class="bottom-nav">
      <RouterLink to="/">Home</RouterLink>
      <div class="nav-item">Calendar</div>
      <div class="nav-item">Chat</div>
      <div class="nav-item">Meeting</div>
      <RouterLink to="/mypage">MyPage</RouterLink>
    </div>
    <RouterView />
  </div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue'
import TodoList from '@/views/TodoList.vue'
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
  
  // Vue 인스턴스의 데이터와 메소드를 여기에 정의합니다.
}
</script>

<style>
/* 전체 앱 스타일링 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
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
  background-color: #f3f3f3;
  padding: 10px 0;
}


.nav-item {
  padding: 5px 10px;
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
</style>
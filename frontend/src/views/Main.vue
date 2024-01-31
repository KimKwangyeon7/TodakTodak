<template>
    <!-- 모달 -->
    <div class="black-bg"  v-if="is_modal_valid">
        <component :is="activeModal" @close-modal="closeModal" />
    </div>

    <!-- 명언 -->
    <div class="top-bar">
        <div class="quote">"행복은 우연이 아니라 선택이다"</div>
        <div>짐 론</div>
    </div>
    
    <!-- 투두리스트 -->
    <div class="todo-section"> 
        <div class="todo-date">
            <!-- <span>{{ today }}</span> -->
        </div>
        <div class="todo-items">
            <div class="todo-item">
                <label @click="openModal('TodoList')"  for="todo1">공부하기</label>
                <input type="checkbox">
            </div>
            <div class="todo-item">
                <label @click="openModal('TodoList')"  for="todo2">운동하기</label>
                <input type="checkbox">
            </div>
        </div>
    </div>
    <!-- 목표 -->
    <div class="todo-section"> 
        <div class="todo-date">
            <!-- <span>{{ today }}</span> -->
        </div>
        <div class="todo-items">
            <div class="todo-item">
                <label @click="openModal('GoalList')"  for="todo1">약먹기</label>
                <input type="checkbox">
            </div>
            <div class="todo-item">
                <label @click="openModal('GoalList')"  for="todo2">밥먹기</label>
                <input type="checkbox">
            </div>
        </div>
    </div>
</template>


<script>
import Sidebar from '@/views/Sidebar.vue'
import TodoList from '@/views/TodoList.vue'
import GoalList from '@/views/GoalList.vue'

let today = new Date()
console.log(today)

export default {
  name: 'App',
  data() {
    return {
      is_modal_valid: false,
      activeModal: null
    }
  },
  components: {
    Sidebar,
    TodoList,
    GoalList,
  },
  methods: {
    openModal(component) {
        this.is_modal_valid = true
        this.activeModal = component
    },
    closeModal() {
      this.is_modal_valid = false
      this.is_modal_valid = null
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
  text-align: center;
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
.todo-section {
  background-color: #EAF3F9; 
  border-radius: 20px; 
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
}

.todo-date {
  font-weight: bold;
  margin-bottom: 5px;
}

.todo-item {
  display: flex;
  align-items: center;
}

.todo-item input[type="checkbox"] {
  margin-right: 5px;
}

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
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 투명한 검은색 배경 */
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
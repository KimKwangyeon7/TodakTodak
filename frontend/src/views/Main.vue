<template>
  <div>

  <!-- 모달 -->
  <div class="black-bg" v-if="is_modal_valid">
    <component :is="activeModal" @close-modal="closeModal" />
  </div>

  <!-- 명언 -->
  <div class="top-bar">
    <div class="quote">"행복은 우연이 아니라 선택이다"</div>
    <div>짐  론</div>
  </div>

  <!-- 투두리스트 -->
  <div class="todo-section">
    <div class="todo-date">
      <span>{{ today }}</span>
      <!-- Todo 생성버튼 -->
      <button class="add-button" @click="openModal('AddTodo')">+</button>
    </div>

    <div class="todo-items">
      <div class="todo-item">
        <label @click="openModal('TodoList')" for="todo1">공부하기</label>
        <input type="checkbox">
      </div>
      <div class="todo-item">
        <label @click="openModal('TodoList')" for="todo2">운동하기</label>
        <input type="checkbox">
      </div>
    </div>
  </div>

  <!-- 목표 -->
  <div class="todo-section">
    <div class="todo-date">
     <div style="margin-bottom: 5px; margin-top: 5px;">목표</div>
    </div>
    <div class="todo-items">
      <div class="todo-item">
        <label @click="openModal('GoalList')" for="todo1">약먹기</label>
        <input type="checkbox">
      </div>
      <div class="todo-item">
        <label @click="openModal('GoalList')" for="todo2">밥먹기</label>
        <input type="checkbox">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue'
import TodoList from '@/views/TodoList.vue'
import GoalList from '@/views/GoalList.vue'
import AddTodo from '@/views/AddTodo.vue'

export default {
  name: 'App',
  data() {
    return {
      is_modal_valid: false,
      activeModal: null,
      today: '', // 현재 날짜를 저장할 데이터 속성 추가
    }
  },
  components: {
    Sidebar,
    TodoList,
    GoalList,
    AddTodo,
  },
  methods: {
    openModal(component) {
      this.is_modal_valid = true
      this.activeModal = component
    },
    closeModal() {
      this.is_modal_valid = false
      this.activeModal = null
    },
    updateToday() {
      const now = new Date()
      const options = { month: '2-digit', day: '2-digit',  weekday: 'long' }
      this.today = now.toLocaleDateString('ko-KR', options)
    },
  },
  mounted() {
    // 컴포넌트가 화면에 나타날 때 현재 날짜 업데이트
    this.updateToday()
  },
}
</script>

<style scoped>
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
  text-align: left;
  display: flex;
  justify-content: space-between; /* 요일과 버튼을 각각 왼쪽과 오른쪽에 배치 */
  align-items: center; /* 세로 중앙 정렬 */
}

.add-button {
  font-size: 20px;
  background-color: #EAF3F9;
  color: #000; /* 검정색 텍스트 색상 */
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 5px; /* 내용물과 버튼 사이의 간격 조절을 위한 패딩 */
}


.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between; /* 체크박스를 오른쪽으로 이동 */
}

.todo-item input[type="checkbox"] {
  margin-right: 5px;
}

/* 하단 네비게이션 바 스타일링 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #f3f3f3;
  padding: 10px 0;
}

/* 모달 스타일링 */
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  top: 0;
  left: 0;
}

.white-bg {
  width: 100%; 
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>

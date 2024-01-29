<template>
    <div id="app">
        <Sidebar />
        <!-- 명언 -->
        <div class="top-bar">
        <div class="quote">"행복은 우연이 아니라 선택이다"</div>
        <div>짐 론</div>
        </div>

        <!-- 투두리스트 -->
        <div class="todo-section">
        <div class="todo-date">
            <span>{{ today }}</span>
        </div>
        <div class="todo-items">
            <div class="todo-item">
            <label for="todo1">할 일 추가하기</label>
            <input type="checkbox" id="todo1">
            </div>
            <div class="todo-item">
            <label for="todo2">쇼핑 가기</label>
            <input type="checkbox" id="todo2">
            </div>
        </div>
        </div>
        <!-- 목표 -->
        <div class="todo-section"> 
        <div class="todo-date">
            <span>{{ today }}</span>
        </div>
        <div class="todo-items">
            <div class="todo-item">
            <label for="todo1">약먹기</label>
            <input type="checkbox" id="todo1">
            </div>
            <div class="todo-item">
            <label for="todo2">박먹기</label>
            <input type="checkbox" id="todo2">
            </div>
        </div>
        </div>
    </div>
</template>

<script>
let today = new Date()
console.log(today)

export default {
  name: 'App',
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
  background-color: #ecf0f1;
  padding: 10px;
  margin: 10px 0;
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


</style>
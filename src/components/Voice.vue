<template>
  <div id="app">
    <!-- 편집-->
    <p class="word-voice-edit">편집</p>

    <!-- 음성 선택 -->
    <p class="box-title">음성 선택</p>
    <div class="voice-list">
        <div class="voice">
          <label for="todo1">할 일 추가하기</label>
          <input type="checkbox" id="todo1">
        </div>
        <div class="voice">
          <label for="todo2">쇼핑 가기</label>
          <input type="checkbox" id="todo2">
        </div>
        <div class="row">
          <div class="col-2">
            <p>Default :</p>
          </div>
          <span class="col-1">
            <div class="md-form">
              <div class="material-switch">
                <input id="switch-default" name="switch-default" type="checkbox">
                <label for="switch-default" class="default-color"></label>
              </div>
            </div>
          </span>
        </div>
    </div>
  
    
    <br>
    <!-- 학습 중인 음성 -->
    <p class="box-title">학습 중인 음성</p>
    <div class="voice-list"> 
      <div class="todo-item">
        <label for="todo1">약먹기</label>
        <input type="checkbox" id="todo1">
      </div>
      <div class="todo-item">
        <label for="todo2">박먹기</label>
        <input type="checkbox" id="todo2">
      </div>
      <div class="row">
        <div class="col">
          <div class="jumbotron">
            <div class="row">
              <div class="col-2">
                <p>Primary :</p>
              </div>
              <div class="col-1">
                <div class="md-form">
                  <div class="material-switch">
                    <input id="switch-primary" name="switch-primary" type="checkbox">
                    <label for="switch-primary" class="primary-color"></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Secondary :</p>
              </div>
              <div class="col-1">
                <div class="md-form">
                  <div class="material-switch">
                    <input id="switch-secondary" name="switch-secondary" type="checkbox">
                    <label for="switch-secondary" class="secondary-color"></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Success :</p>
              </div>
              <div class="col-1">
                <div class="md-form">
                  <div class="material-switch">
                    <input id="switch-success" name="switch-success" type="checkbox">
                    <label for="switch-success" class="success-color"></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Info :</p>
              </div>
              <div class="col-1">
                <div class="md-form">
                  <div class="material-switch">
                    <input id="switch-info" name="switch-info" type="checkbox">
                    <label for="switch-info" class="info-color"></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Warning :</p>
              </div>
              <div class="col-1">
                <div class="md-form">
                  <div class="material-switch">
                    <input id="switch-warning" name="switch-warning" type="checkbox">
                    <label for="switch-warning" class="warning-color"></label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-2">
                <p>Danger :</p>
              </div>
              <div class="col-1">
                <div class="md-form">
                  <div class="material-switch">
                    <input id="switch-danger" name="switch-danger" type="checkbox">
                    <label for="switch-danger" class="danger-color"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 네비게이션 바 -->
    <div class="bottom-nav">
      <div class="nav-item">Home</div>
      <div class="nav-item">Calendar</div>
      <div class="nav-item">Chat</div>
      <div class="nav-item">Meeting</div>
      <div class="nav-item">MyPage</div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/views/Sidebar.vue'

let today = new Date()
console.log(today)

export default {
  name: 'App',
  components: {
    Sidebar
  },
  // Vue 인스턴스의 데이터와 메소드를 여기에 정의합니다.
}
</script>

<style>
@import url('http://getbootstrap.com/dist/css/bootstrap.css');


/* 전체 앱 스타일링 */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

/* 편집 */
.word-voice-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 25px;
}

/* 음성 선택*/
.box-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  font-size: 25px;
  font-weight: bold;
}

/* 음성 선택 */

.voice-list {
  width: 300px;
  height: 248px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #EAF3F9;
  padding: 10px;
  margin: 10px 0;
  border-radius: 24px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
}


.voice {
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


.material-switch > input[type="checkbox"] {
display: none;
}

.material-switch > label {
cursor: pointer;
height: 0px;
position: relative;
top: 2px;
width: 40px;
}

.material-switch > label::before {
background: rgb(255, 255, 255);
border-radius: 16px;
box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
content: '';
height: 24px;
left: -4px;
margin-top: -8px;
position: absolute;
top: -4px;
transition: all 0.3s ease-in-out;
width: 24px;
}

.material-switch > label::after {
background: rgb(0, 0, 0);
box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
border-radius: 8px;
content: '';
height: 16px;
margin-top: -8px;
position: absolute;
opacity: 0.3;
transition: all 0.4s ease-in-out;
width: 50px;
}

.material-switch > input[type="checkbox"]:checked + label::before {
background: inherit;
left: 30px;
}

.material-switch > input[type="checkbox"]:checked + label::after {
background: #9EDBC5;
opacity: 0.5;
}


</style>
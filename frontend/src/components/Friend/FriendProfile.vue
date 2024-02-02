<template>
  <div class="friend-profile">
    <div class="profile-dialog profile-dialog-centered" role="document">
      <div class="profile-content">
        <div class="profile-header">
          <h5 class="profile-title">친구 프로필</h5>
          <button class="back-button" @click="goBack">뒤로가기</button>
        </div>
        <div class="profile-body" v-if="friend">
          <div class="profile-info">
            <img :src="friend.profilePicture" alt="프로필 사진" class="profile-picture" />
            <p><strong></strong> {{ friend.name }}</p>
            <p><strong></strong> {{ friend.memo }}</p>
          </div>

          <div class="goal-list">
            <h6><strong>목표 리스트</strong></h6>
            <ul>
              <li v-for="(goal, index) in friend.goals" :key="index">{{ goal }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

function goBack() {
  window.history.back()
}

const friend = ref({
  name: '김싸피',
  memo: '오늘만 살자',
  profilePicture: '/src/assets/damgom.png',
  goals: ['목표 1', '목표 2', '목표 3']
})
</script>

<style scoped>
.profile-content {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.profile-header {
  background-color: #0084ff;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
}

.profile-body {
  padding: 20px;
}

.profile-info {
  text-align: center;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.goal-list {
  margin-top: 20px;
}

.goal-list h6 {
  color: #0084ff;
}

.goal-list ul {
  list-style-type: none;
  padding: 0;
}

.goal-list li {
  margin-bottom: 8px;
}

/* 필요한 경우 추가적인 스타일링 코드를 작성하세요. */
</style>


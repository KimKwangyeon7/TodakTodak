<template>
  <div class="friend-profile">
<<<<<<< HEAD
    <div class="friend-profile-dialog" role="document">
=======
    <div class="profile-dialog profile-dialog-centered" role="document">
>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
      <div class="profile-content">
        <div class="profile-header">
          <h5 class="profile-title">친구 프로필</h5>
          <button class="back-button" @click="goBack">뒤로가기</button>
        </div>
<<<<<<< HEAD
        <div class="profile-body" v-if="friend">
          <!-- 프로필 사진, 이름, 메모 표시 -->
          <div class="profile-info">
            <img :src="friend.profilePicture" alt="프로필 사진" class="profile-picture" />
            <p><strong>이름:</strong> {{ friend.name }}</p>
            <p><strong>메모:</strong> {{ friend.memo }}</p>
          </div>
          
          <!-- 목표 리스트 표시 -->
          <div class="goal-list">
            <h6><strong>목표 리스트</strong></h6>
            <ul>
              <li v-for="(goal, index) in friend.goals" :key="index">{{ goal }}</li>
            </ul>
=======

        <div class="profile-body" v-if="friend">
          <div class="profile-info">
            <img :src="friend.profilePicture" alt="프로필 사진" class="profile-picture" />
            <p class="profile-name">{{ friend.name }}</p>
            <p class="profile-memo">{{ friend.memo }}</p>
>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
          </div>
        </div>

        <div class="goal-list">
          <p class="goal-list-title">목표 리스트</p>
          <ul>
            <li v-for="(goal, index) in friend.goals" :key="index">{{ goal }}</li>
          </ul>
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
<<<<<<< HEAD
  name: '친구 이름',
  age: 25,
  memo: '친구에 대한 메모',
  profilePicture: 'URL 또는 이미지 경로',
  goals: ['목표 1', '목표 2', '목표 3']
=======
  name: '김싸피',
  memo: '오늘만 살자',
  profilePicture: '/src/assets/damgom.png',
  goals: ['교촌치킨 주문', '네네치킨 주문', '노랑통닭 주문']
>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
})
</script>

<style scoped>
<<<<<<< HEAD

=======
>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
.profile-content {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.profile-header {
  background-color: #0084ff;
  color: #fff;
<<<<<<< HEAD
  padding: 10px;
=======
  padding: 5px;
>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
  display: flex;
  justify-content: space-between;
  align-items: center;
}

<<<<<<< HEAD
=======
.profile-title {
  margin-top: 10px;
}

.profile-name {
  font-size: 25px;
  font-weight: bold;
}

.profile-memo {
  font-size: 15px;
}

>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
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

<<<<<<< HEAD
.goal-list h6 {
  color: #0084ff;
=======
.goal-list-title {
  font-size: 25px;
  font-weight: bold;
  color:#0084ff;
>>>>>>> ef41bd7757d8e55acd0a3398b0717bceac2f7e4a
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


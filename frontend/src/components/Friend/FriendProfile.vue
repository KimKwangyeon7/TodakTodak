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
            <div class="profile-name">{{ friend.name }}</div>
            <div class="profile-memo">{{ friend.memo }}</div>
            <button class="friend-add btn btn-success btn-sm ml-2"
              @click.stop="followFriend(friend)"
              :class="{ 'following': friend.following }">
              {{ friend.following ? '친구!' : '친구 신청' }}
            </button>
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
// import friends from '@/data/friends' 

function goBack() {
  window.history.back()
}

const friend = ref({
  name: '김싸피',
  memo: '오늘만 살자',
  profilePicture: '/src/assets/damgom.png',
  goals: ['와플대학 입학', '청년카페 취업', '김밥천국 승천'],
  following: false  // 친구 추가 여부에 따라 초기값 설정
})

const followFriend = (friend) => {
  friend.following = !friend.following
}
</script>

<style scoped>
.profile-content {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.profile-header {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.profile-title {
  font-size: 25px;
}

.profile-name {
  font-size: 25px;
  font-weight: bold;
}

.profile-memo {
  font-size: 15px;
  margin-bottom: 10px;
}

.back-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.profile-body {
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  border-color: #EAF3F9;
  position: relative;
  overflow: hidden;
  background-color: #EAF3F9;
  color: black;
  margin-bottom: 10px;
  border-radius: 24px;
  overflow-y: auto;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
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
  border-color: #EAF3F9;
  position: relative;
  overflow: hidden;
  background-color: #EAF3F9;
  color: black;
  margin-bottom: 10px;
  border-radius: 24px;
  justify-content: space-between;
  align-items: center;
  overflow-y: auto;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
}

.goal-list-title {
  margin-top: 10px;
  margin-left: 20px;
  font-size: 25px;
}

.goal-list ul {
  list-style-type: none;
  padding: 0;
}

.goal-list li {
  margin-left: 22px;
  margin-bottom: 5px;
}

/* 팔로잉 중일 때의 버튼 스타일 */
.friend-add button.following {
  background-color: #28a745;
  border-color: #28a745;
}

/* 팔로잉 중이 아닐 때의 버튼 스타일 */
.friend-add button:not(.following) {
  background-color: #007bff;
  border-color: #007bff;
}

</style>

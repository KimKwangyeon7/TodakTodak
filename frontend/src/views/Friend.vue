<template>
  <div class="friend-list container mt-5">
    <!-- 검색 기능 -->
    <div class="mb-3">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="친구 검색">
    </div>

    <!-- 친구 리스트 -->
    <ul class="list-group">
      <li v-for="friend in filteredFriends" :key="friend.id" class="list-group-item" @click="showProfile(friend)">
        <div class="friend-item" @click="showProfile(friend)">
          <img :src="friend.profilePicture" alt="프로필 이미지" class="profile-image mr-2">
          <span>{{ friend.name }}</span>
        </div>
        <div class="buttons">
          <button class="btn btn-primary btn-sm" @click.stop="startChat(friend)">채팅</button>
        </div>
      </li>
    </ul>

    <!-- 친구 프로필 모달 -->
    <router-view @close="resetSelectedFriend" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import FriendProfile from '@/components/Friend/FriendProfile.vue';

const router = useRouter()

const showProfile = (friend) => {
  // 모달 대신 페이지로 전환
  const route = {
    path: '/friend-profile',
    component: FriendProfile,
    props: { friend },
  };

  // Vue Router를 사용하여 페이지 전환
  router.push(route);
};

const resetSelectedFriend = () => {
  // 친구 프로필 페이지 닫기
  router.push('/friend');
};

const searchQuery = ref('');
const friends = ref([
  { id: 1, name: '김철수', age: 25 },
  { id: 2, name: '김영희', age: 30 },
  { id: 3, name: '김싸피', age: 28 },
  { id: 4, name: '손흥민', age: 25 },
  { id: 5, name: '봉준호', age: 30 },
  { id: 6, name: '김준호', age: 28 },
  { id: 7, name: '카리나', age: 25 },
  { id: 8, name: '공유', age: 30 },
  { id: 9, name: '황정민', age: 28 },
]);

const selectedFriend = ref(null);

const filteredFriends = computed(() => {
  return friends.value.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const startChat = (friend) => {
  // 채팅을 시작하는 메소드를 구현할 수 있습니다.
  console.log('채팅 시작:', friend.name);
};
</script>

<style scoped>
.friend-list {
  max-width: 100%;
  margin: auto;
}

.modal-content {
  background-color: #EAF3F9;
  color: black;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

/* 모달 배경 */
.modal.show {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top:0; left: 0; bottom: 0; right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.list-group-item {
  border-color: #EAF3F9;
  position: relative;
  overflow: hidden;
  background-color: #EAF3F9; /* Info색상에 대한 적절한 색상 코드 사용 */
  color: black; /* 텍스트를 흰색으로 설정 */
  margin-bottom: 10px;
      border-radius: 24px;
  justify-content: space-between;
  align-items: center;
}

.friend-item {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-right: 80px; /* 버튼들의 너비만큼 여백을 주세요 */
}

.buttons {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 2;
}

.buttons button {
  margin-left: 5px;
}
</style>

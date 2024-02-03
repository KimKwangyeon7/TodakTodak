<template>
  <div class="friend-list container mt-5">
    <div class="friend-search mb-3">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="친구 검색">
    </div>

    <ul class="list-group">
      <li v-for="friend in filteredFriends" :key="friend.id" class="list-group-item" @click="showProfile(friend)">
        <div class="friend-item">
          <img :src="friend.profilePicture" alt="프로필 이미지" class="profile-image mr-2">
          <span>{{ friend.name }}</span>
        </div>
        <div class="buttons">
          <button class="btn btn-success btn-sm ml-2"
                  @click.stop="followFriend(friend)"
                  :class="{ 'following': friend.following }">
            {{ friend.following ? '친구' : '친구 추가' }}
          </button>
          <button class="btn btn-primary btn-sm" @click.stop="startChat(friend)">채팅</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

import FriendProfile from '@/components/Friend/FriendProfile.vue';
import Chat from '@/components/Friend/Chat.vue'

const router = useRouter();

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

const selectedFriend = ref(null);

const goBackHandler = () => {
  router.push('/friend')
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

const filteredFriends = computed(() => {
  return friends.value.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const startChat = (friend) => {
  selectedFriend.value = friend;
  const route = {
    path: '/chat',
    component: Chat,
  };
  router.push(route);
};

const followFriend = (friend) => {
  // 이미 팔로잉 중이면 팔로잉 취소, 아니면 팔로잉 추가
  const index = friends.value.findIndex(f => f.id === friend.id);
  if (index !== -1) {
    friends.value[index].following = !friends.value[index].following;
  }
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
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.list-group-item {
  border-color: #EAF3F9;
  position: relative;
  overflow: hidden;
  background-color: #EAF3F9;
  color: black;
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
  padding-right: 80px;
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

/* 팔로잉 중일 때의 버튼 스타일 */
.buttons button.following {
  background-color: #28a745;
  border-color: #28a745;
}

/* 팔로잉 중이 아닐 때의 버튼 스타일 */
.buttons button:not(.following) {
  background-color: #007bff;
  border-color: #007bff;
}

</style>
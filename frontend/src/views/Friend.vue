<template>
  <div class="friend-list container mt-5">
    <div class="friend-header">
      <div class="friend">친구</div>
      <div class="friend-buttons">
        <button class="create-chat-button btn" @click="toggleSearch">
          <div class="search"><img src="@/assets/search.png" alt=""></div>
        </button>
        <button class="create-chat-button btn" @click="showFriendRequestList">
          <img src="@/assets/user-plus.png" alt=""></button>
        <CreateRoomModal v-if="showModal" @close="closeCreateRoomModal" @create="createRoom" />
      </div>
    </div>

    <div class="friend-search mb-3" v-show="showSearch">
      <input v-model="searchQuery" type="text" class="form-control" placeholder="친구 검색">
    </div>

    <ul class="list-group">
      <li v-for="friend in filteredFriends" :key="friend.id" class="list-group-item" @click="showProfile(friend)">
        <div class="friend-item">
          <img :src="getProfilePicture" alt="프로필 이미지" class="profile-image mr-2">
          <span class="friend-name">{{ friend.name }}</span>
        </div>
        <div class="buttons">
          <button class="btn btn-sm" @click.stop="startChat(friend)">
            <img src="@/assets/messages.png" alt="">
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import FriendProfile from '@/components/Friend/FriendProfile.vue'
import Chat from '@/components/Friend/Chat.vue'
import FriendRequestList from '@/components/Friend/FriendRequestList.vue' // FriendRequestList 컴포넌트 추가

const router = useRouter()

const showProfile = (friend) => {
  const route = {
    path: '/friend-profile',
    component: FriendProfile,
    props: { friend },
  }

  router.push(route)
}

const selectedFriend = ref(null)
const showSearch = ref(false)
const searchQuery = ref('')

const friends = ref([
  { id: 1, name: '김철수', age: 25, profilePicture: '@/assets/profile-default.jpg' },
  { id: 2, name: '김영희', age: 30, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 3, name: '김싸피', age: 28, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 4, name: '손흥민', age: 25, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 5, name: '봉준호', age: 30, profilePicture: '@/assets/profile-default.jpg' },
  { id: 6, name: '김준호', age: 28, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 7, name: '카리나', age: 25, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 8, name: '공유', age: 30, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 9, name: '황정민', age: 28, profilePicture: '@/assets/profile-default.jpg'  },
  { id: 10, name: '윈터', age: 25, profilePicture: '@/assets/profile-default.jpg'  },
])

const filteredFriends = computed(() => {
  return friends.value.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const startChat = (friend) => {
  selectedFriend.value = friend;
  const route = {
    path: '/chat',
    component: Chat,
  }
  router.push(route)
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

const showFriendRequestList = () => { // showFriendRequestList 메서드 추가
  router.push('/friendRequestList'); // FriendRequestList 컴포넌트로 이동
}

const getProfilePicture = (friend) => {
  return friend.profilePicture || '@/assets/profile-default.jpg';
}
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

.friend-name {
  margin-left: 10px;
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
  overflow-y: auto;
  
}

.friend-item {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-right: 80px;
  font-size: 18px;
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


.friend-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.friend-buttons {
  display: flex;
  margin-left: auto;
}

.friend {
  font-size: 25px;
}
</style>

<template>
  <div class="friend-list container mt-5">
    <div class="friend-header">
      <div class="friend">친구</div>
      <div class="friend-buttons">
        <button class="btn" @click="toggleSearch">
          <div class="search"><img src="@/assets/search.png" alt=""></div>
        </button>
        <button class="btn" @click="showFriendRequestList">
          <img src="@/assets/user-plus.png" alt="">
        </button>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { findByNickname } from '@/api/member';
import FriendProfile from '@/components/Friend/FriendProfile.vue'
// import FriendRequestList from '@/components/Friend/FriendRequestList.vue'

onMounted(() => {
  getMemberInfo()
  // 여기에 DOM에 접근하거나 외부 API 호출 등의 로직을 작성할 수 있습니다.
});

// 사용자 정보를 저장할 반응형 참조
const memberInfo = ref(null);

// 닉네임을 기반으로 회원 정보를 조회하는 함수
const getMemberInfo = async (nickname) => {
  try {
    const response = await findByNickname(nickname);
    memberInfo.value = response.data;  // 조회된 회원 정보를 memberInfo에 저장
    console.log('회원 정보 조회 성공', response.data);
  } catch (error) {
    console.error('회원 정보 조회 실패', error);
  }
};

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

const friends = ref([])

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

const showFriendRequestList = () => { 
  router.push('/friendRequestList'); 
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

.friend-name {
  margin-left: 10px;
}

.profile-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
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

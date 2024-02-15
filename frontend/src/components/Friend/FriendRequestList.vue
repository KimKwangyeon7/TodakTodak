<template>
    <div class="friend-request-list mt-5">
      <div class="friend-request-header">
        <h2 class="list-title">친구 요청 리스트</h2>
        <div class="friend-buttons">
        <button class="btn" @click="toggleSearch">
          <div class="search"><img src="@/assets/search.png" alt=""></div>
        </button>
      </div>
        <button class="back-button btn" @click="goBack">뒤로가기</button>
      </div>
      
      <!-- 닉네임검색 -->
      <div class="friend-search mb-3" v-show="showSearch">
      <input v-model="nickname" type="text"
       class="form-control" placeholder="친구 검색"
       @keyup.enter="getMemberInfo(nickname)"
       >
    </div>

      <div v-if="friendRequests.length === 0" class="empty-list-message">닉네임을 검색해주세요.</div>
      <div v-else>
        <div v-for="request in friendRequests" :key="request.id" class="friend-request">
          <div class="request-info">
            <img :src="request.profilePicture" alt="프로필 사진" class="profile-picture" />
            <div class="request-details">
              <div class="request-name">{{ request.name }}</div>
              <div class="request-memo">{{ request.memo }}</div>
              <div class="request-memo">{{ request.nickname }}</div>
            </div>
          </div>
          <div class="request-buttons">
            <button class="accept-button" @click="sendFriend(request.nickname)">
              {{ request.isRequesting ? '요청중' : '친구요청' }}
            </button>
            <!-- <button class="accept-button" @click="acceptRequest(request.id)">친구요청</button> -->
            <!-- <button class="reject-button" @click="rejectRequest(request.id)">거절</button> -->
          </div>
        </div>
      </div>
    </div>
  
</template>

<script setup>
import { ref } from 'vue'
import { findByNickname } from '@/api/member';
import { sendFriendRequest } from '@/api/friend'
import { acceptFriends } from '@/api/friend'



// 사용자 정보를 저장할 반응형 참조
const memberInfo = ref(null);
const nickname = ref(null)
const requestFriend = ref(null)

const getMemberInfo = async (nickname) => {
findByNickname(nickname, ({ data }) => {
  console.log("data: ", data);
  requestFriend.value = data;
  friendRequests.value.push(data)
  const nicknameObject = { nickname: data.nickname };
  console.log('nicknameObject', nicknameObject)
  console.log("requestFriend: ", requestFriend.value);
  }
 )
}

const sendFriend = async (nickname) => {
  const nicknameObject = { nickname: nickname };
  console.log('nicknameObject', nicknameObject)
  sendFriendRequest(nicknameObject, ({ data }) => {
    console.log("data: ", data);
  })
}

const showSearch = ref(false)
const searchQuery = ref('')

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (!showSearch.value) {
    searchQuery.value = ''
  }
}

// 친구 요청 리스트 데이터
const friendRequests = ref([])


// 친구 요청 수락 기능
const acceptRequest = (requestId) => {
// 요청 수락 로직 구현
console.log(`친구 요청 ID ${requestId}를 수락했습니다.`)
friendRequests.value = friendRequests.value.filter(request => request.id !== requestId)
}

// 친구 요청 거절 기능
const rejectRequest = (requestId) => {
// 요청 거절 로직 구현
console.log(`친구 요청 ID ${requestId}를 거절했습니다.`)
friendRequests.value = friendRequests.value.filter(request => request.id !== requestId)
}



const goBack = () => {
window.history.back()
}
</script>


<style scoped>
.friend-request-header {
padding: 5px;
display: flex;
justify-content: space-between;
align-items: center;
}

.list-title {
font-size: 24px;
margin-bottom: 10px;
}

.empty-list-message {
font-size: 18px;
color: gray;
}

.friend-request {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 10px;
padding: 10px;
background-color: #f9f9f9;
border-radius: 8px;
}

.request-info {
display: flex;
align-items: center;
}

.profile-picture {
width: 50px;
height: 50px;
border-radius: 50%;
margin-right: 10px;
}

.request-details {
display: flex;
flex-direction: column;
}

.request-name {
font-weight: bold;
}

.request-memo {
color: gray;
}

.request-buttons {
display: flex; /* 추가 */
}

.accept-button,
.reject-button {
padding: 5px 10px;
border: none;
border-radius: 5px;
cursor: pointer;
}

.accept-button {
background-color: #28a745;
color: white;
}

.reject-button {
background-color: #dc3545;
color: white;
}
</style>

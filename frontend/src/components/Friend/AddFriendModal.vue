<template>
  <div class="modal-content" style="border-radius: 10px">
    <div class="modal-title">
      <div>친구요청함</div>
      <button type="button" class="btn-close" aria-label="Close" 
              @click="closeModal">
      </button>
    </div>
    <div v-if="friendRequests && friendRequests.length > 0">
      <div 
          v-for="request in friendRequests"
          :key="request.id"
          class="friend-request"
        >
          <div class="request-info">
            <img
              :src="request.profilePicture"
              alt="프로필 사진"
              class="profile-picture"
            />
            <div class="request-details">
              <div class="request-memo">{{ request.nickname }}</div>
              <div class="request-memo">{{ request.memo }}</div>
            </div>
          </div>
          <div class="request-buttons">     
            <button class="accept-button" @click="acceptFriend(request.nickname)">확인</button>
            <button class="reject-button" @click="rejectFriend(request.nickname)">삭제</button>
          </div> 
        </div>
    </div>
    <div v-else class="no-requests">
      받은 친구 요청이 없습니다.
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import { acceptFriends } from '@/api/friend'
import { acceptFriendRequest } from "@/api/friend";
import { rejectFriendRequest } from "@/api/friend";

onMounted(() => {
  sendToMeAcceptFriends()
  // 컴포넌트가 마운트된 후의 추가 로직을 여기에 작성
});

// 'close-modal' 이벤트를 정의합니다.
const emit = defineEmits(['close-modal']);

// 모달을 닫는 함수
function closeModal() {
  emit('close-modal'); // 'close-modal' 이벤트를 발생시킵니다.
}

const friendRequests = ref(null);

const sendToMeAcceptFriends = async () => {
  acceptFriends(({ data }) => {
    friendRequests.value = data;
    console.log("friendRequests: ", friendRequests.value);
  });
};

const acceptfriendRequests = ref(false)

// 친구요청 수락
const acceptFriend = async (nickname) => {
  acceptFriendRequest(nickname, ({ data }) => {
    acceptfriendRequests.value = true;
    friendRequests.value = friendRequests.value.filter(request => request.nickname !== nickname);
  });
};

// 친구요청 거절
const rejectFriend = async (nickname) => {
  rejectFriendRequest(nickname, ({ data }) => {
    acceptfriendRequests.value = false;
    friendRequests.value = friendRequests.value.filter(request => request.nickname !== nickname);
  });
};

</script>

<style scoped>
.modal-content {
  background: #fff; /* 나머지 부분은 하얀색 배경 */
}

.modal-title {
  background: #eaf3f9; /* 제목 부분에만 #EAF3F9 배경 색상 적용 */
  padding: 10px; /* 여백 추가 */
  border-radius: 8px;
  margin-bottom: 20px; /* 여백 추가 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
}

.btn-close {
  width: 20px;
  height: 20px;
  background-color: #eaf3f9; /* 배경 색상 수정 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto; /* 나머지 공간을 최대한 차지하여 왼쪽으로 이동 */
}
.form-group {
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}

.custom-control-label {
  padding-left: 10px;
}

.todo-save {
    display: flex;
    margin-left: auto;
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

.no-requests {
  text-align: center; /* 글자 가운데 정렬 */
  font-weight: bold; /* 글자 진하게 */
  margin-top: 20px; /* 상단 여백 추가 */
  margin-bottom: 40px;
}
</style>

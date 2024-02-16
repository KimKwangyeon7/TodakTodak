<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/auth";
import FriendProfile from "@/components/Friend/FriendProfile.vue";
// import Chat from "@/components/Friend/Chat.vue";
import { fetchFriends, sendFriendRequest } from "@/api/friend";
import { createChatRoom } from "@/api/chat";

const router = useRouter();
const memberStore = useMemberStore();
const { userInfo } = storeToRefs(memberStore);

const selectedFriend = ref(null);
const showSearch = ref(false);
const searchQuery = ref("");
const friends = ref([]);
const roomid = ref("");

onMounted(() => {
  getFriendList();
});


const getFriendList = () => {
  // API 호출
  fetchFriends(
    ({ data }) => {
      friends.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const showProfile = (friend) => {
  router.push({ name: 'FriendProfile', params: { nickname: friend.nickname } });
};

const filteredFriends = computed(() => {
  return friends.value.filter((friend) =>
    friend.nickname.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const startChat = (friend) => {
  selectedFriend.value = friend;
  const roomRequest = ref({
    title: friend.nickname + "의 대화방",
    receiver: friend.nickname,
  });
  createChatRoom(
    roomRequest.value,
    (response) => {
      let msg = "채팅방 생성에 문제 발생했습니다";
      if (response.status == 200) {
        msg = "채팅방 입장 완료되었습니다.";
        roomid.value = response.data.chatRoomId;
        alert(msg);
        router.push({ name: "chat-view", params: { roomid: roomid.value } });
      } else {
        alert(msg);
      }
    },
    (error) => console.error(error)
  );
};

const showFriendRequestList = () => {
  router.push("/friendRequestList");
};

const toggleSearch = () => {
  showSearch.value = !showSearch.value;
  if (!showSearch.value) {
    searchQuery.value = "";
  }
};
</script>

<template>
  <div class="friend-list container mt-5">
    <div class="friend-header">
      <div class="friend">친구</div>
      <div class="friend-buttons">
        <button class="create-chat-button btn" @click="toggleSearch">
          <div class="search"><img src="@/assets/search.png" alt="" /></div>
        </button>
        <button class="create-chat-button btn" @click="showFriendRequestList">
          <img src="@/assets/user-plus.png" alt="" />
        </button>
        <CreateRoomModal
          v-if="showModal"
          @close="closeCreateRoomModal"
          @create="createRoom"
        />
      </div>
    </div>

    <div class="friend-search mb-3" v-show="showSearch">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="친구 검색"
      />
    </div>

    <ul class="list-group">
      <li
        v-for="friend in filteredFriends"
        :key="friend.id"
        class="list-group-item"
        @click="showProfile(friend)"
      >
        <div class="friend-item">
          <img
            src="@/assets/profile-default.jpg"
            alt="프로필 이미지"
            class="profile-image mr-2"
          />
          <span class="profile-nickname">{{ friend.nickname }}</span>
        </div>
        <div class="buttons">
          <button class="btn btn-sm" @click.stop="startChat(friend)">
            <img src="@/assets/messages.png" alt="" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.friend-list {
  max-width: 100%;
  margin: auto;
}

.modal-content {
  background-color: #eaf3f9;
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
  border-color: #eaf3f9;
  position: relative;
  overflow: hidden;
  background-color: #eaf3f9;
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
  font-size: 18px;
}

.profile-nickname {
  margin-left: 10px;
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
  font-size: 30px;
}
</style>
@/records.js/auth

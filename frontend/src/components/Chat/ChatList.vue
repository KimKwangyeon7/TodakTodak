<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { listChatRoom } from "@/api/chat";
import ChatListItem from "@/components/Chat/item/ChatListItem.vue";

const router = useRouter();

const chatRooms = ref([]);

onMounted(() => {
  getChatRoomList();
});

const getChatRoomList = () => {
  console.log("채팅 목록 가져오기");
  // API 호출
  listChatRoom(
    ({ data }) => {
      console.log("채팅목록리스트");
      console.log(data);
      chatRooms.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
};

const moveFriendList = () => {
  //친구 목록으로 이동
    router.push({ name: "friend" });
};
</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-10">
        <h2 class="my-3 py-3 text-center">채팅 목록</h2>
      </div>
      <div class="col-lg-10">
        <div class="row align-self-center mb-2">
          <div class="col-md-2 text-start">
            <button
              type="button"
              class="btn btn-dark btn-sm"
              @click="moveFriendList"
            >
              새로운 채팅하기
            </button>
          </div>
        </div>
        <table class="table">
          <thead>
            <tr class="text-center">
              <th scope="col">글번호</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">조회수</th>
              <th scope="col">작성일</th>
            </tr>
          </thead>
          <tbody>
            <ChatListItem
              v-for="chatRoom in chatRooms"
              :key="chatRoom.chatRoomId"
              :chatRoom="chatRoom"
            ></ChatListItem>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: "Noto Sans KR", sans-serif;
}

.container {
  background-color: #f2f2f2; /* Light gray background */
  max-width: 1440px;
  margin-top: 2%;
  height: 700px;
}

h2 {
  background-color: #343a40; /* Dark gray background for the title */
  color: #f8f9fa; /* Light text color for the title */
  padding: 10px;
  border-radius: 5px;
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #ffffff;
  border-color: #007bff;
}
.table {
  background-color: #fff; /* White background for the table */
}

.table th,
.table td {
  border: 1px solid #dee2e6; /* Light gray border for table cells */
}

.table th {
  background-color: #343a40; /* Dark gray background for table header */
  color: #f8f9fa; /* Light text color for table header */
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa; /* Light gray background on hover */
}
</style>

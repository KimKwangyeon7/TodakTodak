import { localAxios } from "@/util/http-commons";

const local = localAxios();

function listChatRoom(success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  local.get(`/chat/rooms`).then(success).catch(fail);
}

// 채팅방 생성 POST
function createChatRoom(param, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`/chat/rooms`, JSON.stringify(param)).then(success).catch(fail);
  console.log("채팅방 생성 성공");
}

// 채팅방 나가기(삭제X 나간날 수정) PUT
async function leaveChatRoom(roomId, success, fail) {
  await local.put(`/chat/rooms/${roomId}`).then(success).catch(fail);
  console.log("채팅방 나가기 성공");
}

// 채팅방 삭제 DELETE
async function deleteChatRoom(room_id, success, fail) {
  local.delete(`/chat/rooms/${room_id}`).then(success).catch(fail);
  console.log("채팅방 삭제 성공");
}

// 채팅방 조회 GET
async function loadMessages(chatRoomId, success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`/chat/rooms/${chatRoomId}/message`).then(success).catch(fail);
  console.log("채팅방 조회 성공");
}

export {
  listChatRoom,
  createChatRoom,
  leaveChatRoom,
  deleteChatRoom,
  loadMessages,
};

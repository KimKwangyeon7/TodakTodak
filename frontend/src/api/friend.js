import { localAxios } from "@/util/http-commons";

const local = localAxios();

// 친구 목록 조회 GET
async function fetchFriends(success, fail) {
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`/friends`).then(success).catch(fail);
  console.log("친구 목록 조회 성공");
}

// 친구 요청 목록 조회 GET
async function acceptFriends(success, fail) {
  await local.get(`/friends/accept`).then(success).catch(fail);
  console.log("친구 요청 목록 조회 성공");
}

// 친구 상세보기 GET
async function friendsProfile(friendId, success, fail) {
  await local.get(`/friends/${friendId}`).then(success).catch(fail);
  console.log("친구 프로필 조회 성공");
}

// 친구 요청 보내기 POST
async function sendFriendRequest(sender, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  await local.post(`/friends/request`, sender).then(success).catch(fail);
  console.log("친구 요청 보내기 성공");
}

// 친구 요청 받기 POST
async function acceptFriendRequest(sender, success, fail) {
  const requestData = {
    sender: sender,
    is_friend: true,
    accepted_date: new Date().toISOString(),
  };
  await local.post(`/friends/accept`, requestData).then(success).catch(fail);
  console.log("친구 요청 받기 성공");
}

// 친구 요청 거절하기 DELETE
async function rejectFriendRequest(friendId, success, fail) {
  local.delete(`/friends/reject/${friendId}`).then(success).catch(fail);
  console.log("친구 요청 삭제 성공");
}

// 친구 삭제하기 DELETE
async function deleteFriend(friendId, success, fail) {
  local.delete(`/friends/${friendId}`).then(success).catch(fail);
  console.log("친구 삭제 성공");
}


export {
  fetchFriends,
  acceptFriends,
  friendsProfile,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
};

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
  local.defaults.headers.Authorization =
    "Bearer " + localStorage.getItem("accessToken");
  await local.get(`/friends/request`).then(success).catch(fail);
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
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  const requestData = {
    nickname: sender
  };
  await local.post(`/friends/accept`, requestData).then(success).catch(fail);
  console.log("친구 요청 받기 성공");
}

// 친구 요청 거절하기 DELETE
async function rejectFriendRequest(friendNickname, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.delete(`/friends/reject/${friendNickname}`).then(success).catch(fail);
  console.log("친구 요청 삭제 성공");
}

// 친구 삭제하기 DELETE
async function deleteFriend(friendId, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.delete(`/friends/${friendId}`).then(success).catch(fail);
  console.log("친구 삭제 성공");
}

// 친구 목표 가져오기
async function getFriendGoals(friendNickname, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.get(`/friends/${friendNickname}`).then(success).catch(fail);
  console.log("친구 목표 가져오기");
}



export {
  fetchFriends,
  acceptFriends,
  friendsProfile,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
  getFriendGoals,
};

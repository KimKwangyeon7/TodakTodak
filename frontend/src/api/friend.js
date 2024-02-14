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

// 무작위 친구 가져오기
async function getRandomUsers(count, success, fail) {
  try {
    // 서버에서 사용자 목록을 가져옵니다.
    const response = await local.get(`/friends`);
    // 요청이 성공하면 사용자 목록을 반환합니다.
    success(response.data);
  } catch (error) {
    // 요청이 실패하면 실패 함수를 호출합니다.
    fail(error);
  }
}


export {
  fetchFriends,
  acceptFriends,
  friendsProfile,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
  getRandomUsers
};

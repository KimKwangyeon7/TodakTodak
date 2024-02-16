import { localAxios } from "@/util/http-commons"

const local = localAxios()

// 친구 목록 조회 GET
async function fetchFriends(success, fail) {
  await local.get(`/friends`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 목록 조회 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 친구 요청 목록 조회 GET
async function acceptFriends(success, fail) {
  await local.get(`/friends/accept`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 요청 목록 조회 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 친구 상세보기 GET
async function friendsProfile(friend_id, success, fail) {
  await local.get(`/friends/${friend_id}`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 프로필 조회 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 친구 요청 보내기 POST
async function sendFriendRequest(to_member_id, success, fail) {
  await local.post(`/friends/request`, { to_member_id }).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 요청 보내기 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 친구 요청 받기 POST
async function acceptFriendRequest(to_member_id, success, fail) {
  const requestData = {
    to_member_id : to_member_id,
    is_friend : true,
    accepted_date : new Date().toISOString()
  }
  await local.post(`/friends/accept`, requestData).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 요청 받기 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 친구 요청 거절하기 DELETE
async function rejectFriendRequest(friend_id, success, fail) {
  local.delete(`/friends/reject/${friend_id}`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 요청 삭제 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 친구 삭제하기 DELETE
async function deleteFriend(friend_id, success, fail) {
  local.delete(`/friends/${friend_id}`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('친구 삭제 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 채팅방 목록 조회 GET
async function fetchChatRooms(success, fail) {
  await local.get(`/chats/rooms`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('채팅방 목록 조회 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}
  
// 채팅방 생성 POST
async function createChatRoom(room_id, success, fail) {
  await local.post(`/chats/rooms`, { room_id }).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('채팅방 생성 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 채팅방 나가기(삭제X 나간날 수정) PUT
async function leaveChatRoom(room_id, success, fail) {
  await local.put(`/chats/rooms/${room_id}`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('채팅방 나가기 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 채팅방 삭제 DELETE
async function deleteChatRoom(room_id, success, fail) {
  local.delete(`/chats/rooms/${room_id}`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('채팅방 삭제 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 채팅방 조회 GET
async function fetchChatRoom(room_id, success, fail) {
  await local.get(`/chats/rooms/${room_id}`).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('채팅방 조회 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}

// 채팅 보내기 POST
async function sendMessageToFriend(room_id, friend_id, message, success, fail) {
  const requestData = {
    member_id: friend_id, 
    room_id: room_id,
    message_type: "text",
    message: message
  }
  await local.post(`chats/${room_id}/message`, requestData).then(success).catch(fail)
<<<<<<< HEAD
=======
  console.log('채팅 보내기 성공')
>>>>>>> e9f3bdd3097afb78255ffd53be7e4f162cbbaa2a
}



export {
    fetchFriends,
    acceptFriends,
    friendsProfile,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    deleteFriend,
    fetchChatRooms,
    createChatRoom,
    leaveChatRoom,
    deleteChatRoom,
    fetchChatRoom,
    sendMessageToFriend
}
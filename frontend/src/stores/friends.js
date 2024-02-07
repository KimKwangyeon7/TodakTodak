import axios from 'axios';

const API_ENDPOINT = 'http://localhost:5173/'

export const fetchFriends = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/friends`)
    return response.data;
  } catch (error) {
    throw new Error('친구 목록을 불러오는 중 오류가 발생했습니다.')
  }
}

export const startChatWithFriend = async (friendId) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/chat/start`, { friendId })
    return response.data
  } catch (error) {
    throw new Error('친구와의 채팅을 시작하는 중 오류가 발생했습니다.')
  }
}

export const sendMessageToFriend = async (friendId, message) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/chat/send`, { friendId, message })
    return response.data
  } catch (error) {
    throw new Error('친구에게 메시지를 보내는 중 오류가 발생했습니다.')
  }
}
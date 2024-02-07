<template>
  <div>
    <button class="back-button btn" @click="goBack">
      <img src="@/assets/back.png" alt="">
    </button>

    <div class="chat-container">
      <div class="chat-messages" ref="chatContainer">
        <div v-for="(msg, index) in chatMessages" :key="index"
          :class="msg.owner === id.toString() ? 'my-chat' : 'their-chat'">
          <div class="message">{{ msg.message }}</div>
        </div>
      </div>
      <div class="chat-input">
        <textarea
          style="resize: none"
          v-model="message"
          placeholder="메시지 입력"
          @keydown.enter="sendMessage"
        ></textarea>
        <button class="input-button" @click="sendMessage">전송</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { chatMessages, id, socket } from '@/socket';
import { nextTick, ref, watchEffect } from 'vue'
import axios from 'axios'

const message = ref([])
const chatContainer = ref(null)

function sendMessage() {
    const chat = {
        owner: id.value,
        message: message.value
    }
    chatMessages.value.push(chat)
    socket.timeout(5000).emit('chat', chat)

    // 추가: axios를 사용하여 채팅 메시지 서버에 전송
    axios.post('/api/chat', chat, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(response => {
      console.log('채팅 메시지 전송 성공', response.data)
    })
    .catch(error => {
      console.error('채팅 메시지 전송 실패', error)
    })

    message.value = ""
    nextTick(() => {
        scrollChatToBottom()
    })
}


function scrollChatToBottom() {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
}

watchEffect(() => {
    scrollChatToBottom()
    console.log(chatMessages.value)
})

function goBack() {
    window.history.back()
}

</script>


<style scoped>
.chat-container {
  border: 1px solid cornflowerblue;
  display: flex;
  flex-direction: column;
  height: 70vh;
  padding: 20px;
}

.chat-messages {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

.my-chat {
  align-self: flex-end;
  background-color: #0084ff;
  color: #fff;
  max-width: 70%;
  padding: 8px;
  margin: 8px 8px 8px 0;
  border-radius: 6px;
  text-align: right;
  position: relative;
}

.their-chat {
  align-self: flex-start;
  background-color: #f0f0f0;
  max-width: 70%;
  padding: 8px;
  margin: 8px 0;
  border-radius: 6px;
  text-align: left;
  color: #282828;
  position: relative;
}

.chat-input {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

textarea {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  touch-action: manipulation;
}

.input-button {
  color: #fff;
  background-color: #0084ff;
  border: none;
  padding: 15px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.back-button {
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
}


</style>
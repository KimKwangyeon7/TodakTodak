<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref, onMounted, reactive } from "vue";
import { storeToRefs } from 'pinia';
// import Stomp from "webstomp-client";
import { CompatClient, Stomp } from '@stomp/stompjs';
import { useRoute, useRouter } from "vue-router";
import { listChatRoom } from "@/api/chat";
import { useMemberStore } from "@/stores/auth";

const memberStore = useMemberStore();
const { getUserInfo } = memberStore;
const route = useRoute();
const router = useRouter();

// Reactive data
const chats = ref([]);
const roomid = route.params.roomid;
const accessToken = localStorage.getItem("accessToken");
const message = ref(null);
const nickname = ref(null);

let socket = reactive(null);
let stomp = reactive(null);

onMounted(async () => {
  let token = localStorage.getItem("accessToken"); //현재 로그인한 유저
  const userInfo = await getUserInfo(token);
  console.log(userInfo);
  nickname.value = userInfo.nickname;
  console.log(nickname.value);

  connect();
});


// Methods
const sendMessage = (e) => {
  if (message.value !== "") {
    send();
    message.value = "";
  }
};

const send = () => {
  console.log("Send message:" + message.value);
  const msg = {
    roomId: roomid,
    sender: nickname.value,
    message: message.value,
    messageType: "TALK"
  };
  stomp.send("/pub/chat/message", JSON.stringify(msg), { Authorization: `Bearer ${accessToken}` });
};

const connect = () => {
  const serverURL = "ws://i10c210.p.ssafy.io:8080/ws-stomp";

  // socket = new WebSocket(serverURL);
  // stomp = Stomp.over(socket);

  stomp = Stomp.over(function () {
    return new WebSocket(serverURL);
  });

  stomp = Stomp.client(serverURL);
  stomp.reconnect_delay = 5000;

  console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);
  stomp.connect({ Authorization: 'Bearer ' + accessToken }, (frame) => {
    // 소켓 연결 성공
    console.log("소켓 연결 성공", frame);
    stomp.subscribe("/sub/chat/room/" + roomid, (res) => {
      console.log("구독으로 받은 메시지 입니다.", res.body);
      const chat = JSON.parse(res.body);
      console.log("수신 메시지: ", chat);
      chats.value.push({
        roomId: chat.roomId,
        message: chat.message,
        sender: chat.nickname,
        messageType: chat.messageType,
      });

    });
  },
    (error) => {
      // 소켓 연결 실패
      console.log("소켓 연결 실패", error);
    }
  );
};

// Connect when the component is created


</script>

<template>
  <v-container>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <h1>채팅</h1>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card class="mt-2">
          <v-card-title>
            <h2>채팅 테스트</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <input v-model="message" type="text" @keyup.enter="sendMessage" />
              <div class="mt-2" v-for="(chat, idx) in chats" :key="idx">
                <v-card class="mt-2 mb-2" color="teal lighten-3" dark max-width="400">
                  <v-card-text>
                    <div>{{ chat.sender }} {{ chat.message }}</div>
                  </v-card-text>
                </v-card>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<template>
    <div>
      <video ref="localVideo" autoplay playsinline></video>
      <video ref="remoteVideo" autoplay playsinline></video>
      <button @click="startVideoChat">Start Video Chat</button>

      <PasswordInput @enterRoom="handleEnterRoom" v-if="isPasswordRequired" />
    </div>
  </template>
  
<script setup>
import 'webrtc-adapter'  // webrtc-adapter 추가

import PasswordInput from '@/components/Meeting/PasswordInput.vue'
import { ref } from 'vue'

const localVideo = ref(null)
const remoteVideo = ref(null)

const isPasswordRequired = ref(true)

const handleEnterRoom = () => {
  // 비밀번호를 확인하고 필요한 처리를 수행
  // 예를 들어, 올바른 비밀번호라면 isPasswordRequired 값을 변경하여 입력 폼을 숨김
  isPasswordRequired.value = false
  // 그 후, 화상 채팅방으로 이동 또는 적절한 처리를 수행
}

const startVideoChat = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

    // 로컬 비디오 설정
    localVideo.value.srcObject = stream

    // WebRTC 연결 설정
    const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] }
    const peerConnection = new RTCPeerConnection(configuration)

    // 로컬 스트림 추가
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream))

    // 원격 비디오 설정
    peerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0]
      remoteVideo.value.srcObject = remoteStream
    }

    // Offer 생성 및 설정
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    // Offer 전송 (상대방에게 전달하는 로직은 여기서 생략)
  } catch (error) {
    console.error('Error starting video chat:', error)
  }
}
</script>

<style scoped>
/* 필요한 스타일을 여기에 추가할 수 있습니다. */
</style>
  
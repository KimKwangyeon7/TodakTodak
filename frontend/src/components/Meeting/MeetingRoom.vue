<template>
    <div>
      <video ref="localVideo" autoplay playsinline></video>
      <video ref="remoteVideo" autoplay playsinline></video>
      <button @click="startVideoChat">Start Video Chat</button>
    </div>
  </template>
  
  <script setup>
  import 'webrtc-adapter'  // webrtc-adapter 추가
  
  const localVideo = ref(null)
  const remoteVideo = ref(null)
  
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
  
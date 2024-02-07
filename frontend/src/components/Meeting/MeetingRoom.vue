<template>
  <div class="video-chat-container">
    <video ref="videoEl" autoplay></video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  setup() {
    const videoEl = ref<HTMLVideoElement>(null);

    const constraints = {
      video: true,
    };

    onMounted(() => {
      if (!videoEl.value) return;
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoEl.value.srcObject = stream;
      });
    });

    return {
      videoEl,
    };
  },
});
</script>

<style scoped>
.video-chat-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

video {
  width: 80%;
  max-width: 800px;
  height: auto;
  border: 2px solid #333;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 기본 컨트롤 숨김 */
  outline: none;
}

/* 마우스 호버 시 기본 컨트롤 숨김 */
video:hover {
  cursor: none;
}

/* 마우스 호버 시 기본 컨트롤 숨김 - Firefox 용 */
video::-webkit-media-controls {
  display: none !important;
}
</style>

<template>
  <div class="friend-profile">
    <div class="modal-background" @click="closeProfile"></div>
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">친구 프로필</h5>
          <button type="button" class="close" @click="closeProfile">
            <span>&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="friend">
          <!-- friend 객체가 정의되어 있는 경우에만 렌더링 -->
          <p><strong>이름:</strong> {{ friend.name }}</p>
          <p><strong>나이:</strong> {{ friend.age }}</p>
          <!-- 추가적인 프로필 정보를 여기에 추가할 수 있습니다. -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps(['friend']);

const closeProfile = () => {
  // 부모 컴포넌트에 이벤트를 발생시켜 프로필 모달을 닫습니다.
  context.emit('close');
};
</script>

<style scoped>
/* 적절한 스타일링 코드를 추가하세요. */
</style>

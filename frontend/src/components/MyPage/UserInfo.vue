<template>
    <div>
      <div class="user-data" v-if="userData">
        <div class="user-photo">
          <img :src="userData.profilePicture" alt="프로필 이미지" class="profile-image mr-2">
        </div>
        <div class="user-profile">
          <h3><strong>{{ userData.name }}</strong></h3>
          <p><strong>{{ userData.memo }}</strong></p>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const props = {
  userData: Object,
}

const userData = ref({
  name: '김철수',
  memo: '오늘도 힘내요',
  profilePicture: '/src/assets/damgom.png',
})
</script>

<style scoped>
.user-data {
  display: flex;
}
.user-profile {
  justify-content: space-between;
  margin-left: 20px;
}
.profile-image {
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
}
</style>

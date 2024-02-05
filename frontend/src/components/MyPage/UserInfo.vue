<template>
  <div>
    <div class="user-data" v-if="userData" @click="goToProfileEdit">
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
import { useRouter } from 'vue-router'

const props = {
  userData: Object,
}

const router = useRouter()

const userData = ref({
  name: '김철수',
  memo: '오늘도 힘내요',
  profilePicture: '/src/assets/damgom.png',
})

const goToProfileEdit = () => {
  // 사용자 프로필 수정 페이지로 이동하는 라우터 링크
  router.push('/userInfoEdit')
}
</script>

<style scoped>
.user-data {
  display: flex;
  cursor: pointer; /* 클릭 가능한 요소로 커서 스타일 변경 */
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

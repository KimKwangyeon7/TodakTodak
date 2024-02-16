<template>
  <div class="user-container">
    <div class="user-data" v-if="userData" @click="goToProfileEdit">
      <div class="user-photo">
        <img
        src="@/assets/profile-default.jpg"
        alt="프로필 이미지"
        class="profile-image mr-2"
        />
      </div>
      <div class="user-profile">
        <h3><strong>{{ userData.name }}</strong></h3>
        <p><strong>{{ userData.memo }}</strong></p>
      </div>
    </div>
    
    <!-- 설정 버튼 -->
    <button class="settings-button btn" @click="goToSettings">
      <img src="@/assets/settings.png" alt="">
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useMemberStore } from '@/stores/auth'

const userData = ref(null)

// props 정의
const props = defineProps({
  userData: Object,
});

const router = useRouter()
const memberStore = useMemberStore() // Pinia 스토어 사용

// 컴포넌트 마운트 시 사용자 정보 가져오기
onMounted(async () => {
  const token = localStorage.getItem("accessToken");
  userData.value = await memberStore.getUserInfo(token); // 사용자 정보를 가져옴
});

const goToProfileEdit = () => {
  // 사용자 프로필 수정 페이지로 이동하는 라우터 링크
  router.push('/userInfoEdit')
}

const goToSettings = () => {
  // 설정 페이지로 이동하는 메서드
  router.push('/MypageSettings');
}

</script>

<style scoped>
.user-container {
  display: flex;
  align-items: center; /* 아이콘 및 텍스트 정렬을 위해 추가 */
}
.settings-button {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  display: flex;
  margin-bottom: 31px;
}
.user-data {
  display: flex;
  cursor: pointer; /* 클릭 가능한 요소로 커서 스타일 변경 */
}

.user-photo {
  justify-content: space-between;
  margin-left: 5px;
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
@/records.js/auth
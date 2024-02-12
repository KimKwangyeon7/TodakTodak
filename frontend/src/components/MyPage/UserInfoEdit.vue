<template>
    <div v-if="userData">
        <button class="settings-back-button btn" @click="goBack">
          <img src="@/assets/back.png" alt="">
        </button>

      <div class="profile-section">
        <h2>프로필 수정</h2>
        <form @submit.prevent="saveProfile">
          <div class="form-group">
            <label for="name">이름:</label>
            <input v-model="userData.name" type="text" id="name" class="form-control" required>
          </div>
          <div class="form-group">
            <label for="memo">메모:</label>
            <textarea v-model="userData.memo" id="memo" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label for="profilePicture">프로필 이미지:</label>
            <input v-model="userData.profilePicture" type="text" id="profilePicture" class="form-control">
          </div>
          <button type="submit" class="profile-save-btn btn">저장</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { useMemberStore } from '@/stores/auth'
  
  const router = useRouter()
  
  const userData = ref(null);
  const memberStore = useMemberStore();

  onMounted(async () => {
  const token = localStorage.getItem("accessToken");
  userData.value = await memberStore.getUserInfo(token); // 사용자 정보를 가져옴
  console.log('userData111:', userData);
});

  const saveProfile = () => {
    console.log('프로필이 저장되었습니다.')
    router.push('/mypage')
  }
  
  function goBack() {
    window.history.back()
  }
  </script>
  
  <style scoped>
  
  .profile-section {
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-control {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    touch-action: manipulation;
  }

  .profile-save-btn {
    display: flex;
    margin-left: auto;
  }
  
  </style>
  
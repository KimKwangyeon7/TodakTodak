<template>
  <div v-if="userInfo">
    <button class="settings-back-button btn" @click="goBack">
      <img src="@/assets/back.png" alt="뒤로 가기">
    </button>

    <div class="profile-section">
      <h2>프로필 수정</h2>
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="name">이름:</label>
          <input v-model="userInfo.name" type="text" id="name" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="nickname">닉네임:</label>
          <input v-model="userInfo.nickname" type="text" id="nickname" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="memo">메모:</label>
          <textarea v-model="userInfo.memo" id="memo" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <label for="profilePicture">프로필 이미지:</label>
          <input v-model="userInfo.profilePicture" type="text" id="profilePicture" class="form-control">
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
import { updateUser } from '@/api/member'

const router = useRouter()
const memberStore = useMemberStore()

const userInfo = ref({
  name: '',
  nickname: '',
  memo: '',
  profileUrl: ''
})

onMounted(async () => {
  try {
    const token = localStorage.getItem("accessToken")
    const userData = await memberStore.getUserInfo(token)
    // 사용자 정보를 userInfo에 할당합니다.
    userInfo.value = { ...userData }
  } catch (error) {
    console.error('사용자 정보를 가져오는 도중 에러가 발생했습니다:', error)
  }
})

const saveProfile = async () => {
  try {
    const token = localStorage.getItem("accessToken")
    // 사용자 정보를 업데이트합니다.
    await updateUser(token, userInfo.value)
    console.log('프로필이 저장되었습니다.')
    router.push('/mypage')
  } catch (error) {
    console.error('프로필을 저장하는 도중 에러가 발생했습니다:', error)
  }
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

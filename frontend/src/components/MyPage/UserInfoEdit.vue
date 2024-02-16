<template>
  <div v-if="userData">
    <button class="settings-back-button btn" @click="goBack">
      <img src="@/assets/back.png" alt="뒤로 가기" />
    </button>

    <div class="profile-section">
      <h2>프로필 수정</h2>
      <form @submit.prevent="saveProfile">
        <div class="form-group">
          <label for="name">이름:</label>
          <input
            v-model="userData.name"
            type="text"
            id="name"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="nickname">닉네임:</label>
          <input
            v-model="userData.nickname"
            type="text"
            id="nickname"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="memo">메모:</label>
          <textarea
            v-model="userData.memo"
            id="memo"
            class="form-control"
          ></textarea>
        </div>
        <div class="form-group">
          <label for="profilePicture">프로필 이미지:</label>
          <input
            v-model="userData.profileUrl"
            type="text"
            id="profilePicture"
            class="form-control"
          />
        </div>
        <button type="submit" class="profile-save-btn btn">저장</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useMemberStore } from "@/stores/auth";
import { modifyUser } from "@/api/member";

const router = useRouter();
const memberStore = useMemberStore();

// const { updateUserInfo } = memberStore;
// const { userInfo } = storeToRefs(memberStore);

const userData = ref(null);
const user = {
  name: userData.name,
  nickname: userData.nickname,
  memo: userData.memo,
  profileUrl: userData.profileUrl,
};

onMounted(async () => {
  const token = localStorage.getItem("accessToken");
  userData.value = await memberStore.getUserInfo(token);
});

const saveProfile = async () => {
  // 사용자 정보 업데이트
  modifyUser(
    user,
    ({ data }) => {
      this.userData.value = data;
    },
    (error) => {
      console.log(error);
    }
  );
  router.push("/mypage");
};

function goBack() {
  window.history.back();
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

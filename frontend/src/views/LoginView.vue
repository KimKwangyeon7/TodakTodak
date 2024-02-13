<template>
  <div>
    <div class="login-container">
      <div class="loginbox">
        <form @submit.prevent="login" class="login-form">
          <div class="form-group">
            <label for="email">이메일: </label>
            <input type="text" name="email" id="email" v-model.trim="email" />
          </div>
          <div class="form-group">
            <label for="password">비밀번호: </label>
            <input
              type="password"
              name="password"
              id="password"
              v-model.trim="password"
            />
          </div>
          <input
            type="submit"
            value="로그인"
            class="login-button"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { useMemberStore } from "@/stores/auth";

const memberStore = useMemberStore();
const { userLogin, isLogin } = memberStore;
const { userInfo } = storeToRefs(memberStore);

const route = useRoute();
const router = useRouter();

const email = ref(null);
const password = ref(null);

onMounted(() => {
});


const login = async () => {
  const loginMember = ref({
    email: email.value,
    password: password.value,
  });

  await userLogin(loginMember.value);
  let token = localStorage.getItem("accessToken");

  if (isLogin) {
    console.log("로그인 성공");
  }
  router.push("/");
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.loginbox {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

.login-form .form-group {
  margin-bottom: 20px;
}

.login-form label {
  display: block;
  font-size: 14px;
  margin-bottom: 5px;
}

.login-form input {
  width: 100%;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;
}

.login-button {
  background-color: #2196F3;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  width: 100%;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0d8bf9;
}
</style>
@/records.js/auth
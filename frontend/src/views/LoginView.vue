<!-- eslint-disable no-unused-vars -->
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

<template>
  <div>
    <div class="loginbox">
      <div
        style="
          display: flex;
          border-radius: 10px;
          color: black;
          background-color: aliceblue;
          align-items: center;
          justify-content: center;
        "
        class="z-2"
      >
        <img
          src="@/assets/sleepcat.gif"
          alt="logo"
          style="width: auto; height: 350px; border-radius: 10px"
        />
        <form @submit.prevent="login">
          <div class="containtext">
            <div>
              <label for="email">email : </label>
            </div>
            <input type="text" name="email" id="email" v-model.trim="email" />
          </div>
          <div class="containtext">
            <div>
              <label for="password">password : </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              v-model.trim="password"
            />
          </div>
          <input
            style="border-radius: 5px; margin-left: 55px"
            type="submit"
            value="로그인"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.loginbox {
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
}
.containtext {
  display: flex;
  justify-content: space-around;
}

.containtext > input {
  width: 60%;
  border-radius: 3px;
}
.containtext > div {
  width: 150px;
  text-align: end;
}
</style>

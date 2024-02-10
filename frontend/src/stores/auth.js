/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";

import { login, findByToken } from "@/api/member";

import { httpStatusCode } from "@/util/http-status";

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter();

  const isLogin = ref(false);
  const isLoginError = ref(false);
  const nickname = ref(null);
  const token = ref(null);
  const userInfo = ref(null);

  const userLogin = async (loginUser) => {
    await login(
      loginUser,
      (response) => {
        if (response.status === httpStatusCode.OK) {
          let { data } = response;
          let accessToken = data["accessToken"];
          console.log("accessToken", accessToken);

          isLogin.value = true;
          isLoginError.value = false;
          nickname.value = data["nickname"];
          token.value = accessToken;
          console.log("nickname", nickname.value);

          localStorage.setItem("accessToken", accessToken); //로컬스토리지 토큰 저장
        } else {
          console.log("로그인 실패했다");
          isLogin.value = false;
          isLoginError.value = true;
        }
      },
      (error) => {
        console.error(error);
      },
      { persist: true }
    );
  };

  const getUserInfo = async (token) => {

    await findByToken(
      (response) => {
        if (response.status === httpStatusCode.OK) {
          let { data } = response;
          userInfo.value = data;
          console.log("3. getUserInfo data >> ", response.data);
        } else {
          console.log("유저 정보 없음!!!!");
        }
      },
      async (error) => {
        console.log(error);
        console.error(
          "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
          error.response.status
        );
      }
    );
    return userInfo.value;
  };



  return {
    isLogin,
    isLoginError,
    nickname,
    token,
    userLogin,
    getUserInfo
  };
});

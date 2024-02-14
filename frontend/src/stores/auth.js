/* eslint-disable no-unused-vars */
import { ref } from "vue";
import { useRouter } from "vue-router";
import { defineStore } from "pinia";
import { useCookies } from "vue3-cookies";

import { login, logout, findByToken } from "@/api/member";

import { httpStatusCode } from "@/util/http-status";

import axios from 'axios'

const { cookies } = useCookies();

export const useMemberStore = defineStore("memberStore", () => {
  const router = useRouter();

  const isLogin = ref(false);
  const isLoginError = ref(false);
  const nickname = ref(null);
  const token = ref(null);
  const userInfo = ref(null);
  const isValidToken = ref(false);

  const initializeAuth = () => {
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      token.value = accessToken
      isLogin.value = true
    }
  }

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

          findByToken(
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
  const updateUserInfo = async (updatedUserInfo) => {
    try {
      const response = await axios.put('@/api/member', updatedUserInfo); // updateUser는 사용자 정보 업데이트를 위한 API 호출입니다.
      if (response.status === httpStatusCode.OK) {
        userInfo.value = updatedUserInfo;
        console.log("사용자 정보가 성공적으로 업데이트되었습니다.");
      } else {
        console.error("사용자 정보 업데이트 실패:", response);
      }
    } catch (error) {
      console.error("사용자 정보 업데이트 중 오류 발생:", error);
    }
  }
  const userLogout = async (userEmail) => {
    await logout(
      userEmail,
      (response) => {
        let msg = "로그아웃 중 에러 발생했습니다..";
        if (response.status === httpStatusCode.OK) {
          isLogin.value = false;
          userInfo.value = null;
          isValidToken.value = false;

          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          cookies.remove("id");
          console.log("Logout successful");

          msg = "로그아웃 되었습니다.";
          alert(msg);
        } 
      },
      (error) => {
        console.log(error);
      }
    );
  };




  return {
    isLogin,
    isLoginError,
    nickname,
    token,
    userInfo,
    userLogin,
    getUserInfo,
    initializeAuth,
    updateUserInfo,
    userLogout,
  };
});

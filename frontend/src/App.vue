<!-- eslint-disable no-unused-vars -->

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Main from "@/views/Main.vue";
import MyPage from "@/views/MyPage.vue";
import { RouterLink, RouterView } from "vue-router";
import { useMemberStore } from "@/stores/auth";

// import { initializeApp } from "firebase/app";
// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   isSupported,
// } from "firebase/messaging";

let today = new Date();
console.log(today);

const authStore = useMemberStore();

const closeModal = () => {
  is_modal_valid.value = false;
};

const handleLoginClick = () => {
  console.log(authStore.isLogin);
  // 여기에서 로그인 상태 확인
};

// if (isSupported) {
//   try {
//     const firebaseConfig = {
//       apiKey: "AIzaSyCF2s8lAwrDHDwgHFfJnSM5XV_O1tGPadA",
//       authDomain: "c210-67728.firebaseapp.com",
//       databaseURL: "https://c210-67728-default-rtdb.firebaseio.com",
//       projectId: "c210-67728",
//       storageBucket: "c210-67728.appspot.com",
//       messagingSenderId: "1085114030378",
//       appId: "1:1085114030378:web:ca44737c5db69c513a6653",
//     };

//     const app = initializeApp(firebaseConfig);
//     const messaging = getMessaging(app);

//     getToken(messaging, { vapidKey: "<YOUR_PUBLIC_VAPID_KEY_HERE>" })
//       .then((currentToken) => {
//         if (currentToken) {
//           // Send the token to your server and update the UI if necessary
//           console.log("Token is: ", currentToken);
//           // ...
//         } else {
//           // Show permission request UI
//           console.log(
//             "No registration token available. Request permission to generate one."
//           );
//           // ...
//         }
//       })
//       .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//         // ...
//       });
    // messaging
    //   .requestPermission()
    //   .then(function () {
    //     return messaging.getToken();
    //   })
    //   .then(async function (token) {
    //     console.log(token);
    //     const fcmData = {
    //       memberId: authStore.memberId,
    //       title: "푸시 제목",
    //       body: "푸시 본문",
    //     };
    //     await fetch("/notification", {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(fcmData),
    //     });

    //     messaging.onMessage((payload) => {
    //       const title = payload.notification.title;
    //       const options = {
    //         body: payload.notification.body,
    //       };
    //       navigator.serviceWorker.ready.then((registration) => {
    //         registration.showNotification(title, options);
    //       });
    //     });
    //   })
    //   .catch(function (err) {
    //     console.log("Error Occured");
    //   });
//   } catch (error) {
//     console.error("fcm is error : ", error);
//   }
//   console.log("brower supported");
// } else {
//   console.log("brower not supported");
// }
</script>

<template>
  <div v-if="authStore.isLogin" class="mt-5">
    <Sidebar />
    <!-- 하단 네비게이션 바 -->
    <div class="bottom-nav">
      <RouterLink to="/Main" class="nav-item">
        <img class="nav-icon" src="@/assets/bottom-nav/home.png" alt="" /> Home
      </RouterLink>
      <RouterLink to="/Calendar" class="nav-item">
        <img class="nav-icon" src="@/assets/sidebar/calendar.png" alt="" />
        Calendar
      </RouterLink>
      <RouterLink to="/friends" class="nav-item">
        <img class="nav-icon" src="@/assets/bottom-nav/Lucide.png" alt="" />
        Friends
      </RouterLink>
      <RouterLink to="/mypage" class="nav-item">
        <img class="nav-icon" src="@/assets/bottom-nav/profile.png" alt="" />
        MyPage
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <div>
      <RouterLink :to="{ name: 'SignUpView' }">SignUp</RouterLink>
      <RouterLink :to="{ name: 'LoginView' }">Login</RouterLink>
    </div>
  </div>
  <RouterView />
</template>

<style>
/* 전체 앱 스타일링 */
#app {
  font-family: "SUITE-Regular";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding-top: 25px;
  padding-bottom: 90px;
}

/* 상단 바 스타일링 */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
}

.quote {
  font-size: 10px;
}

/* 할 일 목록 스타일링 */

/* 하단 네비게이션 바 스타일링 */
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 50%; /* 가운데 정렬을 위해 왼쪽 50%로 설정 */
  transform: translateX(-50%); /* 가운데 정렬을 위한 변형 */
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center; /* 세로 가운데 정렬 추가 */
  background-color: #eaf3f9;
  padding: 10px;
  z-index: 999;
  height: 80px;
  font-size: 12px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;
}

.nav-icon {
  width: 30px;
  height: 30px;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
}

.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0, 5);
  position: fixed;
  padding: 20px;
}

.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

@font-face {
  font-family: "SUITE-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2")
    format("woff2");
  font-weight: 400;
  font-style: normal;
}
</style>

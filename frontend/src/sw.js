// src/sw.js
import { precacheAndRoute } from 'workbox-precaching';

self.__WB_MANIFEST = [].concat(self.__WB_MANIFEST || []);

precacheAndRoute(self.__WB_MANIFEST);


// 푸시 메세지 받는 경우 처리
self.addEventListener('push', function (event) {
    // 푸시 메시지를 JSON형태로 변경
    if (event.data) {
      data = JSON.parse(event.data.text())
    } else {
      console.log("데이터가 비어있습니다!")
    }
  
    // 알림 메시지 옵션 준비
    const options = {
      body: data.pMsg,
      icon: '/img/push-noti-icon.png',
      badge: '/img/push-badge-icon.png',
      image: '/img/push-news.jpg',
      actions: [{
        action: 'info',
        title: '에듀싸피 ㄱ?',
        icon: '/img/push-info.png'
      }],
      vibrate: [500, 100, 500]
    }
    event.waitUntil(
      // 알림 메시지 전송하여 표시
      self.registration.showNotification(data.pTitle, options)
    )
  })
  // 푸시 알림 메시지에서 사용자가 링크 클릭 시 처리
  self.addEventListener('notificationclick', function (event) {
    // 알림 메시지의 링크 클릭 시 경우별 사이트로 이동
    if (event.action == 'like') {
      clients.openWindow("https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp");
    } else if (event.action == 'info') {
      clients.openWindow("https://edu.ssafy.com/comm/login/SecurityLoginForm.do");
    }
    // 푸시알림 이벤트 종료
    event.notification.close();
  }, false);
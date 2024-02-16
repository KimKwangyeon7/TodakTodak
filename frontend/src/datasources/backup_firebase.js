import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const oFirebase = firebase.initializeApp({
    databaseURL: "https://c210-67728-default-rtdb.firebaseio.com",
})

const oDB = oFirebase.database()

const messaging = firebase.messaging();

// 사용자에게 알림 권한 요청
messaging.requestPermission()
.then(function() {
  // 토큰을 받아옵니다.
  return messaging.getToken();
})
.then(function(token) {
  console.log(token);
  // 받아온 토큰을 서버에 전송하여 저장합니다.
})
.catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});

// 백그라운드 상태에서 수신한 메시지를 처리합니다.
messaging.onMessage(function(payload) {
  console.log('Message received. ', payload);
  // Customize notification here
});

// 파이어베이스 DB 객체 중에서 todos 항목을 다른 곳에서 사용가능하도록 공개하는 기능이라는데,
// 일단은 주석으로 처리하겠음
export const oC210inDB = oDB.ref('subscriptions')
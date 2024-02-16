<template>
  <div>
    <button class="settings-back-button btn" @click="goBack">
      <img src="@/assets/back.png" alt="">
    </button>

    <div class="card">
      <img src="../assets/img/push-image.jpg" alt="Push Image" class="card-img-top">

      <div class="card-body">
        <h1 class="card-title">알림 제어</h1>
        <p class="card-text">[알림허용] 단추를 클릭하시면 알림 정보를 받으실 수 있습니다.</p>
        
        <button class="btn btn-primary" @click="fnPushSubscribe">알림 허용</button>
        <button class="btn btn-secondary" @click="fnUnSubscription">알림 해제</button>
      </div>

      <div v-if="bMsg" class="alert alert-info">
        푸시알림이 해제되었습니다. <button @click="bMsg = false">닫기</button>
      </div>
    </div>
  </div>
</template>
  <script>
    // 파이어베이스에서 oC210inDB  객체 변수 가져옴
    import {
      oC210inDB 
    } from '@/datasources/firebase'
  
    export default {
      data() {
        return {
          bMsg: false, // 버튼이 눌렸을 때 안내 메시지 표시여부
        }
      },
      methods: {
        fnPushSubscribe() {
          // this의 값 임시 저장
          let temp_this = this
          // 사용자에게 푸시 사용할지 허가 요청
          Notification.requestPermission(function (result) {
            if (result !== 'granted') {
              console.log('푸시알림 기능이 허용되지 않았습니다!')
            } else {
              // 사용자가 허가하면 푸시알림 서비스 설정 실행
              temp_this.fnConfigurePushSub()
            }
          })
        },
        // 푸시알림을 위해 서비스워커 점검 및 푸시서버 설정
        fnConfigurePushSub() {
          // this의 값 임시 저장
          let temp_this = this
          // 서비스 워커 없으면 시작하지 않음
          if (!('serviceWorker' in navigator)) {
            console.log("서비스 워커가 없습니다!")
            return
          }
          // 서비스 워커 준비 확인
          navigator.serviceWorker.ready
            .then(function (swreg) {
              // 푸시 서버에서 구독정보 가져옴
              return swreg.pushManager.getSubscription()
            })
            .then(function (sub) {
              if (sub === null) {
                // 처음 구독일 때 처리
                temp_this.fnNewSubscription()
                temp_this.fnDisplayNotification()
              } else {
                // 이미 구독된 경우 처리
                console.log('이미 구독되어 있습니다!')
              }
            })
        },
        // 새로운 구독자 등록 처리
        fnNewSubscription() {
          let temp_this = this
          navigator.serviceWorker.ready
            .then(function (swreg) {
              // 새로운 구독자 등록용 공개키(public key)) 준비
              const vapidPublicKey =
                'BEUb-27a0ug58aSI7yEXKqicaaA7qLI_Pzro-wOWOFY2lD30Z6J1NaZTaSbnPjY2r_P-9Z9YaXyDo9or4IFQjrQ'
              const convertedVapidPublicKey =
                temp_this.urlBase64ToUint8Array(vapidPublicKey)
              // 푸시 서버에 퍼블릭키로 구독정보 등록함
              return swreg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidPublicKey
              }).then(function (newSub) {
                // 신규 구독자 정보 변환 : 로우 데이터 배열 => 필터링된 JSON => 정돈된 배열
                const filteredSub = JSON.parse(JSON.stringify(newSub))
                var pushConfig = {
                  endpoint: filteredSub.endpoint,
                  keys: {
                    p256dh: filteredSub.keys.p256dh,
                    auth: filteredSub.keys.auth
                  }
                }
                // 파이어베이스 DB에 구독자 저장
                return oC210inDB .push(pushConfig)
              })
            })
        },
        // 구독자 등록 해제
        fnUnSubscription() {
          let temp_this = this
          navigator.serviceWorker.ready
            .then(function (swreg) {
              return swreg.pushManager.getSubscription();
            }).then(function (oldSub) {
              temp_this.bMsg = true;
              oldSub.unsubscribe();
            }).catch(err => console.log(err))
        },
        // 푸시 알림 메시지 준비 및 발송
        fnDisplayNotification() {
          const title = 'C210'
          const options = {
            body: '프론트 푸시 알람 구현',
            icon: '/img/push-noti.png',
            badge: '/img/push-badge-icon.png',
            image: '/img/push-image.jpg',
            actions: [{
              action: 'like',
              title: '싸피 ㄱ?',
              icon: '/img/push-coffee.png'
            }],
            vibrate: [500, 100, 500]
          }
          navigator.serviceWorker.ready
            .then(function (swreg) {
              // 가입환영 알림 발송
              swreg.showNotification(title, options)
            })
        },
        // 코드 등록 때 필요할 숫자 컨버터용 유틸리티 함수
        urlBase64ToUint8Array(base64String) {
          const padding = '='.repeat((4 - base64String.length % 4) % 4)
          const base64 = (base64String + padding)
            /* eslint-disable */
            .replace(/\-/g, '+')
            /* eslint-enable */
            .replace(/_/g, '/')
          const rawData = window.atob(base64)
          return Uint8Array.from([...rawData].map((char) =>
            char.charCodeAt(0)))
        },
        goBack() {
          window.history.back();
        }
      }
    }
  </script>
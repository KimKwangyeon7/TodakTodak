<template>
  <div class="notifications">
    <div v-for="notification in notifications" :key="notification.id" class="notification-box" @click="dismissNotification(notification.id)">
      <div class="notification-content">
        <div class="message">{{ notification.message }}</div>
        <div class="time">{{ notification.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        { id: 1, message: '밥먹어라', time: '12:30 PM' },
        { id: 2, message: '양치해라', time: '1:00 PM' },
        { id: 3, message: '세수해라', time: '12:30 PM' },
        { id: 4, message: '설거지해라', time: '1:00 PM' },
        { id: 5, message: '세탁기 돌려라', time: '12:30 PM' },
        { id: 6, message: '저녁 장봐라', time: '1:00 PM' },
        { id: 7, message: '양치해라', time: '12:30 PM' },
        { id: 8, message: '폰끄고 자라', time: '1:00 PM' },
        // 기타 알림 데이터 추가
      ]
    }
  },
  methods: {
    dismissNotification(id) {
      this.notifications = this.notifications.filter(notification => notification.id !== id);
    }
  }
}
</script>

<style scoped>
.notifications {
  padding: 20px;
}

.notification-box {
  background-color: #EAF3F9;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: transform 0.3s ease; /* 애니메이션 효과를 위한 CSS transition 추가 */
}

.notification-box:hover {
  transform: translateX(10px); /* 마우스 호버 시 오른쪽으로 10px 이동 */
}

.notification-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message {
  font-weight: bold;
}

.time {
  color: gray;
}
</style>

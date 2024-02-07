<template>
    <div class="notifications">
      <div class="notifications-title">알림</div>
        <ul>
          <li v-for="notification in notifications" :key="notification.id">
            {{ notification.message }}
          </li>
        </ul>
    </div>
</template>

<script>
export default {
data() {
    return {
      notifications: [
          { id: 1, message: '밥먹어라' },
          { id: 2, message: '양치해라' },
          // 기타 알림 데이터 추가
      ]
    }
  }
}
</script>

<style scoped>
.notifications {
  padding: 20px;
}

.notifications-title {
  list-style-type: none;
  padding: 0;
}

.notifications li {
  margin-left: 10px;  
}
</style>

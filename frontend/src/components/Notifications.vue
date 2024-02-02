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
        { id: 1, message: '새로운 알림 1' },
        { id: 2, message: '새로운 알림 2' },
        // 기타 알림 데이터 추가
    ],
    };
},
};
</script>

<style scoped>
/* 알림 리스트 스타일링 */
.notifications {
padding: 20px;
}

.notifications ul {
list-style-type: none;
padding: 0;
}

.notifications li {
margin-bottom: 10px;
}
</style>

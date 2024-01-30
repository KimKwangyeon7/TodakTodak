<template>
    <div>
      <div v-if="userData">
        <p><strong>Name:</strong> {{ userData.name }}</p>
        <p><strong>Email:</strong> {{ userData.email }}</p>
        <!-- 기타 사용자 정보 표시 -->
      </div>
      <div v-else>
        <p>Loading user information...</p>
      </div>
    </div>
</template>

<script setup>

const props = {
  userData: Object,
}
</script>

<style scoped>
/* 필요한 스타일 지정 */
</style>
  
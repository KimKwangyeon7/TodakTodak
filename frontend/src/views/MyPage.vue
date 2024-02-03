<!-- MyPage.vue -->

<template>
    <div class="mt-5">
      <UserInfo :userData="userData" />
      <SuccessRate :successRate="successRate" />
      <GoalSuccessRate :goalRate="goalRate" />
    </div>
</template>

<script>
import UserInfo from '@/components/MyPage/UserInfo.vue'
import SuccessRate from '@/components/MyPage/SuccessRate.vue'
import GoalSuccessRate from '@/components/MyPage/GoalSuccessRate.vue'

export default {
components: {
    UserInfo,
    SuccessRate,
    GoalSuccessRate,
},
data() {
    return {
    userData: null,
    successRate: null,
    goalRate: null,
    };
},
mounted() {
    this.fetchUserData();
},
methods: {
    async fetchUserData() {
    // 사용자 정보를 가져오는 비동기 함수
    // 예: this.userData = await api.getUserData();
    },
}
};
</script>

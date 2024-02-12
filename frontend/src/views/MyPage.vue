<template>
    <div class="mt-5">
        <button class="settings-button btn" @click="goToSettings"><img src="@/assets/settings.png" alt=""></button>
      <UserInfo :userData="userData" />
      <SuccessRate :successRate="successRate" />
      <SuccessChart :successChart="successChart"/>
      <GoalSuccessRate :goalRate="goalRate" />
    </div>
</template>

<script>
import UserInfo from '@/components/MyPage/UserInfo.vue'
import SuccessRate from '@/components/MyPage/SuccessRate.vue'
import GoalSuccessRate from '@/components/MyPage/GoalSuccessRate.vue'
import SuccessChart from '@/components/MyPage/SuccessChart.vue'

export default {
components: {
    UserInfo,
    SuccessRate,
    GoalSuccessRate,
    SuccessChart
},
data() {
    return {
    userData: null,
    successRate: null,
    goalRate: null,
    successChart: null,
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
    goToSettings() {
      // 설정 페이지로 이동하는 메서드
      this.$router.push('/MypageSettings');
    },
}
};
</script>


<style scoped>
.settings-button {
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: auto;
  display: flex;
}
</style>

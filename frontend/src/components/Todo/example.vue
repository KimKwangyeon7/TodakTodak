<template>
  <div>
    <!-- 날씨 정보를 표시할 영역 -->
    <div v-if="weatherData" class="weather-container">
      <p>온도: {{ weatherData.temperature }}</p>
      <p>날씨: {{ weatherData.description }}</p>
    </div>

    <!-- 데이터 가져오기 버튼 -->
    <button @click="fetchData">데이터 가져오기</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const weatherData = ref(null);
    const quotes = ref(null);

    const fetchData = async () => {
      try {
          local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
          // const response = await local.post(`${url}/${recordId}/save/member`, payload);
          // Construct the query parameters
          const queryParams = new URLSearchParams({ promptNum: prompt, time: time }).toString();
          // Make the POST request to the server with query params
          const response = await local.post(`${url}/${recordId}/save/member?${queryParams}`);
          if (success) success(response);
        } catch (error) {
          console.error('Error saving audio record:', error);
          if (fail) fail(error);
        }
      }

    fetchData();

    return {
      weatherData,
      quotes,
    };
  },
};
</script>

<style scoped>
.weather-container, .quote-container {
  margin-bottom: 20px;
}
</style>

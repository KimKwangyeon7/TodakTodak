<template>
  <div>
    <!-- 날씨 정보를 표시할 영역 -->
    <div v-if="weatherData" class="weather-container">
      <p>온도: {{ weatherData.temperature }}</p>
      <p>날씨: {{ weatherData.description }}</p>
    </div>

    <!-- 명언을 표시할 영역 -->
    <div v-if="quotes" class="quote-container">
      <p v-for="(quote, index) in quotes" :key="index"></p>
    </div>

    <!-- 데이터 가져오기 버튼 -->
    <button @click="fetchData">데이터 가져오기</button>
  </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const weatherData = ref(null);
    const quotes = ref(null);

    const fetchData = async () => {
      try {
        const weatherResponse = await axios.get('/goals/weather');
        weatherData.value = weatherResponse.data;
        console.log(weatherResponse)
        console.log(weatherResponse.data)

        const quoteResponse = await axios.get('/members/quote');
        quotes.value = quoteResponse.data;
      } catch (error) {
        console.error('데이터를 가져오는 도중 에러가 발생했습니다:', error);
      }
    };

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

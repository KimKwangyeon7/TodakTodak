<!-- App.vue -->
<template>
    <div>
      <div v-if="weatherIcon">
        <i :class="weatherIcon"></i>
      </div>
      <div v-else>
        <p>날씨 정보를 불러오는 중입니다...</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        weatherIcon: null
      };
    },
    created() {
      this.getWeather();
    },
    methods: {
      async getWeather() {
        try {
          const response = await fetch('/goals/weather');
          const data = await response.json();
          if (data && data.icon) {
            this.weatherIcon = 'fas fa-' + data.icon;
          }
        } catch (error) {
          console.error('날씨 정보를 불러오는 동안 오류가 발생했습니다:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* 여기에 스타일을 추가하세요 */
  </style>
  
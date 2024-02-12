<template>
  <div class="success-rate">
      <p class="success-rate-title">Success Rate</p>

      <div class="progress-circle-container">
          <div class="progress-circle" :style="{ background: getCircleColor() }">
              <div class="progress-fill" :style="{ transform: `rotate(${calculateRotation()}deg)` }"></div>
          </div>
      </div>
      <div class="rate-container">
          <div class="rate-item">
            <div class="rate-percent">30%</div>
            <div class="unsuccessful-rate">Unsuccessful</div>
          </div>
          <div class="rate-item">
            <div class="rate-percent">70%</div>
            <div class="successful-rate">Successful</div>
          </div>
      </div>
  </div>
</template>

<script setup>
  const props = {
      completionRate: Number,
  }

  const calculateRotation = () => {
      return (props.completionRate / 100) * 360;
  }

  const getCircleColor = () => {
      return `hsl(${props.completionRate * 1.2}, 70%, 50%)`;
  }
</script>

<style scoped>
  .success-rate {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      border-radius: 24px;
      background-color: #EAF3F9;
      box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
  }

  .success-rate-title {
      font-size: 25px;
      margin-top: 20px;
      margin-right: 150px;
  }

  .progress-circle-container {
      width: 200px;
      height: 200px;
      position: relative;
  }

  .progress-circle {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 8px solid #eee;
      position: absolute;
  }

  .progress-fill {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      clip: rect(0, 50%, 100%, 0);
      background: #fff;
      animation: fillAnimation 1s ease-out;
  }

  @keyframes fillAnimation {
      from {
          transform: rotate(0deg);
      }

      to {
          transform: rotate(360deg);
      }
  }

  .rate-container {
      display: flex;
  }

  .rate-item {
      display: flex;
      flex-direction: column;
      align-items: center;
  }

  .rate-percent {
      margin-top: 10px;
      font-size: 18px;
  }

  .unsuccessful-rate {
      /* margin-top: 50px; */
      margin-right: 60px;
      margin-bottom: 20px;
  }

  .successful-rate {
      /* margin-top: 50px; */
      margin-left: 60px;
  }
</style>

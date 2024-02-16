<template>
  <div class="modal-content" style="border-radius: 10px;">

    <div class="modal-title">
      <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
    </div>
    <form>

      <!-- 내용 입력 -->
      <div class="form-group">
        <label for="content">내용:</label>
        <textarea v-model="habitData.content" id="content" class="form-control" rows="3"></textarea>
      </div>

      <!-- 알람 여부 선택 -->
      <!-- alarmed -->
      <div class="form-group">
        <label>알람 여부:</label>
        <div class="custom-control custom-switch">
          
          <div class="form-check form-switch">
            <input v-model="habitData.alarmed" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked"></label>
          </div>
        </div>
      </div>

      <!-- 알람 시간 및 요일 입력 부분 -->
      <div class="form-group" v-if="habitData.alarmed">
        <label>알람 시간 및 요일:</label>
        <div v-for="(alarm, index) in alarmDtoList" :key="index">
          <input v-model="habitData.alarmed.time" type="time" class="form-control">
          <select v-model="habitData.alarmed.day" class="form-control">
            <option value=0>월요일</option>
            <option value=1>화요일</option>
            <option value=2>수요일</option>
            <option value=3>목요일</option>
            <option value=4>금요일</option>
            <option value=5>토요일</option>
            <option value=6>일요일</option>
          </select>
        </div>
        <button @click="addAlarmInput" type="button" class="btn btn-secondary">알람 추가</button>
      </div>

      <button type="submit" class="btn btn-primary" @click="fnAdd">저장</button>
    </form>
  </div>
</template>

<script>
import { addHabit } from '@/api/habits';  

export default {

  data() {
    return {
      content: '',
      important: false,
      outside: false,
      alarmed: false,
      alarmDtoList: [],
      // checked: false,
      // completed: false,
      habitData: {
        content: '',
        important: false,
        outside: false,
        alarmed: false,
        alarmDtoList: [],
        checked: false,
        completed: false,
      }
    };
  },
  methods: {
    
    closeModal() {
      this.$emit('close-modal');
    },

    fourDigitTime(t) {
      const [hours, minutes] = t.split(':')
      return hours + minutes   
    },

    addAlarmInput() {
    this.alarmDtoList.push({ day: '', time: '' }); // 새로운 알람 입력 필드 추가
  },

    fnAdd() {
      
      this.alarmDtoList.forEach(alarm => {
        alarm.time = this.fourDigitTime(alarm.time); // 각 알람의 시간을 변환
      });
      
      addHabit(this.habitData, 
      (response) => {
        console.log(response);
        // 성공 콜백: 성공 메시지 표시, 폼 초기화 등
      }, 
      (error) => {
        console.error(error);
        // 실패 콜백: 에러 메시지 표시 등
      }
    );
      
      this.closeModal() 
    }
  }  
}
</script>

<style scoped>
.modal-content {
  background: #fff; /* 나머지 부분은 하얀색 배경 */
}

.modal-title {
  background: #EAF3F9; /* 제목 부분에만 #EAF3F9 배경 색상 적용 */
  padding: 10px; /* 여백 추가 */
  border-radius: 8px;
  margin-bottom: 20px; /* 여백 추가 */
  display: flex; /* Flexbox 사용 */
  align-items: center; /* 수직 가운데 정렬 */
}

.btn-close {
  width: 20px;
  height: 20px;
  background-color: #eaf3f9; /* 배경 색상 수정 */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  margin-left: auto; /* 나머지 공간을 최대한 차지하여 왼쪽으로 이동 */
}
.form-group {
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;
}

.custom-control-label {
  padding-left: 10px;
}
</style>
<template>
    <div class="modal-content" style="border-radius: 10px;">
  
      <div class="modal-title">
        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
      </div>
      <form>
  
        <!-- 내용 입력 -->
        <div class="form-group">
          <label for="habitContent">내용:</label>
          <textarea v-model="habitContent" id="habitContent" class="form-control" rows="3"></textarea>
        </div>
  
        <!-- 알람 여부 선택 -->
        <!-- isAlarmed -->
        <div class="form-group">
          <label>알람 여부:</label>
          <p>시간 넣어야 하는 거 맞죠?(김요한)</p>
          <div class="custom-control custom-switch">
            
            <div class="form-check form-switch">
              <input v-model="isAlarmed" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
              <label class="form-check-label" for="flexSwitchCheckChecked"></label>
            </div>
          </div>
        </div>
  
        <!-- 알람 시간 입력 -->
        <div class="form-group" v-if="isAlarmed">
          <label for="time">알람 시간:</label>
          <input v-model="time" type="time" id="time" class="form-control">
        </div>
  
        <button type="submit" class="btn btn-primary" @click="submitHabit">저장</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useHabitsStore } from '@/stores/habits';
  import { useAlarmsStore } from '@/stores/alarms';
  
  
  export default {
  
    data() {
      return {
        habitContent: '',
        // 알람 설정
        isAlarmed: false,
        day: '',
        time: '',
        isOutside: false,
        isChecked: false,
        isCompleted: false,
      };
    },
    computed: {
      habits() {
        const habitsStore = useHabitsStore()
        return habitsStore.habits
      },
    },
    methods: {
      closeModal() {
        this.$emit('close-modal');
      },
  
      // 우선 오늘 날짜로 테스트
      eightDigitDate(d) {
        const currentDate = new Date();
        const yyyy = currentDate.getFullYear();
        const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 만듭니다.
        const dd = String(currentDate.getDate()).padStart(2, '0'); // 날짜를 2자리로 만듭니다.
        const curDate= `${yyyy}${mm}${dd}`;
        return curDate
      },
  
      // formattedTime(t) {
      //   if (this.time) {
      //     const [hours, minutes] = this.t.split(':');
      //     const hoursInt = parseInt(hours, 10);
      //     const period = hoursInt >= 12 ? 'PM' : 'AM';
      //     const formattedHours = ((hoursInt + 11) % 12 + 1);
      //     console.log(`${formattedHours}:${minutes} ${period}`)
      //     return `${formattedHours}:${minutes} ${period}`;
      //   }
      //   return '';
      // },
  
      fourDigitTime(t) {
        const [hours, minutes] = t.split(':')
        return hours + minutes   
      },
  
      submitHabit() {
        const habitsStore = useHabitsStore()
        const alarmsStore = useAlarmsStore()
  
        // 우선 오늘 날짜로 테스트
        const d = new Date()
        const t = this.time
  
        habitsStore.addHabit({ 
          habitContent: this.habitContent,
        });
    
        this.day = (d.getDay() + 6) % 7 // 이렇게 하여 0을 월요일로 바꿈
  
        this.closeModal() 
  
        if (this.isAlarmed) {
          // time
          const setTime = this.fourDigitTime(t)
          this.time = setTime
        }
          
        alarmsStore.addAlarm({
          habitId: habitsStore.habits[habitsStore.habits.length - 1].id,
          day: this.day,
          time: this.time, 
          isOutside: this.isOutside,
          isAlarmed: this.isAlarmed,
          isChecked: this.isChecked,
          isCompleted: this.isCompleted,
        }) 

        alarmsStore.sendPushForHabit({
          habitId: habitsStore.habits[habitsStore.habits.length - 1].id,
          day: this.day,
          time: this.time, 
          isOutside: this.isOutside,
          isAlarmed: this.isAlarmed,
          isChecked: this.isChecked,
          isCompleted: this.isCompleted,
        })
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
    background-color: #EAF3F9; /* 배경 색상 수정 */
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    margin-right: auto; /* 나머지 공간을 최대한 차지하여 왼쪽으로 이동 */
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
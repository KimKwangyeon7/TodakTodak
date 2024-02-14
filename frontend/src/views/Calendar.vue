<template>
  
  <main class="calendar-wrapper">
    
      <div md="8">
        <div class="calendar-body">
          <div class="calendar-header">
            <b-row align-v="center">
              <div class="calendar-title">
                <span class="arrow-left" style="margin-right: 15px;" @click="subtractMonth">&lt;</span> 
                {{ year }}년 {{ dateContext.format('M') }}월
                <span class="arrow-right" style="margin-left: 15px;" @click="addMonth">&gt;</span>
              </div>
            </b-row>
          </div>
          <!-- days week -->
          <div class="calendar-weekdays">
            <div class="weekday" v-for="(day, index) in days" :key="index">
              <strong>{{ day }}</strong>
            </div>
          </div>
          <div class="calendar-dates">
<div
  v-for="(date, index) in dateList"
  :key="index"
  class="date text-center"
  :class="{
    'blank': date.blank,
    'weekend': date.weekDay === 'S',
    'previous-month': date.isPreviousMonth,
    'next-month': date.isNextMonth
  }"
  @click="handleDateClick(date, index)"
>
  <span class="day">{{ date.dayNumber }}</span>
  <!-- 선형 바를 날짜 div 안에 추가 -->
  <div v-if="todosForDate(date).length" class="color-bars">
    <div
    v-for="color in uniqueColorsForDate(date)"
    :key="color"
    class="color-bar"
    :style="{ backgroundColor: color }"
  ></div>
</div>
</div>
</div>
        </div>
  
      </div>
  </main>

</template>

<script>
import { useGoalsStore } from '@/stores/goals';
// import { getTodosByMonth } from "@/api/calendar"
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from 'vue-router';
import { getTodoList } from '@/api/todos'
import { getTodoListByMonth } from '@/api/todos'

import moment from 'moment'

export default {
name: 'Calendar',
// mounted() {
//   this.fetchTodos(); // 컴포넌트가 마운트될 때 fetchTodos 호출
// },
setup() {
  const fullDate = ref(moment()); // fullDate를 반응형 데이터로 선언

  watch(fullDate, (newValue, oldValue) => {
    // fullDate가 변경될 때 수행할 작업
    console.log(`fullDate가 ${oldValue}에서 ${newValue}로 변경되었습니다.`);
    // 필요한 로직 추가
  });

  const goalsStore = useGoalsStore();

// 모든 목표의 색상 정보를 배열로 반환하는 계산된 속성
  const goalColors = computed(() => goalsStore.goals.map(goal => goal.color));
  console.log("가져온색상:", goalColors.value);
  const monthTodos = ref([])
  const todos = ref([])
  const nowMonth = ref('')
  const currentMonth = moment().format('MM');
  nowMonth.value = currentMonth;
  const route = useRoute(); // 현재 라우트에 접근
  const selectedDate = ref(route.params.selectedDate || moment().format('YYYY-MM-DD')); // URL 파라미터에서 selectedDate 가져오거나 기본값 설정
  onMounted(async () => {
    
    try {
      const formattedDate = moment(selectedDate.value).format('YYYYMMDD')
      console.log('formattedDate:', formattedDate)
      const response = await getTodoList(formattedDate); // API 호출을 통해 Todo 목록을 가져옴
      todos.value = response; // 가져온 Todo 목록으로 로컬 상태 업데이트
      console.log('todos:', todos.value)
    } catch (error) {
      console.error('Error fetching todos:', error); // 에러 처리
    }
    try {
      const formattedMonth = moment(selectedDate.value).format('MM')
      // console.log('formattedMonth:', formattedMonth)
      const response = await getTodoListByMonth(formattedMonth); // API 호출을 통해 Todo 목록을 가져옴
      monthTodos.value = response; // 가져온 Todo 목록으로 로컬 상태 업데이트
      // console.log('todos2:', monthTodos.value)
    } catch (error) {
      console.error('Error fetching todos:', error); // 에러 처리
    }
  });

  const uniqueColors = computed(() => {
    const colors = todos.value.map(todo => todo.color);
    return [...new Set(colors)]; // Set을 사용하여 중복 제거 후, 다시 배열로 변환
  });

  return { 
    goalColors,
    todos,
    uniqueColors,
    monthTodos,
    nowMonth,
    fullDate
   };
},
data() {
  return {
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthIntNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    today: moment(),
    dateContext: moment(),
    selectedDate: moment(),
    days: ["월", "화", "수", "목", "금", "토", "일"],
    fixtureDate: [],
    activeDates: [],
    isStyleCurrentDate: true,
    currentMonth: this.dateContext ? this.dateContext.format('MM') : null
  }
},
props: {
  selectedColor: String
},
computed: {
  // goalColors() {
  //   const goalsStore = useGoalsStore();
  //   // 목표 배열에서 각 목표의 색상만 추출하여 배열로 반환
  //   return goalsStore.goals.map(goal => goal.color);
  // },

  monthNumber: function () {
  // 월 이름을 숫자로 변환
  return this.monthNames.indexOf(this.month) + 1;
  },
  year: function () {
    return this.dateContext.format("Y");
  },
  month: function () {
    return this.dateContext.format("MMMM");
  },
  daysInMonth: function () {
    return this.dateContext.daysInMonth();
  },
  currentDate: function () {
    return this.dateContext.get("date");
  },
  firstDayOfMonth: function () {
    let firstDay = moment(this.dateContext).subtract(this.currentDate, "days");
    let weekday = firstDay.weekday();
    console.log('First day of month:', weekday);
    return firstDay.weekday();
  },
  previousMonth: function () {
    return moment(this.dateContext).subtract(1, "month");
  },
  nextMonth: function () {
    return moment(this.dateContext).add(1, "month");
  },
  daysInPreviousMonth: function () {
    return this.previousMonth.daysInMonth();
  },
  daysFromPreviousMonth: function () {
    let daysList = [];
    let count = this.daysInPreviousMonth - this.firstDayOfMonth;

    while (count < this.daysInPreviousMonth) {
      count++;
      daysList[count] = count;
    }

    return daysList.filter(function () {
      return true;
    });
  },
  dateList: function () {
    let $this = this;
    let dateList = [];

    //counters
    let countDayInCurrentMonth = 0;  // index number
    let countDayInPreviousMonth = 0;

    //filling in dates from the previous month
    this.daysFromPreviousMonth.forEach(function (dayFromPreviousMonth) {
      countDayInCurrentMonth++;
      countDayInPreviousMonth++;

      let formattedDay = $this.formattingDay(dayFromPreviousMonth);

      dateList[countDayInCurrentMonth] = {
        key: countDayInCurrentMonth,
        year: parseInt($this.year),
        month: parseInt($this.month) - 1,
        dayNumber: formattedDay,
        blank: true,
        today: false,
        now: false,
        weekDay: false,
        isPreviousMonth: true  // 이전 달의 날짜를 구별하기 위한 플래그
      };
    });

    //filling in dates from the current month
    while (countDayInCurrentMonth < this.firstDayOfMonth + this.daysInMonth) {
      countDayInCurrentMonth++;

      let day = countDayInCurrentMonth - countDayInPreviousMonth;
      let weekDay = this.getWeekDay(countDayInCurrentMonth);
      // let formattedDay = this.formattingDay(day);
      let formattedDay = day;

      dateList[countDayInCurrentMonth] = {
        key: countDayInCurrentMonth,
        dayNumber: formattedDay, 
        blank: false,
        today: false,
        dates: moment({year: this.year, month: this.monthIntNames, day: day}).format('YYYYMMDD'), // YYYYMMDD 형식의 문자열
        now:
          formattedDay === this.initialDate &&
          this.todayInCurrentMonthAndYear,
        weekDay: weekDay
      };
    }

    let daysInNextMonth = 7 - (countDayInCurrentMonth % 7);
    let countDayInCurrentMonthSaved = countDayInCurrentMonth;
    let day = 0;

    // filling in dates from the next month
    if (daysInNextMonth < 7) {
      while (
        countDayInCurrentMonth <
        countDayInCurrentMonthSaved + daysInNextMonth
      ) {
        countDayInCurrentMonth++;
        day++;

        // let formattedDay = this.formattingDay(day);
        let formattedDay = day;

        dateList[countDayInCurrentMonth] = {
          key: countDayInCurrentMonth,
          year: parseInt($this.year),
          month: parseInt($this.month) - 1,
          dayNumber: formattedDay,
          blank: true,
          today: false,
          now: false,
          weekDay: false,
          isNextMonth: true  // 다음 달의 날짜를 구별하기 위한 플래그
        };
      }
    }

    $this.fixtureDate = dateList.filter(function () {
      return true;
    });

    return $this.fixtureDate
  },
  initialDate: function () {
    // return this.formattingDay(this.today.get("date"));
    return this.today.get("date");
  },
  initialMonth: function () {
    return this.today.format("MMMM");
  },
  initialYear: function () {
    return this.today.format("Y");
  },
  todayInCurrentMonthAndYear: function () {
    return (
      this.month === this.initialMonth &&
      this.year === this.initialYear
    );
  }
},
methods: {
  // 이전달로 이동
  subtractMonth() {
    this.dateContext = moment(this.dateContext).subtract(1, "month");
    this.fullDate = moment(this.dateContext).startOf('month'); // 해당 달의 첫 번째 날로 fullDate 설정
    this.updateMonthTodos(); // 투두 목록 업데이트
  },

  // 다음 달로 이동
  addMonth() {
    this.dateContext = moment(this.dateContext).add(1, "month");
    this.fullDate = moment(this.dateContext).startOf('month'); // 해당 달의 첫 번째 날로 fullDate 설정
    this.updateMonthTodos(); // 투두 목록 업데이트
  },

  // 달을 넘길 때 호출되는 메서드
  updateMonthTodos() {
    const currentMonth = this.dateContext.format('MM');
    getTodoListByMonth(currentMonth)
      .then(response => {
        this.monthTodos = response;
        // console.log('새로불러온달투두', this.monthTodos)
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  },
  // 음 해당 날짜에 투두가 있는지 확인
//   todosForDate(date) {
//   const fullDate = moment(date.dates, 'YYYYMMDD');
//   const currentMonth = this.dateContext.format('MM');

//   return this.monthTodos.filter(todo => {
//     const todoDate = moment(todo.todoDate, 'YYYYMMDD');
//     const isSameDayAndMonth = todoDate.isSame(fullDate, 'day') && todoDate.format('MM') === currentMonth;
//     if (isSameDayAndMonth) {
//         console.log('Matching date:', todoDate.format('YYYY-MM-DD'));
//     }
//     return isSameDayAndMonth;
//   });
// },
  todosForDate(date) {
    const fullDate = moment(date.dates, 'YYYYMMDD');
    // console.log('fullDate:', fullDate)
    const currentMonth = this.dateContext.format('MM');
    
    // 특정 날짜에 해당하는 투두들을 필터링하고, 해당 달에 속하는지도 확인
    return this.monthTodos.filter(todo => {
      // console.log('새로변한 monthTodos:', this.monthTodos)
      // console.log('dateContext:', currentMonth)
      const todoDate = moment(todo.todoDate, 'YYYYMMDD');
      // console.log('todoDate:', todoDate.format('MM'))
      console.log()
      // return todoDate.isSame(fullDate, 'day') && todoDate.format('MM') === currentMonth;
      return todoDate.format('DD') === fullDate.format('DD') && todoDate.format('MM') === currentMonth;

    });
  },

  uniqueColorsForDate(date) {
    const todos = this.todosForDate(date);
    const colors = todos.map(todo => todo.color);
    return [...new Set(colors)]; // 중복 제거
  },

  hasTodos(date) {
    const fullDate = moment(date.dates, 'YYYYMMDD');
    return this.monthTodos.some(todo => {
      return moment(todo.todoDate, 'YYYYMMDD').isSame(fullDate, 'day');
    });
  },
  
  isToday(date) {
    const today = moment();
    // console.log('today:', today)
    return today.isSame(moment({ year: date.year, month: date.month, day: date.dayNumber }), 'day');
  },
  mounted() {
  this.fetchTodos(); // 컴포넌트가 마운트될 때 fetchTodos 호출
  },
  handleDateClick(date, index) {
      if (date.isPreviousMonth) {
          this.subtractMonth();
      } else if (date.isNextMonth) {
          this.addMonth();
      } else {
          this.setSelectedDate(date, index);
      }
  },
  // addMonth: function () {
  //   this.dateContext = this.nextMonth;
  // },
  // subtractMonth: function () {
  //   this.dateContext = this.previousMonth;
  // },
  setSelectedDate: function (date, index) {
    console.log('Year:', this.year);  // 수정된 부분: date에서 year를 바로 가져오도록 변경
    console.log('Month:', this.month);
    console.log('Day Number:', date.dayNumber);
    
// formattedDay를 숫자로 변환
let formattedDay = parseInt(date.dayNumber);
let formattedyear = parseInt(this.year)

console.log('Formatted Day1:', formattedDay);
console.log('Formatted Year1:', formattedyear)
// moment 객체 생성
this.selectedDate = moment({
  year: formattedyear,
  month: this.monthNumber - 1,
  day: formattedDay
});

console.log('Formatted Date2:', this.selectedDate.format('YYYYMMDD'));

if (!this.selectedDate.isValid()) {
  console.error('Invalid Date!');
}
this.$router.push({
  name: 'CalendarDetail', 
  params: {
    selectedDate: this.selectedDate.isValid() ? this.selectedDate.format('YYYY-MM-DD') : null,
  },
});
this.$router.push({
  name: 'CalendarAddTodo', 
  params: {
    selectedDate: this.selectedDate.isValid() ? this.selectedDate.format('YYYY-MM-DD') : null,
  },
});
    // reset last value
    this.fixtureDate.forEach(i => {
      i.today = false
    })
    this.activeDates = []

    let keys = [
      [1, 7],
      [8, 14],
      [15, 21],
      [22, 28],
      [29, 35],
      [36, 42]
    ];
    let key = this.fixtureDate[index].key
    let foundKey = []

    // search
    for (let i = 0; i < keys.length; i++) {
      if (key >= keys[i][0] && key <= keys[i][1]) {
        foundKey = keys[i]

        break;
      }
    }

    if (!this.isStyleCurrentDate) this.isStyleCurrentDate = true

    // fill
    this.fixtureDate.forEach(i => {
      if (i.key >= foundKey[0] && i.key <= (foundKey[1] - 2)) {
        this.activeDates.push(new Date(
          this.year,
          moment().month(this.month).format("M") - 1,
          i.dayNumber
        ));

        if (this.todayInCurrentMonthAndYear && this.initialDate === i.dayNumber) {
          this.isStyleCurrentDate = false
        }

        i.today = true
      }
    })
  },
  formattingDay(day) {
    return ("0" + day).slice(-2);
  },
  getWeekDay(day) {
    let index = day;

    if (index > 7) {
      index %= 7;
    }
    index = index === 0 ? 6 : index - 1;

    return this.days[index];
  },
  accept() {
    console.log(this.activeDates)
  },
}
}
</script>

<style scope>
.calendar-wrapper {
display: flex;
margin: 2.5em 0;
overflow: auto;
height: 700px;
}

/* .calendar-body {


} */

.calendar-header {
margin-bottom: 3rem;
}

.calendar-header .month {
font-family: Lato;
font-size: 20px;
font-weight: bold;
font-style: normal;
font-stretch: normal;
line-height: normal;
letter-spacing: 0.5px;
color: #222350;
}

.calendar-header .year {
font-size: 1.5em;
font-weight: 600;
margin-bottom: 1rem;
color: red;
}

/* .calendar-weekdays {
width: 100%;
display: flex;
margin-bottom: 1.25rem;
color: #2091a2;
font-size: 16px;
} */

.calendar-weekdays .weekday {
width: calc(100% / 7);
font-size: 16px;
line-height: 1.25;
text-align: center;
color: #2091a2;
}

.calendar-dates {
width: 100%;
display: flex;
flex-wrap: wrap;
position: relative;
height: 395px;
}

.day:hover {
cursor: pointer;
}

.calendar-dates .date {
padding: 0.5rem; /* 상하좌우 패딩을 늘림 */
margin-bottom: 1rem; /* 하단 마진을 늘림 */
height: auto; /* 높이를 자동으로 조정하여 내용에 맞게 함 */
}

/* .calendar-dates .date.blank {
color: #949ba4;
}

.calendar-dates .date.no-border-right {
border-right: none;
} */



.date.today:first-child,
:not(.today)+.today {
border-top-left-radius: 20px;
border-bottom-left-radius: 20px;
}

.date.today+.date.today+.date.today+.date.today+.date.today {
border-top-right-radius: 20px;
border-bottom-right-radius: 20px;
}

/* .calendar-dates .date.now {
border: 1px solid #45b7c1;
border-radius: 100px;
color: #45b7c1;
margin-top: -1px;
} */

/* .calendar-dates .date .weekday {
display: none;
} */

.arrow-left {
margin-left: 90px;
}

.arrow-right {
margin-right: 90px;
}

.arrow-left,
.arrow-right:hover {
cursor: pointer;
}

/* .btn-accept {
width: 75px;
height: 35px;
background-color: #45b7c1;
color: #ffffff;
border: none;
border-radius: 7px;
font-size: 14px;
text-align: center;
float: right;
} */

.c-hr {
border: none;
height: 1px;
background-color: #949ba4;
opacity: 0.61;
}

.calendar-footer {
margin-top: 30px;
}

.calendar-title {
font-size: 20px;
color: #222350;
text-align: center;
}

.weekend {
color: #222350;
}

/* .vcal-date:hover {
background-color: #3498db;
color: #ffffff;
} */

.color-box {
width: 20px; /* 상자의 너비 */
height: 20px; /* 상자의 높이 */
display: inline-block; /* 상자를 인라인 요소처럼 배치 */
margin-right: 4px; /* 상자 사이의 간격 */
}

.color-bar {
height: 5px; /* 색상 바의 높이 */
width: 100%; /* 색상 바의 너비 */
margin-top: 2px; /* 색상 바 위의 마진 */
}


.calendar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 70px auto 0; /* 상단 여백 조정 및 가운데 정렬 */
  overflow: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  border-radius: 8px; /* 테두리 둥글게 */
}

.calendar-body {
  width: 100%; /* 전체 너비 사용 */
  max-width: 500px; /* 최대 너비 설정 */
  background-color: #ffffff; /* 배경색 설정 */
  padding: 1rem; /* 패딩 추가 */
  max-height:800px; /* 최소 높이 설정 */
}

.calendar-body button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem; /* 버튼 하단 여백 조정 */
  background: none; /* 버튼 배경 투명화 */
  border: none; /* 테두리 제거 */
  cursor: pointer; /* 커서 포인터로 변경 */
}

.calendar-weekdays {
  display: flex;
  margin-bottom: 1rem; /* 하단 여백 조정 */
  color: #2091a2; /* 주요 색상 설정 */
}

.calendar-weekdays .date {
  flex: 1; /* 평등하게 공간 분배 */
  text-align: center;
  padding: 0.5rem 0; /* 패딩 추가 */
}

.calendar-weekdays .date.bold {
  font-weight: bold; /* 폰트 굵게 */
}

.calendar-dates {
  display: flex;
  flex-wrap: wrap;
  height: 500px;
}

.calendar-dates .date {
  width: 14.28%; /* 7일에 맞게 너비 조정 */
  padding: 0.5rem; /* 패딩 추가 */
  text-align: center; /* 텍스트 가운데 정렬 */
  border-radius: 4px; /* 테두리 둥글게 */
  transition: background-color 0.3s, color 0.3s; /* 배경 및 글자 색상 전환 효과 */
}

.date:hover {
  background-color: #e8f0f2; /* 호버 시 배경색 변경 */
  color: #333; /* 호버 시 글자 색상 변경 */
}

.calendar-dates .date.today {
  background-color: #45b7c1; /* 오늘 날짜 배경색 */
  color: white; /* 오늘 날짜 글자색 */
  font-weight: bold; /* 오늘 날짜 굵게 */
}

.calendar-dates .date.now {
  border: 2px solid #45b7c1; /* 현재 시간 테두리 */
  color: #45b7c1; /* 현재 시간 글자색 */
}

.button-container {
  display: flex;
  justify-content: space-between;
  width: 100%; /* 컨테이너 너비를 최대로 설정 */
  margin-bottom: 1rem; /* 버튼 하단 여백 */
}

.btn, .add-button {
  cursor: pointer; /* 커서 포인터로 변경 */
  background: none; /* 배경 투명화 */
  border: none; /* 테두리 제거 */
}

.add-button {
  font-size: 1.5rem; /* + 버튼의 글자 크기를 키움 */
  padding: 0.5rem 1rem; /* 패딩 추가로 버튼 크기 조정 */
  border-radius: 50%; /* 원형으로 만듬 */
  line-height: 1; /* 라인 높이 조정 */
  margin-left: auto; /* 왼쪽 자동 마진으로 오른쪽 정렬 */
}
</style>
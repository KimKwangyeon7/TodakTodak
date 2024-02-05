<template>
  <b-container>
    <main class="calendar-wrapper">
      <b-row>
        <b-col md="8">
          <div class="calendar-body">
            <div class="calendar-header">
              <b-row align-v="center">
                <div class="calendar-title">
                  <span class="arrow-left" @click="subtractMonth">&lt;</span> 
                  {{ year }}년 {{ dateContext.format('M') }}월
                  <span class="arrow-right" @click="addMonth">&gt;</span>
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
              <div class="date text-center"
               :class="{
                'today': date.today,
                'blank': date.blank,
                'now': (date.now && isStyleCurrentDate),
                'weekend': date.weekDay === 'S',
                'previous-month': date.isPreviousMonth,
                'next-month': date.isNextMonth
              }" 
              v-for="(date, index) in dateList"
              @click="handleDateClick(date, index)"
              :key="index">
                <span class="day">{{ date.dayNumber }}</span>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </main>
  </b-container>
</template>

<script>
import moment from 'moment'

export default {
  name: 'Calendar',
  data() {
    return {
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      today: moment(),
      dateContext: moment(),
      selectedDate: moment(),
      days: ["월", "화", "수", "목", "금", "토", "일"],
      fixtureDate: [],
      activeDates: [],
      isStyleCurrentDate: true
    }
  },
  computed: {
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
    handleDateClick(date, index) {
        if (date.isPreviousMonth) {
            this.subtractMonth();
        } else if (date.isNextMonth) {
            this.addMonth();
        } else {
            this.setSelectedDate(date, index);
        }
    },
    addMonth: function () {
      this.dateContext = this.nextMonth;
    },
    subtractMonth: function () {
      this.dateContext = this.previousMonth;
    },
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

  console.log('Formatted Date2:', this.selectedDate.format('YYYY-MM-DD'));

  if (!this.selectedDate.isValid()) {
    console.error('Invalid Date!');
  }

  this.$router.push({
    name: 'CalendarDetail',
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
    }
  }
}
</script>

<style>
.calendar-wrapper {
  display: flex;
  margin: 2.5em 0;
  overflow: auto;
}

.calendar-body {
  width: 384px;
  height: 394px;
}

.calendar-header {
  margin-bottom: 2rem;
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

.calendar-weekdays {
  display: flex;
  margin-bottom: 1.25rem;
  color: #2091a2;
  font-size: 16px;
}

.calendar-weekdays .weekday {
  width: calc(100% / 7);
  font-size: 16px;
  line-height: 1.25;
  text-align: center;
  color: #2091a2;
}

.calendar-dates {
  display: flex;
  flex-wrap: wrap;
  position: relative;
}

.day:hover {
  cursor: pointer;
}

.calendar-dates .date {
  font-weight: 200;
  padding: 0.25rem 0.5rem;
  position: relative;
  width: calc(100% / 7);
  margin-top: 1px;
}

.calendar-dates .date.blank {
  color: #949ba4;
}

.calendar-dates .date.no-border-right {
  border-right: none;
}

.calendar-dates .date.today {
  background-color: #45b7c1;
  color: white !important;
}

.date.today:first-child,
:not(.today)+.today {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}

.date.today+.date.today+.date.today+.date.today+.date.today {
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}

.calendar-dates .date.now {
  border: 1px solid #45b7c1;
  border-radius: 100px;
  color: #45b7c1;
  margin-top: -1px;
}

.calendar-dates .date .weekday {
  display: none;
}

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

.btn-accept {
  width: 75px;
  height: 35px;
  background-color: #45b7c1;
  color: #ffffff;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  text-align: center;
  float: right;
}

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

.vcal-date:hover {
  background-color: #3498db;
  color: #ffffff;
}
</style>

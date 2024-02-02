import { defineStore } from 'pinia'
// import axios from 'axios'
// import { useTodosStore } from './todos'
// import { useHabitsStore } from './habits'


export const useAlarmsStore = defineStore({
  id: 'alarms', // The unique ID of the store across your application
  state: () => ({
    alarms: [],
    nextAlarmId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token

  actions: {

    addAlarm(newAlarm) {
      const alarmWithId = { id: this.nextAlarmId++, ...newAlarm}
      this.alarms.push(alarmWithId)
      console.log(this.alarms)
    },

    resetAlarms() {
      this.alarms = []; // Reset the goals array to an empty array
      this.nextAlarmId = 1; // Reset the ID as well
    },

    sendPush(alarm) {
      if (alarm.todoId) {
        const title = alarm.todoTitle
        const message = alarm.todoContent
      }
      else if (alarm.habitId) {
        const title = alarm.habitTitle
        const message = ""
      } 
      const preparedData = JSON.stringify({
        pTitle: title, pMsg: message
      })

      fetch('https://us-central1-c210-67728.cloudfunctions.net/storePushData', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: preparedData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data.message);
      })
      .catch(err => console.log('오류!' + err.message));
    }

  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_alarms',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});
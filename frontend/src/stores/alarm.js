import { defineStore } from 'pinia'
// import axios from 'axios'
import { useTodosStore } from './todos'
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

    logAlarms() {
      this.alarms.forEach(alarm => {
        console.log(`id: ${alarm.id}, todoTitle: ${alarm.todoTitle}, todoContent: ${todo.todoContent}, todoDate: ${todo.eightDigitDate}, isImportant: ${todo.isImportant}`);
      });
    },

    resetAlarms() {
      this.alarms = []; // Reset the goals array to an empty array
      this.nextAlarmId = 1; // Reset the ID as well
    },
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
import { defineStore } from 'pinia'
// import axios from 'axios'


export const useHabitsStore = defineStore({
  id: 'habits', // The unique ID of the store across your application
  state: () => ({
    habits: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token


  actions: {
    addHabit(newHabit) {
      const habitWithId = { id: this.nextId++, ...newHabit }; 
      this.habits.push(habitWithId);
      console.log('habitWithId', habitWithId.id)
    },

    logHabits() {
      this.habits.forEach(habit => {
        console.log(`id: ${habit.id}, habitContent: ${habit.habitContent}, createdDate: ${habit.createdDate}`);
      });
    },

    resetHabits() {
      this.habits = []; // Reset the goals array to an empty array
      this.nextId = 1; // Reset the ID as well
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_habits',
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});
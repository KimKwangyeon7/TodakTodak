import { defineStore } from 'pinia'
// import axios from 'axios'

export const useGoalsStore = defineStore({
  id: 'goals', // The unique ID of the store across your application
  state: () => ({
    goals: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
  // const API_URL
  // const token
  actions: {
    addGoal(newGoal) {
      const goalWithId = { id: this.nextId++, ...newGoal }; // Assign an ID to the new goal
      this.goals.push(goalWithId);
    },

    logGoals() {
      this.goals.forEach(goal => {
        console.log(`id: ${goal.id}, goalContent: ${goal.goalContent}, color: ${goal.color}`);
      });
    },

    resetGoals() {
      this.goals = []; // Reset the goals array to an empty array
      this.nextId = 1; // Reset the ID as well
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_goals',
        storage: sessionStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});

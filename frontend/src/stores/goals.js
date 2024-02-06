import { defineStore } from 'pinia'
import apiClient from './apiClient';

export const useGoalsStore = defineStore({
  id: 'goals', // The unique ID of the store across your application
  state: () => ({
    goals: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),

  actions: {
    async addGoal(newGoal) {
      try {
          // const response = await apiClient.post('/goals', newGoal);
          // this.goals.push(response.data); 
          const goalWithId = { id: this.nextId++, ...newGoal }
          this.goals.push(goalWithId)
          console.log("Goal added:", response.data);
      } catch (error) {
          console.error("Error adding goal:", error);
      }
    },

    async getGoalLIst() {
      try {
          const response = await apiClient.get('/goals');
          console.log("Goal List:", response.data);
      } catch (error) {
          console.error("Error searching goal:", error);
      }
    },

    async getGoalDetail(goalId) {
      try {
          const response = await apiClient.get(`/goals/${goalId}`);
          console.log("Goal details:", response.data);
      } catch (error) {
          console.error("Error searching goal:", error);
      }
    },

    async updateGoal(goalId, goalUpdateInfo) {
        try {
          const response = await apiClient.put(`/goals/${goalId}`, goalUpdateInfo);
          console.log(response.data);
        } catch (error) {
            console.error(error);
      }
    },

    async deleteGoal(goalId) {
      try {
        // const response = await apiClient.delete(`/goals/${goalId}`);
        const index = this.goals.findIndex(goal => goal.id === goalId);
        if (index !== -1) {
          // Remove the deleted todo from the this.todos array using splice
          this.goals.splice(index, 1);
        }
        console.log(response.data);
      } catch (error) {
          console.error(error);
      }
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
        storage: localStorage, // Or localStorage if you want persistence across sessions
      },
    ],
  }
});

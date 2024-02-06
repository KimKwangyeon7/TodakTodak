import { defineStore } from 'pinia'
import apiClient from '@/stores/apiClient'

export const useHabitsStore = defineStore({
  id: 'habits', // The unique ID of the store across your application
  state: () => ({
    habits: [],
    nextId: 1, // This does not need to be a ref since it's primitive and you are not using it in a template
  }),
    // const API_URL
  // const token


  actions: {
    async addHabit(newHabit) {
      try {
        // const response = await apiClient.post('/habits', newHabit);
        // this.habits = response.data;
        const habitWithId = { id: this.nextId++, ...newHabit }
        this.habits.push(habitWithId)
        console.log("Habit added:", response.data)
      } catch (error) {
        console.error('Error creating habit:', error);
      }
    },

    async getHabitList() {
      try {
        const response = await apiClient.get('/habits');
        this.habits = response.data;
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    },

    async getHabitListByDay(day) {
      try {
        const response = await apiClient.get(`/habits/day/${day}`);
        this.habits = response.data;
      } catch (error) {
        console.error('Error fetching habits by day:', error);
      }
    },

    async isHabitCompleted(habitId, alarmId) {
      try {
        const response = await apiClient.patch(`/habits/${habitId}/${alarmId}/complete`);
        this.habits[hatibId].isCompleted = true;
      } catch (error) {
        console.error('Error completing habit:', error);
      }
    },

    async getHabitDetail(habitId) {
      try {
        const response = await apiClient.get(`/habits/${habitId}`);
        // 여기에서 특정 습관의 상세 정보를 처리할 수 있습니다.
      } catch (error) {
        console.error('Error fetching habit detail:', error);
      }
    },

    async updateGoal(habitId, habitUpdateInfo) {
      try {
        const response = await apiClient.put(`/habits/${habitId}`, habitUpdateInfo);
        console.log(response.data);
      } catch (error) {
          console.error(error);
    }
  },

  async deleteGoal(habitId) {
    try {
      // const response = await apiClient.delete(`/goals/${goalId}`);
      const index = this.goals.findIndex(habit => habit.id === habitId);
      if (index !== -1) {
        // Remove the deleted todo from the this.todos array using splice
        this.habits.splice(index, 1);
      }
      console.log(response.data);
    } catch (error) {
        console.error(error);
    }
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
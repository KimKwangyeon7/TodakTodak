import apiClient from './habitsApiClient';

async function addHabit(newHabit) {
  try {
    const response = await apiClient.post(newHabit);
    console.log("Habit added:", response.data);
  } catch (error) {
    console.error('Error creating habit:', error);
  }
}

async function getHabitList() {
  try {
    const response = await apiClient.get();
    console.log("Habits fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching habits:', error);
  }
}

async function getHabitListByDay(day) {
  try {
    const response = await apiClient.get(`/day/${day}`);
    console.log("Habits by day:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching habits by day:', error);
  }
}

async function isHabitCompleted(habitId, alarmId) {
  try {
    const response = await apiClient.patch(`/${habitId}/${alarmId}/complete`);
    console.log("Habit completion updated:", response.data);
  } catch (error) {
    console.error('Error completing habit:', error);
  }
}

async function getHabitDetail(habitId) {
  try {
    const response = await apiClient.get(`/${habitId}`);
    console.log("Habit details:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching habit detail:', error);
  }
}

async function updateHabit(habitId, habitUpdateInfo) {
  try {
    const response = await apiClient.put(`/${habitId}`, habitUpdateInfo);
    console.log("Habit updated:", response.data);
  } catch (error) {
    console.error('Error updating habit:', error);
  }
}

async function deleteHabit(habitId) {
  try {
    const response = await apiClient.delete(`/${habitId}`);
    console.log("Habit deleted:", response.data);
  } catch (error) {
    console.error('Error deleting habit:', error);
  }
}


export {
  addHabit,
  getHabitList,
  getHabitListByDay,
  isHabitCompleted,
  getHabitDetail,
  updateHabit,
  deleteHabit,
};

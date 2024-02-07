import apiClient from './goalsApiClient';

async function addGoal(newGoal) {
  try {
    await apiClient.post(newGoal);
    console.log("Goal added successfully");
  } catch (error) {
    console.error("Error adding goal:", error);
  }
}

async function getGoalList() {
  try {
    const response = await apiClient.get();
    console.log("Goal List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching goal list:", error);
  }
}

async function getGoalDetail(goalId) {
  try {
    const response = await apiClient.get(`/${goalId}`);
    console.log("Goal details:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching goal detail:", error);
  }
}

async function updateGoal(goalId, goalUpdateInfo) {
  try {
    await apiClient.put(`/${goalId}`, goalUpdateInfo);
    console.log("Goal updated successfully");
  } catch (error) {
    console.error("Error updating goal:", error);
  }
}

async function deleteGoal(goalId) {
  try {
    await apiClient.delete(`/${goalId}`);
    console.log("Goal deleted successfully");
  } catch (error) {
    console.error("Error deleting goal:", error);
  }
}

export {
  addGoal,
  getGoalList,
  getGoalDetail,
  updateGoal,
  deleteGoal
};

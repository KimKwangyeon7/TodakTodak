/* eslint-disable no-unused-vars */
import { localAxios } from "@/util/http-commons";
import apiClient from "./goalsApiClient";

const local = localAxios(); // axios instance

const url = "/goals";

function addGoal(goal, success, fail) {
  console.log("addGoal 실행", goal);
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`${url}`, JSON.stringify(goal)).then(success).catch(fail);
}

function getGoalList(success, fail) {
  console.log("goalList 실행");
  local.defaults.headers.Authorization = 'Bearer '+ localStorage.getItem("accessToken");
  local.get(`/goals`).then(success).catch(fail);
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

export { addGoal, getGoalList, getGoalDetail, updateGoal, deleteGoal };

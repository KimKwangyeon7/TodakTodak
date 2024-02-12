/* eslint-disable no-unused-vars */
import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/goals";

function addGoal(goal, success, fail) {
  console.log("addGoal 실행", goal);
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`${url}`, JSON.stringify(goal)).then(success).catch(fail);
}

<<<<<<< HEAD
async function getGoalList() {
  try {
    const response = await apiClient.get();
    console.log("Goal List:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching goal list:", error);
    return null; // 오류 발생 시 null 반환
  }
=======
function getGoalList(success, fail) {
  console.log("goalList 실행");
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}`).then(success).catch(fail);
>>>>>>> 303ee358e04ccb666ebee7aec46018ca2ff1cf62
}

async function getGoalDetail(goalId, success, fail) {
  console.log("getGoalDetail 실행");
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
  local.get(`${url}/${goalId}`).then(success).catch(fail) 
}

async function updateGoal(goalId, content, color, success, fail) {
  console.log("updateGoal 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
  local.get(`${url}/${goalId}`, JSON.stringify(content, color)).then(success).catch(fail) 
}

async function deleteGoal(goalId) {
  console.log("deleteGoal 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
  local.delete(`${url}/${goalId}`).then(success).catch(fail)
}

export { addGoal, getGoalList, getGoalDetail, updateGoal, deleteGoal };

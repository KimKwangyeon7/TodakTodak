/* eslint-disable no-unused-vars */
import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/goals";

function addGoal(goal, success, fail) {
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`${url}`, JSON.stringify(goal)).then(success).catch(fail);
}

async function getGoalList(success, fail) {
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}`).then(success).catch(fail);

}

async function getGoalDetail(goalId, success, fail) {
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
  local.get(`${url}/${goalId}`).then(success).catch(fail) 
}

async function updateGoal(goalId, content, color, success, fail) {
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
  local.put(`${url}/${goalId}`, (content, color)).then(success).catch(fail) 
}

async function deleteGoal(goalId) {
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken")
  local.delete(`${url}/${goalId}`).then(success).catch(fail)
}

export { addGoal, getGoalList, getGoalDetail, updateGoal, deleteGoal };

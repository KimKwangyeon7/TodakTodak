import { localAxios } from '@/util/http-commons'
import { alarm } from './alarms'

const local = localAxios();
const url = "/goals/habits"

async function addHabit(data, success, fail) {
  console.log("addHabit 실행")
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`/goals/habits`, data).then(success).catch(fail);
}

async function getHabitList(success, fail) {
  console.log("getHabitList 실행");
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}`).then(success).catch(fail);
}

async function getHabitListByDay(day, success, fail){
  console.log("getHabitListByDay 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}/day/${day}`).then(success).catch(fail)
}

async function isHabitCompleted(habitId, alarmId, success, fail) {
  console.log("isHabitCompleted 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.patch(`${url}/${habitId}/${alarmId}/complete`).then(success).catch(fail)
}

async function getHabitDetail(habitId, success, fail) {
  console.log("getHabitDetail 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.get(`${url}/${habitId}`).then(success).catch(fail)
}

async function updateHabit(habitId, content, important, outside, alarmed, alarmDtoList, success, fail) {
  console.log("updateHabit 실행")
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.put(`${url}/${habitId}`, JSON.stringify(
    content, 
    important,
    outside,
    alarmed,
    alarmDtoList)).then(success).catch(fail);
}

async function deleteHabit(habitId, success, fail) {
  console.log("deletHabit 실행") 
  local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
  local.delete(`${url}/${habitId}`).then(success).catch(fail)
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

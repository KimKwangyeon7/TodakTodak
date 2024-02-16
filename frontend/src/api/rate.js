import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

function getTodosSuccessRateByDay(goalId, month, success, fail) {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    local.get(`/goals/todos/achievement/day/${goalId}/${month}`).then(success).catch(fail)
}

export { 
    getTodosSuccessRateByDay
 };
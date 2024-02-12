import { localAxios } from "@/util/http-commons";

const local = localAxios();

const url = '/todos/achievement'

// 매일 투두 성취율
function getTodoAcievementRateByDay(month, success, fail) {
    local.get(`${url}/day/${month}`).then(success).catch(fail)
}


// 특정목표 월별 투두 성취율
function getGoalTodoAchievementRateByMonth(goalId, success, fail) {
    local.get(`${url}/month/${goalId}`).then(success).catch(fail)
}


export {
  getTodoAcievementRateByDay,
  getGoalTodoAchievementRateByMonth,
  
}
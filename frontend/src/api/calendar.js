/* eslint-disable no-unused-vars */
import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/todos";

function getTodosByMonth(month, success, fail) {
    local.get(`${url}/month/${month}`).then(success).catch(fail)
}

export { getTodosByMonth };

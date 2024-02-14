/* eslint-disable no-unused-vars */
import { localAxios } from "@/util/http-commons";

const local = localAxios(); // axios instance

const url = "/learning";

async function startLearning(recordId) {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    console.log(recordId)
    await local.post(`/learning/${recordId}`)
             .then(response => {
                 console.log(response);
             })
             .catch(error => {
                 console.error(error);
             });
}

export { startLearning };

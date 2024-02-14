import { localAxios } from "@/util/http-commons";

const local = localAxios();
const url = "/notifications";

async function sendNotification(id, type, title, body) {
    local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
    try {
        // 요청을 보낼 데이터
        const requestData = {
            id : id,
            type: type,
            title: title,
            body: body,
            // 기타 필요한 데이터도 추가할 수 있습니다.
        };

        // POST 요청 보내기
        const response = await local.post(url, requestData);

        // 요청이 성공하면 여기에서 추가적인 작업을 수행할 수 있습니다.
        console.log('알림 전송 성공:', response.data);
    } catch (error) {
        // 요청이 실패한 경우 에러를 처리할 수 있습니다.
        console.error('알림 전송 실패:', error);
    }
}

export {
    sendNotification
};

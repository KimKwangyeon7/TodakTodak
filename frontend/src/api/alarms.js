import { localAxios } from '@/util/http-commons'

const local = localAxios()
const url = 'https://us-central1-c210-67728.cloudfunctions.net/storePushData'

async function alarm(newAlarm, success, fail) {
    const audio = new Audio('/audio/aa.wav') // 음원 경로 설정
    audio.play().catch(error => console.error("Audio playback failed:", error));
    local.defaults.headers.Authorization = 'Bearer ' + localStorage.getItem("accessToken");
    local.post(`${url}`, audio, JSON.stringify({newAlarm})).then(success).catch(fail)
}

export { alarm }
import apiClient from './alarmsApiClient'

async function alarm(newAlarm) {
    try {
        const response = await apiClient.post(newAlarm)
        const audio = new Audio('/audio/aa.wav') // 음원 경로 설정
        audio.play().catch(error => console.error("Audio playback failed:", error));
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

export { alarm }
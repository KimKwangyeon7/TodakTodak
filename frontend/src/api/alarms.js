import apiClient from './alarmsApiClient'

async function alarm(newAlarm) {
    try {
        const response = await apiClient.post(newAlarm)
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

export { alarm }
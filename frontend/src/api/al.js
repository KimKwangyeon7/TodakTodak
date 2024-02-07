import apiClient from './goalsApiClient'

async function addAlarm(newAlarm) {
    try {
        const response = await apiClient.post('/alarm')
    }
}
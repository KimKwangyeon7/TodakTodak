import { localAxios } from '@/util/htp-commons'

const local = localAxios()
const url = '/tts/infer'

async function sendAudioToBackend(audioFile, success, fail) {
  let formData = new FormData()
  formData.append('file', audioFile, audioFile.name);
  local.defaults.headers.Authorization = "Bearer " + localStorage.getItem("accessToken");
  local.post(`${url}`, formData).then(success).catch(fail)
}

export{
  sendAudioToBackend
}
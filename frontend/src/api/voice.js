import { defineStore } from 'pinia'
import apiClient from '@/stores/apiClient'

export const useVoicesStoe = defineStore({
    id:'voices',
    state: () => ({
      currentSentenceIndex: 0,
    }),
    actions: {


      async fetchCurrentSentence(uuid) {
        try {
          const response = await apiClient.get(`/record/prompt`, { params: { uuid } });
          this.currentSentence = response.data; // Assume 'currentSentence' is a data property
        } catch (error) {
          console.error('Error fetching current sentence:', error);
        }
      },

      async fetchVoiceList() {
          try {
              const response = await apiClient.get('/record');
              voiceList.value = response.data;
          } catch (error) {
              console.error('Error fetching voice list:', error);
          }
      },

      async createNewVoice() {
        if (this.title === "") {
          console.error("Title is required");
          return;
        }
    
        const payload = {
          title: this.title,
          memo: this.memo 
        };
    
        try {
          const response = await apiClient.post('/record', payload);
          if (response.status === 200) {
            console.log("New voice created successfully");
            // 추가 로직을 넣을 수 있음 (예: 상태 업데이트, 사용자에게 알림 등)
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        } catch (error) {
          console.error("Error creating new voice:", error);
        }
      },


      async fetchVoiceDetail(recordId) {
        try {
          const response = await apiClient.get(`/record/${recordId}`);
          this.voiceDetail = response.data; // 'voiceDetail'을 데이터 속성으로 추가해야 합니다.
        } catch (error) {
          console.error('Error fetching voice detail:', error);
        }
      },

      async modifyVoice(recordId, title, memo) {
        const payload = {
          title,
          memo
        };
        try {
          const response = await apiClient.put(`/record/${recordId}`, payload);
          if (response.status === 200) {
            console.log("Voice modified successfully");
            // 추가 로직을 넣을 수 있음 (예: 상태 업데이트, 사용자에게 알림 등)
          } else {
            throw new Error(`Error: ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error modifying voice:', error);
        }
      },

      async deleteVoice(recordId) {
        try {
            const response = await apiClient.delete(`/record/${recordId}`);
            if (response.status === 200) {
                console.log("Voice deleted successfully");
                // 추가적인 상태 업데이트나 사용자 알림 로직을 여기에 넣을 수 있습니다.
                } else {
                throw new Error(`Error: ${response.statusText}`);
                }
                } catch (error) {
                    console.error('Error deleting voice:', error);
            }
        },

      async selectVoice(recordId) {
        try {
            const response = await apiClient.put(`record/use`, { recordId });
            if (response.status === 200) {
              console.log("Voice selected successfully");
              // 여기에 추가적인 상태 업데이트나 사용자 알림 로직을 넣을 수 있습니다.
            } else {
              throw new Error(`Error: ${response.statusText}`);
            }
          } catch (error) {
            console.error('Error selecting voice:', error);
          }
        },


      async saveRecord(promptNum) {

        if (!this.blob) {
          console.error("No recording available to save");
          return;
        }
  
        // Transmit to server
        const formData = new FormData();
        formData.append("title", this.title);
        formData.append("audio", this.blob, this.title + ".wav");

        try {
          await apiClient.post('/record/save/member', { promptNum });
          console.log("Record saved successfully");
        } catch (error) {
          console.error('Error saving record:', error);
        }
      },

      async saveAudio(prompt, promptNum) {

        // 우선 디바이스에 저장
        const url = window.URL.createObjectURL(this.blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = url;
        a.download = this.title + ".wav";
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        // 그리고 레디스로 전송
        const formData = new FormData();
        formData.append("audio", this.blob, `${this.title}.wav`);
        formData.append("prompt", prompt);
        formData.append("promptNum", promptNum);
      
        try {
          const response = await apiClient.post('/record/save/audio', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          this.nextPrompt = response.data; // 'nextPrompt'를 데이터 속성으로 추가해야 합니다.
        } catch (error) {
          console.error('Error saving audio:', error);
        }
      },

      async startLearning() {
          try {
            await apiClient.post('/learning');
            console.log("Learning started successfully");
            // 추가적인 처리가 필요한 경우 여기에 로직 추가
          } catch (error) {
            console.error('Error starting learning process:', error);
          }
      },
    }
  })



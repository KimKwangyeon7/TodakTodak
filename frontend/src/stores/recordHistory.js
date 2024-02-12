import { defineStore } from 'pinia';

export const useRecordHistorystore = defineStore({
  id: 'recordHistory',
  state: () => ({
    histories: {}, // This will hold the record histories keyed by recordId
  }),
  created() {
    // When the component is created, get the recordId from the URL
    const recordId = this.$route.params.recordId;
    if (recordId) {
      // If recordId is available, do something with it
      console.log('The recordId from URL is:', recordId);
      // You can store it in your component's data if you need to use it later
      this.recordId = recordId;
    } else {
      console.error('RecordId is not defined in the URL');
    }
  },
  actions: {
    addRecord(recordId, record) {
      console.log('Current state of histories[recordId]:', this.histories[recordId]);
      console.log('Type of recordId:', typeof recordId);
      console.log('recordId', recordId)
     
      // Initialize histories[recordId] if it does not exist
      if (!this.histories[recordId]) {
        this.histories[recordId] = {
          durations: [], // Array for durations
          records: []    // Array for records
        };
      }
    
      const simpleRecord = {
        id: recordId,
        promptNum: record.promptNum,
        elapsedTime: record.elapsedTime
        // ... other record properties ...
      };
      this.histories[recordId].push(simpleRecord);
    },

    addRecordingDuration(recordId, duration) {
      if (!this.histories[recordId]) {
        this.histories[recordId] = {
          durations: [], // Assuming we add a durations property
          records: []
        };
      }
      this.histories[recordId].durations.push(duration);
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'my_training_voices',
        storage: localStorage,
      },
    ],
  },
});

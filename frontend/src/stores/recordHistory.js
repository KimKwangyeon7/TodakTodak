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
      this.recordId = recordId;
    } else {
      console.error('RecordId is not defined in the URL');
    }
  },
  actions: {
    addRecord(recordId, record) {
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
      this.histories[recordId].records.push(simpleRecord);
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

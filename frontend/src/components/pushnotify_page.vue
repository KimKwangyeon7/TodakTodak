<template>
  <v-card-text>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            label="제목"
            placeholder="여기에 제목을 입력하세요"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="내용"
            placeholder="여기에 내용을 입력하세요"
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
<script>
  export default {
    data() {
      return {
        sTitle: '', // 제목을 저장할 임시 변수
        sMsg: '' // 내용을 저장할 임시 변수
      }
    },
    methods: {
      fnSendPush() {
        // 발송할 내용 JSON 형식으로 변경
        const PreparedData = JSON.stringify({
          pTitle: this.sTitle,
          pMsg: this.sMsg
        })
        console.log(PreparedData)
        // 파이어스토어 함수 실행
        fetch('https://us-central1-c210-67728.cloudfunctions.net/storePushData', {
          method: "POST",
          headers: {
            'Content-type': 'application/json'
          },
          body: PreparedData
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log(data.message);
        })
        .catch(err => console.log('오류!' + err.message));
      }
    }
  }
</script>
<template>
<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 text-center">
      <h1 class="display-1">메시지 보내기</h1>
    </div>
    <div class="col-10 my-3">
      <div class="card bg-dark text-white">
        <div class="card-body">
          <form id="messageForm">
            <div class="mb-3">
              <input type="text" class="form-control" ref="title" placeholder="제목을 입력하세요">
              <textarea textarea class="form-control" ref="message" rows="3" placeholder="내용을 입력하세요"></textarea>
            </div>
            <button type="button" class="btn btn-block btn-large btn-orange" @click="fnSendPush">발 송</button>

          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    fnSendPush() {
      const title = this.$refs.title.value;
      const message = this.$refs.message.value;

      const PreparedData = JSON.stringify({
        pTitle: title,
        pMsg: message
      });

      console.log(PreparedData);

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
<style>
.btn-orange {
  background-color: orange;
  color: white;
}
</style>
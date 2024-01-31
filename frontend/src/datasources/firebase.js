import firebase from 'firebase/app'
import 'firebase/firebase-database'

const oDB = firebase.initializeApp({
    databaseURL: "https://c210-67728-default-rtdb.firebaseio.com",
}).database()

// 파이어베이스 DB 객체 중에서 todos 항목을 다른 곳에서 사용가능하도록 공개하는 기능이라는데,
// 일단은 주석으로 처리하겠음
// export const oC210inDB = oDB.ref('todos')
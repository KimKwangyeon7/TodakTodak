<!-- src/components/Board.vue -->
<template>
    <div class="board">
      <h2>게시판</h2>
      <div v-for="post in posts" :key="post.id" class="post">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
      <form @submit.prevent="addPost" class="post-form">
        <label for="title">제목:</label>
        <input v-model="newPost.title" type="text" id="title" required>
        <label for="content">내용:</label>
        <textarea v-model="newPost.content" id="content" required></textarea>
        <button type="submit">게시물 작성</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        posts: [],
        newPost: {
          title: '',
          content: ''
        }
      };
    },
    mounted() {
      this.fetchPosts();
    },
    methods: {
      fetchPosts() {
        fetch('http://localhost:3000/posts')
          .then(response => response.json())
          .then(data => (this.posts = data));
      },
      addPost() {
        fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.newPost)
        })
          .then(response => response.json())
          .then(data => {
            this.posts.push(data);
            this.newPost.title = '';
            this.newPost.content = '';
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .board {
    max-width: 600px;
    margin: auto;
  }
  
  .post {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .post h3 {
    margin-bottom: 5px;
  }
  
  .post-form {
    margin-top: 20px;
  }
  
  .post-form label {
    display: block;
    margin-bottom: 5px;
  }
  
  .post-form input,
  .post-form textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  
  .post-form button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .post-form button:hover {
    background-color: #45a049;
  }
  </style>
  
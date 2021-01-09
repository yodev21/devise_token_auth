<template>
  <div id="app">
    <h3>掲示板に投稿する</h3>
    <!-- <label for="name">ニックネーム</label>
    <input id="name" type="text" v-model="name">
    <br><br>
    <label for="comment">コメント</label>
    <textarea id="comment" v-model="comment"></textarea>
    <h3>掲示板</h3>
    <br><br>
    <button @click="createComment">コメントをサーバーに送る</button>
    <div v-for="post in posts" :key="post.name">
      <div>名前：{{post.fields.name.stringValue}}</div>
      <div>コメント：{{post.fields.comment.stringValue}}</div>
      <br>
    </div>   -->
    <div v-if="client === ''">
      <div>
        <h1>SignUp</h1>
        <label for="email">email</label>
        <input id="email" type="email" v-model="email" />
        <label for="password">password</label>
        <input id="password" type="password" v-model="password" />
        <button @click="signup">新規登録</button>
      </div>
      <div>
        <h1>SignIn</h1>
        <label for="email">email</label>
        <input id="email" type="email" v-model="email" />
        <label for="password">password</label>
        <input id="password" type="password" v-model="password" />
        <button @click="signin">ろぐいん</button>
      </div>
    </div>
    <div>
      <h1>Task All</h1>
      <button @click="signout">サインアウト</button>
      <div v-for="task in tasks" :key="task.id">
        Task:{{ task.id }}, {{ task.title }}, {{ task.content }}
        <button @click="find_task(task.id)">task_find</button>
        <button @click="delete_task(task.id)">Delete</button>
      </div>
      <button @click="all_tasks">Task All</button>
    </div>
    <div>
      <h3>Task</h3>
      <label for="task">task</label>
      <input id="task" type="text" v-model="title" />
      <label for="content">content</label>
      <input id="content" type="text" v-model="content" />
      <button @click="create_task">Create_Task</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      uid: "",
      access_token: "",
      client: "",
      title: "",
      content: "",
      tasks: [],
      comment: "",
      posts: [],
    };
  },
  created() {
    axios.get("/comments").then((response) => {
      console.log(response);
      this.posts = response.data.documents;
    });
  },
  methods: {
    createComment() {
      axios
        .post("/comments", {
          fields: {
            name: {
              stringValue: this.name,
            },
            comment: {
              stringValue: this.comment,
            },
          },
        })
        .then((response) => {
          console.log(response);
        });
      this.name = "";
      this.comment = "";
    },
    signup() {
      axios
        .post("http://localhost:3000/v1/auth", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          localStorage.setItem(
            "access-token",
            response.headers["access-token"]
          );
          localStorage.setItem("client", response.headers["client"]);
          localStorage.setItem("uid", response.headers["uid"]);
          this.access_token = response.headers["access-token"];
          this.client = response.headers["client"];
          this.uid = response.headers["uid"];

          this.all_tasks();
        });
    },
    signin() {
      console.log(this.email);
      console.log(this.password);
      axios
        .post("http://localhost:3000/v1/auth/sign_in", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem(
            "access-token",
            response.headers["access-token"]
          );
          localStorage.setItem("client", response.headers["client"]);
          localStorage.setItem("uid", response.headers["uid"]);
          this.access_token = response.headers["access-token"];
          this.client = response.headers["client"];
          this.uid = response.headers["uid"];

          this.all_tasks();
        });
    },
    signout() {
      console.log(this.uid);
      console.log(this.access_token);
      console.log(this.client);
      axios
        .delete("http://localhost:3000/v1/auth/sign_out", {
          test: { test: "test" },
          headers: {
            uid: this.uid,
            "access-token": this.access_token,
            client: this.client,
          },
        })
        .then((response) => {
          console.log(response);
          this.access_token = "";
          this.client = "";
          this.uid = "";
          localStorage.removeItem("uid");
          localStorage.removeItem("access-token");
          localStorage.removeItem("client");
        });
      this.tasks = [];
    },
    all_tasks() {
      axios
        .get("http://localhost:3000/v1/tasks", {
          headers: {
            uid: this.uid,
            "access-token": this.access_token,
            client: this.client,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.tasks = response.data;
        });
    },
    find_task(task_id) {
      axios
        .get(`http://localhost:3000/v1/tasks/${task_id}`, {
          headers: {
            uid: this.uid,
            "access-token": this.access_token,
            client: this.client,
          },
        })
        .then((response) => {
          console.log(response);
          this.task = response.data;
        });
    },
    create_task() {
      console.log(this.uid);
      console.log(this.access_token);
      console.log(this.client);
      axios
        .post("http://localhost:3000/v1/tasks", {
          uid: this.uid,
          "access-token": this.access_token,
          client: this.client,
          title: this.title,
          content: this.content,
        })
        .then((response) => {
          console.log(response);
          this.all_tasks();
        });
    },
    delete_task(task_id) {
      axios
        .delete(`http://localhost:3000/v1/tasks/${task_id}`, {
          headers: {
            uid: this.uid,
            "access-token": this.access_token,
            client: this.client,
          },
        })
        .then((response) => {
          console.log(response);
          this.all_tasks();
        });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<template>
  <div id="app">
    <h3>タスクを投稿する</h3>
      <h1>Task All</h1>
      <!-- <button @click="signout">サインアウト</button> -->
      <div v-for="task in tasks" :key="task.id">
        Task:{{ task.id }}, {{ task.title }}, {{ task.content }}
        <button @click="find_task(task.id)">task_find</button>
        <button @click="delete_task(task.id)">Delete</button>
      </div>
      <button @click="all_tasks">Task All</button>

      <h3>Task</h3>
      <label for="title">task</label>
      <input id="title" type="text" v-model="title" />
      <label for="content">content</label>
      <input id="content" type="text" v-model="content" />
      <button @click="create_task">Create_Task</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      title: "",
      content: "",
      tasks: [],
    };
  },
  computed: {
    uidToken(){
      return this.$store.getters.uidToken
    },
    accessToken(){
      return this.$store.getters.accessToken
    },
    clientToken(){
      return this.$store.getters.clientToken
    }
  },
  created(){
    console.log('fire')
  },
  methods: {
    all_tasks() {
      axios
        .get("http://localhost:3000/v1/tasks", {
          headers: {
            uid: this.uidToken,
            "access-token": this.accessToken,
            client: this.clientToken
          },
        })
        .then((response) => {
          this.tasks = response.data;
        });
    },
    find_task(task_id) {
      axios
        .get(`http://localhost:3000/v1/tasks/${task_id}`, {
          headers: {
            uid: this.uidToken,
            "access-token": this.accessToken,
            client: this.clientToken
          },
        })
        .then((response) => {
          console.log(response);
          this.task = response.data;
        });
    },
    create_task() {
      axios
        .post("http://localhost:3000/v1/tasks", {
          uid: this.uidToken,
          "access-token": this.accessToken,
          client: this.clientToken,
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
            uid: this.uidToken,
            "access-token": this.accessToken,
            client: this.clientToken
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

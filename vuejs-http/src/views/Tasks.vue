<template>
  <div id="app">
      <v-btn @click="all_tasks">Task All</v-btn>
      <v-simple-table>
          <thead>
            <tr>
              <th class="text-left">
                ID
              </th>
              <th class="text-left">
                Title
              </th>
              <th class="text-left">
                Content
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="task in tasks"
              :key="task.id"
            >
              <td>{{ task.id}}</td>
              <td>{{ task.title }}</td>
              <td>{{ task.content }}</td>
            </tr>
          </tbody>
      </v-simple-table>
      <h3>Task</h3>
      <v-text-field 
        label="Task"
        id="title"
        v-model="title"
      ></v-text-field>
      <v-text-field
        label="Content"
        id="content"
        v-model="content"
      ></v-text-field>
      <v-btn @click="create_task">Create_Task</v-btn>
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

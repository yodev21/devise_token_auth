<template>
  <div id="app">
    <TaskIndex></TaskIndex>
      <v-btn @click="toggleTaskModal">New Task</v-btn>
      <v-dialog v-model="dialogPostFlag" width="800" persistent>
        <v-card>
          <v-card-title class="headline blue lighten-3 white--text" primary-title>
            タスク作成
          </v-card-title>
          <v-text-field v-model="title" label="Task" required style="margin: 20px"></v-text-field>
          <v-flex d-flex>
            <v-text-field v-model="content" label="content" required style="margin: 20px"></v-text-field>
          </v-flex>
          <v-card-actions>
            <v-btn color="#gray lighten-4" flat @click="toggleTaskModal">
              Cansel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="create_task">Add Task</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import TaskIndex from '../components/TaskIndex'
export default {
  data() {
    return {
      name: "",
      title: "",
      content: "",
      dialogPostFlag: false,
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
  name: 'Tasks',
  components: {
    TaskIndex,
  },
  created(){
    console.log('fire')
    this.$store.dispatch('reload')
    // this.all_tasks()
  },
  methods: {
    toggleTaskModal(){
      this.dialogPostFlag = !this.dialogPostFlag
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

          this.toggleTaskModal();
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

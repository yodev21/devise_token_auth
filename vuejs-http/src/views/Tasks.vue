<template>
  <div id="app">
    <TaskIndex></TaskIndex>
  </div>
</template>

<script>
import axios from "axios";
import TaskIndex from '../components/TaskIndex'

export default {
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
    TaskIndex
  },
  created(){
    this.$store.dispatch('reload')
  },
  methods: {
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
          this.task = response.data;
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
        .then(() => {
          this.all_tasks();
        });
    },
  },
};
</script>

<template>
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
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      tasks: []
    }
  },
  created(){
    this.all_tasks()
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
  }
}
</script>
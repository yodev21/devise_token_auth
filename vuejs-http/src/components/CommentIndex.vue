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
      >
        <td>{{ id }}</td>
        <td>{{ title }}</td>
        <td>{{ content }}</td>
      </tr>
    </tbody>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return {
      comments: []
    }
  },
  created(){
    axios
      .get(`http://localhost:3000/v1/comments/${task_id}`, {
        headers: {
          uid: this.uidToken,
          "access-token": this.accessToken,
          client: this.clientToken
        },
      })
      .then((response) => {
        this.task = response.data;
      });
  }
}
</script>
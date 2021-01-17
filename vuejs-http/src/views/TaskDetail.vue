<template>
  <div>
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
    
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
    return {
      id: "",
      title: "",
      content: ""
    }
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
    const task_id = this.$route.params['id']
    console.log(this.accessToken)
    this.$store.dispatch('reload')
    axios
    .get(`http://localhost:3000/v1/tasks/${task_id}`, {
      headers: {
        uid: this.uidToken,
        "access-token": this.accessToken,
        client: this.clientToken
      },
    })
    .then((response) => {
      console.log(response.data.id)
      this.id = response.data.id;
      this.title = response.data.title;
      this.content = response.data.content;
    });
  } 
}
</script>
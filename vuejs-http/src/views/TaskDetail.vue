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
    
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">
            CommentID
          </th>
          <th class="text-left">
            CommentUserID
          </th>
          <th class="text-left">
            CommentContent
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
        v-for="comment in comments" :key="comment.id"
        >
          <td>{{ comment.id }}</td>
          <td>{{ comment.user_id }}</td>
          <td>{{ comment.content }}</td>
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
      content: "",
      comments: ""
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
      this.id = response.data.id;
      this.title = response.data.title;
      this.content = response.data.content;
      this.comments_all()
    });


  },
  methods: {
    comments_all(){
      axios
        .get(`http://localhost:3000/v1/comments`, {
          params: {
            task_id: this.id
          },
          headers: {
            uid: this.uidToken,
            "access-token": this.accessToken,
            client: this.clientToken
          }
        })
        .then((response) => {
          this.comments = response.data;
          console.log(response.data)
          console.log("fdsfdsfdas")
      });
    }
  }
}
</script>

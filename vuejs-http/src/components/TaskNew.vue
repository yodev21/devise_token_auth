<template>
  <div>
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
          <v-btn color="#gray lighten-4"  @click="toggleTaskModal">
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
export default {
  data(){
    return {
      title: '',
      content: '',
      dialogPostFlag: false,
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
  methods: {
    toggleTaskModal(){
      this.dialogPostFlag = !this.dialogPostFlag
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
        // .then((response) => {
        //   this.all_tasks();
        // });

          this.toggleTaskModal();
    },
  }
}
</script>
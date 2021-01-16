<template>
  
  <v-simple-table>
    <h1>Helo</h1>
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
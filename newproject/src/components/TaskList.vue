<template>
  <div>
    <v-card
      v-for="task in tasks"
      :key="task._id"
      class="mb-4"
    >
      <v-card-text class="d-flex justify-space-between align-center">
        <div>
          <div>
            <strong>{{ task.text }}</strong>
          </div>
          <div v-if="task.date">
            {{ task.date }}
          </div>
          <div>
            Status: {{ task.done ? 'Done' : 'Not done' }}
          </div>
        </div>

        <div class="d-flex ga-2">
          <v-btn
            color="success"
            @click="updateTask(task)"
          >
            {{ task.done ? 'Undo' : 'Done' }}
          </v-btn>

          <v-btn
            color="error"
            @click="deleteTask(task)"
          >
            Delete
          </v-btn>
        </div>
      </v-card-text>
    </v-card>

    <div v-if="tasks.length === 0">
      No tasks yet.
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskList',

  props: {
    tasks: {
      type: Array,
      required: true
    },
    updateTask: {
      type: Function,
      required: true
    },
    deleteTask: {
      type: Function,
      required: true
    }
  }
}
</script>
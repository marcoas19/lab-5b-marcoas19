<template>
  <v-card>
    <v-card-title>My Tasks</v-card-title>

    <v-list v-if="tasks.length">
      <v-list-item
        v-for="task in tasks"
        :key="task._id"
      >
        <template #prepend>
          <v-checkbox-btn
            :model-value="task.done"
            @click="toggleTask(task)"
          ></v-checkbox-btn>
        </template>

        <v-list-item-title
          :style="{ textDecoration: task.done ? 'line-through' : 'none' }"
        >
          {{ task.text }}
        </v-list-item-title>

        <template #append>
          <v-btn
            color="red"
            variant="text"
            @click="deleteTask(task._id)"
          >
            Delete
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-card-text v-else>
      No tasks yet.
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      required: true
    }
  },
  emits: ['task-updated', 'task-deleted'],
  methods: {
    async toggleTask(task) {
      try {
       const response = await fetch(`/api/v1/tasks/${task._id}`, {
  method: 'PUT',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: task.text,
    done: !task.done
  })
})

        if (!response.ok) {
          throw new Error('Failed to update task')
        }

        const updatedTask = await response.json()
        this.$emit('task-updated', updatedTask)
      } catch (error) {
        console.error('UPDATE TASK ERROR:', error)
      }
    },

    async deleteTask(taskId) {
      try {
        const response = await fetch(`/api/v1/tasks/${taskId}`, {
  method: 'DELETE',
  credentials: 'include'
})

        if (!response.ok) {
          throw new Error('Failed to delete task')
        }

        this.$emit('task-deleted', taskId)
      } catch (error) {
        console.error('DELETE TASK ERROR:', error)
      }
    }
  }
}
</script>
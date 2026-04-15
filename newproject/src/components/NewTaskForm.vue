<template>
  <v-card class="mb-4">
    <v-card-title>New Task</v-card-title>

    <v-card-text>
      <v-text-field
        v-model="text"
        label="Task"
        @keyup.enter="submitTask"
      ></v-text-field>
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="submitTask">Add Task</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NewTaskForm',
  emits: ['task-created'],
  data() {
    return {
      text: ''
    }
  },
  methods: {
    async submitTask() {
      if (!this.text.trim()) return

      try {
        const response = await fetch('/api/v1/tasks', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    text: this.text,
    done: false
  })
})

        if (!response.ok) {
          throw new Error('Failed to create task')
        }

        const task = await response.json()
        this.$emit('task-created', task)
        this.text = ''
      } catch (error) {
        console.error('CREATE TASK ERROR:', error)
      }
    }
  }
}
</script>
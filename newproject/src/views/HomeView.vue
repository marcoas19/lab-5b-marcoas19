<template>
  <v-container>
    <h1>My Tasks</h1>

    <v-alert
      v-if="errorMessage"
      type="error"
      class="mb-4"
    >
      {{ errorMessage }}
    </v-alert>

    <v-btn
      color="secondary"
      class="mb-4 mr-4"
      @click="goToLogin"
    >
      Log In with Google
    </v-btn>

    <v-text-field
      v-model="newTaskText"
      label="Task text"
    ></v-text-field>

    <v-text-field
      v-model="newTaskDate"
      label="Task date"
    ></v-text-field>

    <v-btn color="primary" class="mb-4" @click="addTask">
      Add Task
    </v-btn>

    <div v-if="tasks.length === 0">
      No tasks yet.
    </div>

    <v-list v-else>
      <v-list-item
        v-for="task in tasks"
        :key="task._id"
      >
        <v-list-item-title>
          {{ task.text }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ task.date }} | Done: {{ task.done }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',

  data() {
    return {
      tasks: [],
      newTaskText: '',
      newTaskDate: '',
      errorMessage: ''
    }
  },

  async mounted() {
    this.loadTasks()
  },

  methods: {
    goToLogin() {
      window.open('http://marcoas19b.4hx.net:1337/api/v1/auth/google', '_blank')
    },

    async loadTasks() {
      try {
        this.errorMessage = ''

        const res = await fetch('http://marcoas19b.4hx.net:1337/api/v1/tasks', {
          credentials: 'include'
        })

        const data = await res.json()

        if (!res.ok) {
          if (res.status === 401) {
            this.errorMessage = 'Please log in with Google before loading tasks.'
          } else {
            this.errorMessage = data.error || 'Failed to load tasks.'
          }
          return
        }

        this.tasks = data
      } catch (error) {
        console.error('Error fetching tasks:', error)
        this.errorMessage = 'Could not connect to the API server.'
      }
    },

    async addTask() {
      try {
        this.errorMessage = ''

        const res = await fetch('http://marcoas19b.4hx.net:1337/api/v1/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            text: this.newTaskText,
            date: this.newTaskDate
          })
        })

        const data = await res.json()

        if (!res.ok) {
          if (res.status === 401) {
            this.errorMessage = 'Please log in with Google before adding tasks.'
          } else {
            this.errorMessage = data.error || 'Failed to add task.'
          }
          return
        }

        this.newTaskText = ''
        this.newTaskDate = ''
        await this.loadTasks()
      } catch (error) {
        console.error('Error adding task:', error)
        this.errorMessage = 'Could not connect to the API server.'
      }
    }
  }
}
</script>
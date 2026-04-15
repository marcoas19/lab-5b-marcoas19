<template>
  <v-container class="mt-4">
    <NewTaskForm @task-created="addTask" />
    <TaskList
      :tasks="tasks"
      @task-updated="updateTask"
      @task-deleted="removeTask"
    />
  </v-container>
</template>

<script>
import NewTaskForm from '@/components/NewTaskForm.vue'
import TaskList from '@/components/TaskList.vue'

export default {
  name: 'HomeView',
  components: {
    NewTaskForm,
    TaskList
  },
  data() {
    return {
      tasks: []
    }
  },
  methods: {
    async loadTasks() {
      console.log("LOADING TASKS 🚀")

      try {
        const response = await fetch(`${process.env.VUE_APP_API_ORIGIN}/api/v1/tasks`, {
          credentials: 'include'
        })

        console.log("RESPONSE:", response)

        if (!response.ok) {
          throw new Error('Failed to load tasks')
        }

        const data = await response.json()
        console.log("DATA:", data)

        this.tasks = data
      } catch (error) {
        console.error("LOAD TASKS ERROR:", error)
      }
    },

    addTask(task) {
      this.tasks.push(task)
    },

    updateTask(updatedTask) {
      const index = this.tasks.findIndex(task => task._id === updatedTask._id)
      if (index !== -1) {
        this.tasks[index] = updatedTask
      }
    },

    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task._id !== taskId)
    }
  },
  mounted() {
    console.log("HOME LOADED 🔥")
    this.loadTasks()
  }
}
</script>
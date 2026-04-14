<template>
  <v-container>
    <h1>Tasks Home</h1>

    <NewTaskForm
      :form="form"
      :submitForm="submitForm"
    />

    <TaskList
      :tasks="tasks"
      :updateTask="updateTask"
      :deleteTask="deleteTask"
    />
  </v-container>
</template>

<script>
import TaskList from '@/components/TaskList.vue'
import NewTaskForm from '@/components/NewTaskForm.vue'

export default {
  name: 'HomeView',

  components: {
    TaskList,
    NewTaskForm
  },

  data() {
    return {
      tasks: [],
      form: {
        text: '',
        date: ''
      }
    }
  },

  methods: {
    async loadTasks() {
      try {
        const res = await fetch('/api/v1/tasks', {
          credentials: 'include'
        })

        if (!res.ok) throw new Error('Error loading tasks')

        const data = await res.json()
        this.tasks = Array.isArray(data) ? data : (data.tasks || [])
      } catch (err) {
        console.error(err)
      }
    },

    async submitForm(form) {
      try {
        const res = await fetch('/api/v1/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            text: form.text,
            date: form.date,
            done: false
          })
        })

        if (!res.ok) throw new Error('Error creating task')

        this.form.text = ''
        this.form.date = ''
        await this.loadTasks()
      } catch (err) {
        console.error(err)
      }
    },

    async updateTask(task) {
      try {
        const res = await fetch(`/api/v1/tasks/${task._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            text: task.text,
            date: task.date,
            done: !task.done
          })
        })

        if (!res.ok) throw new Error('Error updating task')

        await this.loadTasks()
      } catch (err) {
        console.error(err)
      }
    },

    async deleteTask(task) {
      try {
        const res = await fetch(`/api/v1/tasks/${task._id}`, {
          method: 'DELETE',
          credentials: 'include'
        })

        if (!res.ok) throw new Error('Error deleting task')

        await this.loadTasks()
      } catch (err) {
        console.error(err)
      }
    }
  },

  mounted() {
    this.loadTasks()
  }
}
</script>
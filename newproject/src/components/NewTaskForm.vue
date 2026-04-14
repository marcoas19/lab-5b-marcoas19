<template>
  <v-form @submit.prevent="submitForm(form)">
    <v-text-field
      v-model="form.text"
      label="New Task"
      required
    />

    <v-text-field
      v-model="form.date"
      label="Due Date"
    />

    <v-btn
      type="submit"
      color="primary"
      class="mt-2"
    >
      Add Task
    </v-btn>
  </v-form>
</template>

<script>
export default {
  name: 'NewTaskForm',

  props: {
    form: {
      type: Object,
      required: true
    },
    submitForm: {
      type: Function,
      required: true
    }
  }
}
</script>
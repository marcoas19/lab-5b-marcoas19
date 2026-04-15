<template>
  <v-container class="mt-8 text-center">
    <v-btn color="primary" :href="loginUrl">
      Login with Google
    </v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'LoginView',
  computed: {
    loginUrl() {
      return `${process.env.VUE_APP_API_ORIGIN}/api/v1/auth/google?returnto=${window.location.origin}/`
    }
  }
}
</script>
<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" width="400">
      <v-card-title class="text-h5 mb-4">Login</v-card-title>

      <v-btn block color="primary" @click="login">
        Login with Google
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { authenticated } from '@/util'

export default {
  name: 'LoginView',

  async mounted() {
    const ok = await authenticated()
    if (ok) {
      this.$router.push('/')
    }
  },

  methods: {
    login() {
  window.location.href = 'http://marcoas19b.4hx.net:1337/api/v1/auth/google'
}
    }
  }
</script>
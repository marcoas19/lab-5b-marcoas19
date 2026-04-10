<template>
  <v-app-bar app>
    <v-app-bar-title>Task App</v-app-bar-title>

    <v-spacer></v-spacer>

    <div v-if="user" class="mr-4">
      {{ user.email }}
    </div>

    <v-btn v-if="user" @click="logout">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',

  data() {
    return {
      user: null
    }
  },

  async mounted() {
    try {
      const response = await fetch('http://localhost:1337/api/v1/user', {
        credentials: 'include'
      })

      if (response.ok) {
        this.user = await response.json()
        console.log('USER DATA:', this.user)
      }
    } catch (error) {
      console.error('USER FETCH ERROR:', error)
    }
  },

  methods: {
    async logout() {
      try {
    await fetch('http://localhost:1337/api/v1/auth/logout', {
        method: 'GET',
        credentials: 'include'
    })
      } catch (error) {
        console.error('LOGOUT ERROR:', error)
      }

      this.$router.push('/login')
    }
  }
}
</script>
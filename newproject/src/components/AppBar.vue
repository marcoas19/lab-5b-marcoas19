<template>
  <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #ccc;">
    <div>
      <strong>Task App</strong>
    </div>

    <div v-if="user" style="display: flex; align-items: center; gap: 10px;">
      <img
        :src="user.photo || 'https://via.placeholder.com/40'"
        alt="Profile photo"
        style="width: 36px; height: 36px; border-radius: 50%;"
      />

      <span>{{ user.userName }}</span>

      <button @click="logout">LOGOUT</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: Object
  },

  methods: {
    async logout() {
      try {
        await fetch('/api/v1/auth/logout', {
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
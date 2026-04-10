<script>
import { getStatus } from '@/util'
import AppBar from '@/components/AppBar.vue'

export default {
  components: {
    AppBar
  },

  data() {
    return {
      user: null
    }
  },

  async mounted() {
    const data = await getStatus()

    if (data.ok) {
      this.user = data.user
    }
  }
}
</script>

<template>
  <div>
    <AppBar :user="user" />
    <router-view />
  </div>
</template>
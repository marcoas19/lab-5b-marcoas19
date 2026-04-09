<template>
  <div class="login">
    <h1>Login</h1>
    <p>Please sign in with Google to continue.</p>
    <a :href="loginUrl">Sign in with Google</a>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      loginUrl: 'http://marcoas19b.4hx.net:1337/api/v1/auth/google'
    }
  }
}
</script>
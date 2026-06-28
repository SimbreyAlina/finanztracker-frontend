<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuth } from '@okta/okta-vue'

const $auth = useAuth()

onMounted(async () => {
  await $auth.signInWithRedirect({ originalUri: '/' })
})
</script>

<template>
  <div class="login-page">
    <p>Weiterleitung zum Login …</p>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  padding: 2rem;
}
</style>

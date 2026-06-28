<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '@okta/okta-vue'

const $auth = useAuth()
const $route = useRoute()
const authenticated = ref(false)
const userEmail = ref('')

async function checkAuth() {
  authenticated.value = await $auth.isAuthenticated()
  userEmail.value = authenticated.value ? ((await $auth.getUser()).email ?? '') : ''
}

async function logout() {
  await $auth.signOut()
}

watch(() => $route.path, checkAuth)

onMounted(async () => {
  await checkAuth()
  $auth.authStateManager.subscribe(checkAuth)
})
</script>

<template>
  <div id="app-container">
    <h1 class="main-app-title">Finanztracker</h1>

    <nav class="navigation-bar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/verlauf" class="nav-link">Verlauf</RouterLink>
      <RouterLink to="/transactions" class="nav-link">Einnahmen & Ausgaben</RouterLink>
      <RouterLink to="/categories" class="nav-link">Kategorien</RouterLink>
      <span v-if="authenticated" class="nav-user">{{ userEmail }}</span>
      <a v-if="authenticated" class="nav-link nav-logout" @click="logout">Logout</a>
    </nav>

    <main class="content-area">
      <RouterView />
    </main>
  </div>
</template>

<style>
/* Globaler Reset gegen alte Vite-Styles */
html,
body,
#app {
  background-color: #ffffff !important;
  color: #000000 !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh;
  display: block !important;
}

#app-container {
  width: 100%;
  box-sizing: border-box;
  padding: 3rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
}

/* Überschrift: Dünn und elegant geschwungen */
.main-app-title {
  color: #000000 !important;
  font-size: 3.5rem;
  margin-top: 0;
  margin-bottom: 2rem;
  font-weight: 300;
  font-family: 'Georgia', 'Playfair Display', serif;
  font-style: italic;
  text-align: center;
}

/* Navigationsleiste über die komplette Bildschirmbreite */
.navigation-bar {
  display: flex;
  justify-content: center;
  gap: 15px;
  background-color: #2c3e50;
  padding: 15px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 0 2.5rem 0;
  border-radius: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 20px;
  border-radius: 6px;
  transition: background 0.2s;
}

.nav-link:hover {
  background-color: #34495e;
  color: white;
}

.router-link-active {
  background-color: #3498db !important;
  color: white;
}

/* Zentriert den Inhalt der Unterseiten */
.content-area {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  box-sizing: border-box;
}
</style>

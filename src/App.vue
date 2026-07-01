<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { ref, onMounted, watch } from 'vue'
import { useAuth } from '@okta/okta-vue'

const $auth = useAuth()
const $route = useRoute()
const authenticated = ref(false)
const userEmail = ref('')

const isDark = ref(localStorage.getItem('theme') === 'dark')

async function checkAuth() {
  authenticated.value = await $auth.isAuthenticated()
  userEmail.value = authenticated.value ? ((await $auth.getUser()).email ?? '') : ''
}

async function logout() {
  await $auth.signOut()
}

function toggleDarkMode() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  applyTheme()
}

function applyTheme() {
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode')
  } else {
    document.documentElement.classList.remove('dark-mode')
  }
}

watch(() => $route.path, checkAuth)

onMounted(async () => {
  await checkAuth()
  $auth.authStateManager.subscribe(checkAuth)
})
</script>

<template>
  <div id="app-container">
    <button
      class="darkmode-toggle"
      @click="toggleDarkMode"
      :title="isDark ? 'Licht an' : 'Dunkelheit an'"
    >
      {{ isDark ? '☀️' : '🌙' }}
    </button>
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
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --container-bg: #ffffff;
  --content-bg: #ffffff;
  --title-color: #000000;
}
.dark-mode {
  --bg-color: #121212;
  --text-color: #ffffff;
  --container-bg: #121212;
  --content-bg: #1e1e1e;
  --title-color: #ffffff;
}
/* Globaler Reset gegen alte Vite-Styles */
html,
body,
#app {
  background-color: var(--bg-color) !important;
  color: var(--text-color) !important;
  margin: 0 !important;
  padding: 0 !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 100vh;
  display: block !important;
  transition:
    background-color 0.3s,
    color 0.3s;
}

#app-container {
  position: relative; /* Wichtig, damit das Symbol absolut oben rechts platziert werden kann */
  width: 100%;
  box-sizing: border-box;
  padding: 3rem 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: var(--container-bg);
  transition: background-color 0.3s;
}
.darkmode-toggle {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  transition: transform 0.2s;
  z-index: 1000;
}
.darkmode-toggle:hover {
  transform: scale(1.2);
}
/* Überschrift: Dünn und elegant geschwungen */
.main-app-title {
  color: var(--title-color) !important;
  font-size: 3.5rem;
  margin-top: 0;
  margin-bottom: 2rem;
  font-weight: 300;
  font-family: 'Georgia', 'Playfair Display', serif;
  font-style: italic;
  text-align: center;
  transition: color 0.3s;
}

/* Navigationsleiste über die komplette Bildschirmbreite */
.navigation-bar {
  display: flex;
  justify-content: center;
  align-items: center;
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
  cursor: pointer;
}

.nav-link:hover {
  background-color: #34495e;
  color: white;
}

.nav-user {
  color: #bdc3c7;
  font-weight: normal;
  padding: 0 10px;
  font-size: 0.95rem;
}

.nav-logout {
  background-color: #e74c3c;
}
.nav-logout:hover {
  background-color: #c0392b;
}

.router-link-active {
  background-color: #3498db !important;
  color: white;
}

/* Zentriert den Inhalt der Unterseiten */
.content-area {
  background-color: var(--content-bg);
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  box-sizing: border-box;
  transition: background-color 0.3s;
}
</style>

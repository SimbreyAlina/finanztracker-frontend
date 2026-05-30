<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app-container">
    <h1 class="main-app-title">Finanztracker</h1>

    <nav class="navigation-bar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/transactions" class="nav-link">Einnahmen & Ausgaben</RouterLink>
    </nav>

    <main class="content-area">
      <RouterView />
    </main>
  </div>
</template>

<style>

html, body, #app {
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
  padding: 3rem 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
}

.main-app-title {
  color: #000000 !important;
  font-size: 3rem;
  margin-top: 0;
  margin-bottom: 2rem;
  font-weight: 800;
  text-align: center;
}


.navigation-bar {
  display: flex;
  justify-content: center;
  gap: 15px;
  background-color: #2c3e50;
  padding: 12px;
  border-radius: 8px;
  max-width: 500px;
  margin: 0 auto 2.5rem auto; /* Zentriert die Bar selbst */
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
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


.content-area {
  background-color: #ffffff;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>

.nav-link:hover {
  background-color: #34495e;
  color: white;
}

.router-link-active {
  background-color: #3498db !important;
  color: white;
}

/* Der Inhaltsbereich verliert sein Grau und wird auch komplett weiß */
.content-area {
  background-color: #ffffff; /* Weiß statt vorher grau */
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
}
</style>

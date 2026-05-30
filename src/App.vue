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
/* Zwingt den gesamten Browser-Hintergrund dazu, reinweiß zu sein */
html,
body {
  background-color: #ffffff !important;
  margin: 0;
  padding: 0;
}

#app-container {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 2rem;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
}

/* Die Überschrift wird hier mittig oben zentriert */
.main-app-title {
  color: #000000;
  font-size: 2.5rem;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  text-align: center; /* Zentrierung */
}

.navigation-bar {
  display: flex;
  justify-content: center; /* Zentriert auch die Navigationsknöpfe */
  gap: 15px;
  background-color: #2c3e50;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.nav-link {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 4px;
  transition:
    background 0.2s,
    color 0.2s;
}

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

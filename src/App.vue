<script setup lang="ts">
import { ref, onMounted } from 'vue'

const entities = ref<unknown[]>([])

onMounted(async () => {
  const res = await fetch('https://finanztracker-backend.onrender.com/transactions')
  entities.value = await res.json()
})
</script>

<template>
  <div>
    <h2>Meine Einträge</h2>
    <ul>
      <li v-for="entity in entities as any[]" :key="entity.id">{{ entity.amount }} €</li>
    </ul>
  </div>
</template>

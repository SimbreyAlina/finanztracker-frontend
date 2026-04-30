<script setup lang="ts">
import { ref } from 'vue'

const entities = ref([
  { id: 1, name: 'Einnahme', amount: 500 },
  { id: 2, name: 'Miete', amount: -800 },
  { id: 3, name: 'Lebensmittel', amount: -150 },
])
</script>

<template>
  <div>
    <h2>Meine Einträge</h2>

    <ul>
      <li v-for="entity in entities" :key="entity.id">{{ entity.name }}: {{ entity.amount }} €</li>
    </ul>
  </div>
</template>

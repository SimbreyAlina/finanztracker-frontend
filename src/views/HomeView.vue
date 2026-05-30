<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Transaction {
  id: string | null
  amount: number
  date: string
  typ: string
}

const entities = ref<Transaction[]>([])

const loadTransactions = async () => {
  try {
    const res = await fetch('https://finanztracker-backend.onrender.com/transactions')
    entities.value = await res.json()
  } catch (error) {
    console.error('Fehler beim Laden:', error)
  }
}

onMounted(() => {
  loadTransactions()
})
</script>

<template>
  <div class="page-container">
    <section class="list-section">
      <h3 class="section-title">Deine Transaktionen</h3>

      <ul class="transaction-list">
        <li
          v-for="(entity, index) in entities"
          :key="index"
          class="transaction-item"
          :class="entity.typ"
        >
          <span class="date">{{ entity.date }}</span>
          <span class="amount">{{ entity.amount.toFixed(2) }} €</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  padding: 0;
  background: white;
  display: flex;
  justify-content: center; /* Zentriert die Liste horizontal auf dem Bildschirm */
  width: 100%;
}

/* Sorgt dafür, dass die Liste auf PCs nicht unendlich lang gezogen wird, sondern kompakt mittig bleibt */
.list-section {
  width: 100%;
  max-width: 600px; /* Optimale Breite für eine mittige Liste */
}

.section-title {
  color: #000000;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
  margin-top: 0;
  font-size: 1.5rem;
  text-align: center; /* Zentriert die Überschrift der Liste */
}

.transaction-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.transaction-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #f1f2f6;
  border-left: 5px solid #ccc;
  margin-bottom: 0.5rem;
  background-color: #fafafa;
  border-radius: 0 4px 4px 0;
  font-size: 1.1rem;
}

.transaction-item.revenue {
  border-left-color: #2ecc71;
}

.transaction-item.revenue .amount {
  color: #27ae60;
  font-weight: bold;
}

.transaction-item.expense {
  border-left-color: #e74c3c;
}

.transaction-item.expense .amount {
  color: #c0392b;
  font-weight: bold;
}

.date {
  color: #7f8c8d;
}
</style>

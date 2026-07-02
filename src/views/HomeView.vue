<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Transaction {
  amount: number
  category: string
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

// Berechnet die Gesamtsummen pro Kategorie
const categoryTotals = computed(() => {
  const totals: Record<string, number> = {}
  entities.value.forEach((item) => {
    const cat = item.category || 'Sonstiges'
    totals[cat] = (totals[cat] || 0) + item.amount
  })
  return totals
})

onMounted(() => {
  loadTransactions()
})
</script>

<template>
  <div class="page-container">
    <section class="list-section">
      <h3 class="section-title">Kategorie-Übersicht</h3>

      <ul class="transaction-list">
        <li
          v-for="(total, category) in categoryTotals"
          :key="category"
          class="transaction-item"
          :class="total >= 0 ? 'revenue' : 'expense'"
        >
          <span class="category-name">{{ category }}</span>
          <span class="amount">{{ total.toFixed(2) }} €</span>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 600px;
  background: #ffffff;
}
.list-section {
  width: 100%;
}
.section-title {
  color: #000000;
  border-bottom: 2px solid #f1f2f6;
  padding-bottom: 0.8rem;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  text-align: center;
}
.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.transaction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
  border-bottom: 1px solid #f1f2f6;
  border-left: 5px solid #ccc;
  margin-bottom: 0.6rem;
  background-color: #fafafa;
  border-radius: 0 6px 6px 0;
  font-size: 1.1rem;
}
.category-name {
  font-weight: 600;
  color: #2c3e50;
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
/* Dark Mode */
.dark-mode .page-container {
  background: #1e1e1e;
}
.dark-mode .section-title {
  color: #ffffff;
  border-bottom-color: #333;
}
.dark-mode .transaction-item {
  background-color: #2a2a2a;
  border-bottom-color: #333;
}
.dark-mode .category-name {
  color: #ecf0f1;
}
</style>

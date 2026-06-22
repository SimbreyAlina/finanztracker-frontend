<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Transaction {
  amount: number
  date: string
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

onMounted(() => {
  loadTransactions()
})
</script>

<template>
  <div class="page-container">
    <section class="list-section">
      <h3 class="section-title">Genereller Verlauf</h3>

      <ul class="transaction-list">
        <li
          v-for="(entity, index) in entities"
          :key="index"
          class="transaction-item"
          :class="entity.amount >= 0 ? 'revenue' : 'expense'"
        >
          <div class="meta-info">
            <span class="date">{{ entity.date }}</span>
            <span class="category-tag">{{ entity.category || 'Sonstiges' }}</span>
          </div>
          <span class="amount">{{ entity.amount.toFixed(2) }} €</span>
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
.meta-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.date {
  color: #7f8c8d;
  font-size: 0.9rem;
}
.category-tag {
  font-weight: bold;
  color: #34495e;
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
</style>

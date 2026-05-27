<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Transaction {
  id: string | null
  amount: number
  date: string
  typ: string
}

const entities = ref<Transaction[]>([])
const newAmount = ref<number | null>(null)
const newType = ref<string>('revenue')

const loadTransactions = async () => {
  try {
    const res = await fetch('https://finanztracker-backend.onrender.com/transactions')
    entities.value = await res.json()
  } catch (error) {
    console.error('Fehler beim Laden:', error)
  }
}

const addTransaction = () => {
  if (newAmount.value === null || newAmount.value <= 0) return
  const finalAmount = newType.value === 'expense' ? -newAmount.value : newAmount.value

  entities.value.push({
    id: null,
    amount: finalAmount,
    date: new Date().toISOString().slice(0, 10),
    typ: newType.value,
  })
  newAmount.value = null
}

onMounted(() => {
  loadTransactions()
})
</script>

<template>
  <div class="page-container">
    <h3>Neuen Eintrag hinzufügen</h3>
    <form @submit.prevent="addTransaction" class="form">
      <input type="number" step="0.01" v-model="newAmount" placeholder="Betrag (€)" required />
      <select v-model="newType">
        <option value="revenue">Einnahme (+)</option>
        <option value="expense">Ausgabe (-)</option>
      </select>
      <button type="submit">Hinzufügen</button>
    </form>

    <h3>Deine Transaktionen</h3>
    <ul>
      <li v-for="(entity, index) in entities" :key="index" :class="entity.typ">
        {{ entity.amount }} € ({{ entity.typ === 'revenue' ? 'Einnahme' : 'Ausgabe' }})
      </li>
    </ul>
  </div>
</template>

<style scoped>
.page-container {
  padding: 2rem;
  background: white;
  border-radius: 8px;
}
.form {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.revenue {
  color: green;
  font-weight: bold;
}
.expense {
  color: red;
  font-weight: bold;
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'

const newAmount = ref<number | null>(null)
const newType = ref<string>('revenue')
const newCategory = ref<string>('Sonstiges')

// Dynamische Kategorien je nach Typ
const incomeCategories = ['Job', 'Nebenjob', 'Geschenkt bekommen', 'Sonstiges']
const expenseCategories = [
  'Einkauf',
  'Essen gehen',
  'Klamotten',
  'Spaß/Freizeit',
  'Geschenke',
  'Sonstiges',
]

// Wenn sich der Typ ändert, setzen wir die Kategorie auf einen sinnvollen Standard zurück
watch(newType, (currentType) => {
  newCategory.value = 'Sonstiges'
})

const addTransaction = async () => {
  if (newAmount.value === null || newAmount.value <= 0) return

  let finalAmount = newAmount.value
  if (newType.value === 'expense') {
    finalAmount = -Math.abs(newAmount.value)
  }

  try {
    const response = await fetch('https://finanztracker-backend.onrender.com/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: finalAmount,
        category: newCategory.value, // Kategorie mitsenden!
        date: new Date().toISOString().split('T')[0],
      }),
    })

    if (response.ok) {
      alert('Eintrag erfolgreich mit Kategorie gespeichert!')
      newAmount.value = null
    } else {
      alert('Fehler beim Speichern.')
    }
  } catch (error) {
    console.error('Netzwerkfehler:', error)
  }
}
</script>

<template>
  <div class="page-container">
    <h3 class="section-title">Neuen Eintrag hinzufügen</h3>

    <form @submit.prevent="addTransaction" class="transaction-form">
      <div class="input-group">
        <label for="amount">Betrag (€)</label>
        <input
          id="amount"
          type="number"
          step="0.01"
          v-model="newAmount"
          placeholder="z.B. 50.00"
          required
        />
      </div>

      <div class="input-group">
        <label for="type">Typ</label>
        <select id="type" v-model="newType">
          <option value="revenue">Einnahme (+)</option>
          <option value="expense">Ausgabe (-)</option>
        </select>
      </div>

      <div class="input-group">
        <label for="category">Kategorie</label>
        <select id="category" v-model="newCategory">
          <option
            v-if="newType === 'revenue'"
            v-for="cat in incomeCategories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
          <option
            v-if="newType === 'expense'"
            v-for="cat in expenseCategories"
            :key="cat"
            :value="cat"
          >
            {{ cat }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn-submit">Hinzufügen</button>
    </form>
  </div>
</template>

<style scoped>
.page-container {
  padding: 1rem;
  background: white;
  border-radius: 8px;
}
.section-title {
  color: #000000;
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  border-bottom: 2px solid #ecf0f1;
  padding-bottom: 0.5rem;
}
.transaction-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-width: 350px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.input-group label {
  font-weight: bold;
  color: #333333;
  font-size: 0.95rem;
}
.input-group input,
.input-group select {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  color: #000000;
  background-color: #ffffff;
}
.btn-submit {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}
.btn-submit:hover {
  background-color: #2980b9;
}
</style>

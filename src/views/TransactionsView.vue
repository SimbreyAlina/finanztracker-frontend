<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const newAmount = ref<number | null>(null)
const newType = ref<string>('revenue')
const newCategory = ref<string>('Sonstiges')
const newComment = ref<string>('')

// Kategorien werden dynamisch vom Backend geladen
const allCategories = ref<any[]>([])
const filteredCategories = ref<string[]>([])

const loadCategories = async () => {
  try {
    const res = await fetch('https://finanztracker-backend.onrender.com/categories')
    allCategories.value = await res.json()
    updateDropdown()
  } catch (error) {
    console.error('Fehler beim Laden der Kategorien:', error)
  }
}

const updateDropdown = () => {
  // Filtert die Kategorien passend zum aktuellen Typ (Einnahme/Ausgabe)
  filteredCategories.value = allCategories.value
    .filter((c) => c.type === newType.value)
    .map((c) => c.name)

  // Setzt 'Sonstiges' als Standard voraus, falls es existiert
  if (filteredCategories.value.includes('Sonstiges')) {
    newCategory.value = 'Sonstiges'
  } else if (filteredCategories.value.length > 0) {
    newCategory.value = filteredCategories.value[0] ?? ''
  } else {
    newCategory.value = ''
  }
}

// Beobachtet den Typ-Wechsel, um die Kategorien live anzupassen
watch(newType, updateDropdown)

const addTransaction = async () => {
  if (newAmount.value === null || newAmount.value <= 0) return

  let finalAmount = newType.value === 'expense' ? -Math.abs(newAmount.value) : newAmount.value

  try {
    const response = await fetch('https://finanztracker-backend.onrender.com/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: finalAmount,
        category: newCategory.value,
        comment: newComment.value,
        date: new Date().toISOString().split('T')[0],
      }),
    })

    if (response.ok) {
      alert('Eintrag erfolgreich gespeichert!')
      newAmount.value = null
      newComment.value = ''
    } else {
      alert('Fehler beim Speichern der Transaktion.')
    }
  } catch (error) {
    console.error('Netzwerkfehler:', error)
  }
}

onMounted(loadCategories)
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
          <option v-for="cat in filteredCategories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>

      <div class="input-group">
        <label for="comment"
          >Kommentar <span class="optional-hint">(optional, max. 20 Z.)</span></label
        >
        <input
          id="comment"
          type="text"
          v-model="newComment"
          maxlength="20"
          placeholder="z.B. REWE, Kino..."
        />
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
.optional-hint {
  font-weight: normal;
  color: #7f8c8d;
  font-size: 0.8rem;
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
/* Dark Mode */
.dark-mode .page-container {
  background: #1e1e1e;
}
.dark-mode .section-title {
  color: #ffffff;
  border-bottom-color: #333;
}
.dark-mode .input-group label {
  color: #ecf0f1;
}
.dark-mode .optional-hint {
  color: #a0a0a0;
}
.dark-mode .input-group input,
.dark-mode .input-group select {
  background-color: #2a2a2a;
  color: #ffffff;
  border-color: #444;
}
</style>

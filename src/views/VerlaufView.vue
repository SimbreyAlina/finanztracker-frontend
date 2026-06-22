<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface Transaction {
  amount: number;
  date: string;
  category: string;
  comment?: string; // Neu: Optionales Feld im Interface
}

const entities = ref<Transaction[]>([])
const searchQuery = ref<string>('') // Neu: Zustand für die Suchleiste

const loadTransactions = async () => {
  try {
    const res = await fetch('https://finanztracker-backend.onrender.com/transactions')
    entities.value = await res.json()
  } catch (error) {
    console.error("Fehler beim Laden:", error)
  }
}

// NEU: Filtert die Liste live anhand des Suchbegriffs
const filteredEntities = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  if (!query) return entities.value

  return entities.value.filter(entity => {
    const categoryMatch = (entity.category || '').toLowerCase().includes(query)
    const commentMatch = (entity.comment || '').toLowerCase().includes(query)
    const dateMatch = (entity.date || '').includes(query)

    return categoryMatch || commentMatch || dateMatch
  })
})

onMounted(() => { loadTransactions() })
</script>

<template>
  <div class="page-container">
    <section class="list-section">
      <h3 class="section-title">Genereller Verlauf</h3>

      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="🔍 Nach Kategorie, Kommentar oder Datum suchen..."
          class="search-input"
        />
      </div>

      <ul class="transaction-list">
        <li v-for="(entity, index) in filteredEntities" :key="index" class="transaction-item" :class="entity.amount >= 0 ? 'revenue' : 'expense'">
          <div class="meta-info">
            <span class="date">{{ entity.date }}</span>
            <span class="category-tag">{{ entity.category || 'Sonstiges' }}</span>
            <span v-if="entity.comment" class="comment-text">"{{ entity.comment }}"</span>
          </div>
          <span class="amount">{{ entity.amount.toFixed(2) }} €</span>
        </li>

        <li v-if="filteredEntities.length === 0" class="no-results">
          Keine Buchungen für deine Suche gefunden.
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.page-container { width: 100%; max-width: 600px; background: #ffffff; }
.list-section { width: 100%; }
.section-title { color: #000000; border-bottom: 2px solid #f1f2f6; padding-bottom: 0.8rem; margin-bottom: 1rem; font-size: 1.6rem; text-align: center; }

/* Styles für die neue Suchleiste */
.search-container { margin-bottom: 1.5rem; width: 100%; }
.search-input { width: 100%; padding: 0.8rem 1rem; border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; color: #000000; background-color: #fafafa; box-sizing: border-box; }
.search-input:focus { border-color: #3498db; outline: none; background-color: #ffffff; }

.transaction-list { list-style: none; padding: 0; margin: 0; }
.transaction-item { display: flex; justify-content: space-between; align-items: center; padding: 1.2rem; border-bottom: 1px solid #f1f2f6; border-left: 5px solid #ccc; margin-bottom: 0.6rem; background-color: #fafafa; border-radius: 0 6px 6px 0; font-size: 1.1rem; }
.meta-info { display: flex; flex-direction: column; gap: 0.2rem; }
.date { color: #7f8c8d; font-size: 0.9rem; }
.category-tag { font-weight: bold; color: #2c3e50; }

/* Style für die Kommentar-Anzeige */
.comment-text { font-size: 0.95rem; color: #555555; font-style: italic; margin-top: 0.1rem; }

.transaction-item.revenue { border-left-color: #2ecc71; }
.transaction-item.revenue .amount { color: #27ae60; font-weight: bold; }
.transaction-item.expense { border-left-color: #e74c3c; }
.transaction-item.expense .amount { color: #c0392b; font-weight: bold; }
.no-results { text-align: center; color: #7f8c8d; padding: 2rem 0; font-style: italic; }
</style>
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


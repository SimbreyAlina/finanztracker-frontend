<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Category {
  id: number
  name: string
  type: string
}

const categories = ref<Category[]>([])
const newCatName = ref('')
const newCatType = ref('revenue')
const editingId = ref<number | null>(null)

const loadCategories = async () => {
  const res = await fetch('https://finanztracker-backend.onrender.com/categories')
  categories.value = await res.json()
}

const saveCategory = async () => {
  if (!newCatName.value.trim()) return

  const method = editingId.value ? 'PUT' : 'POST'
  const url = editingId.value
    ? `https://finanztracker-backend.onrender.com/categories/${editingId.value}`
    : 'https://finanztracker-backend.onrender.com/categories'

  await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: newCatName.value, type: newCatType.value }),
  })

  newCatName.value = ''
  editingId.value = null
  loadCategories()
}

const editCategory = (cat: Category) => {
  if (cat.name === 'Sonstiges') return
  newCatName.value = cat.name
  newCatType.value = cat.type
  editingId.value = cat.id
}

const deleteCategory = async (id: number) => {
  await fetch(`https://finanztracker-backend.onrender.com/categories/${id}`, { method: 'DELETE' })
  loadCategories()
}

onMounted(loadCategories)
</script>

<template>
  <div class="page-container">
    <h3 class="section-title">Kategorien verwalten</h3>

    <div class="add-form">
      <input v-model="newCatName" placeholder="Kategoriename..." class="search-input" />
      <select v-model="newCatType" class="type-select">
        <option value="revenue">Einnahme</option>
        <option value="expense">Ausgabe</option>
      </select>
      <button @click="saveCategory" class="btn-save">
        {{ editingId ? 'Speichern' : 'Hinzufügen' }}
      </button>
    </div>

    <div class="category-lists">
      <div class="list-column">
        <h4>Einnahmen</h4>
        <ul>
          <li v-for="cat in categories.filter((c) => c.type === 'revenue')" :key="cat.id">
            {{ cat.name }}
            <div v-if="cat.name !== 'Sonstiges'">
              <button @click="editCategory(cat)" class="btn-edit">✎</button>
              <button @click="deleteCategory(cat.id)" class="btn-del">X</button>
            </div>
          </li>
        </ul>
      </div>

      <div class="list-column">
        <h4>Ausgaben</h4>
        <ul>
          <li v-for="cat in categories.filter((c) => c.type === 'expense')" :key="cat.id">
            {{ cat.name }}
            <div v-if="cat.name !== 'Sonstiges'">
              <button @click="editCategory(cat)" class="btn-edit">✎</button>
              <button @click="deleteCategory(cat.id)" class="btn-del">X</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  width: 100%;
  max-width: 800px;
  padding: 1rem;
}
.section-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 2rem;
}
.add-form {
  display: flex;
  gap: 10px;
  margin-bottom: 2rem;
  justify-content: center;
}
.type-select {
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.btn-save {
  background: #3498db;
  color: white;
  border: none;
  padding: 0 1.5rem;
  border-radius: 6px;
  cursor: pointer;
}
.category-lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  padding: 0.8rem;
  background: #fafafa;
  margin-bottom: 5px;
  border-radius: 4px;
  border-left: 4px solid #2c3e50;
}
.btn-edit {
  background: none;
  border: none;
  cursor: pointer;
  color: #3498db;
  margin-right: 10px;
}
.btn-del {
  background: none;
  border: none;
  cursor: pointer;
  color: #e74c3c;
  font-weight: bold;
}
h4 {
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}
/* Dark Mode */
.dark-mode .section-title {
  color: #ffffff;
}
.dark-mode input,
.dark-mode .type-select {
  background-color: #2a2a2a;
  color: #ffffff;
  border-color: #444;
}
.dark-mode li {
  background: #2a2a2a;
  color: #ffffff;
  border-left-color: #3498db;
}
.dark-mode h4 {
  color: #ffffff;
  border-bottom-color: #333;
}
</style>

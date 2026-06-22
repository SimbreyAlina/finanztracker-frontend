<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const newAmount = ref<number | null>(null)
const newType = ref<string>('revenue')
const newCategory = ref<string>('Sonstiges')
const newComment = ref<string>('')

// NEU: Kategorien kommen jetzt vom Backend
const allCategories = ref<any[]>([])
const filteredCategories = ref<string[]>([])

const loadCategories = async () => {
  const res = await fetch('https://finanztracker-backend.onrender.com/categories')
  allCategories.value = await res.json()
  updateDropdown()
}

const updateDropdown = () => {
  filteredCategories.value = allCategories.value
    .filter((c) => c.type === newType.value)
    .map((c) => c.name)
  newCategory.value = 'Sonstiges'
}

watch(newType, updateDropdown)

const addTransaction = async () => {
  if (newAmount.value === null || newAmount.value <= 0) return
  let finalAmount = newType.value === 'expense' ? -Math.abs(newAmount.value) : newAmount.value

  await fetch('https://finanztracker-backend.onrender.com/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: finalAmount,
      category: newCategory.value,
      comment: newComment.value,
      date: new Date().toISOString().split('T')[0],
    }),
  })
  alert('Gespeichert!')
  newAmount.value = null
  newComment.value = ''
}

onMounted(loadCategories)
</script>

<select id="category" v-model="newCategory">
<option v-for="cat in filteredCategories" :key="cat" :value="cat">{{ cat }}</option>
</select>

<script setup>
import { ref, computed } from 'vue'

const filteredcheckouts = ref([])
const checkouts = ref([
  { id: 1, user: 'John Doe', book: 'The Lightning Thief', checkoutDate: '10-12-2023', dueDate: '10-26-2023', device: 'calculator', checkoutDate: '10-12-2023', dueDate: '10-26-2023' },
  { id: 2, user: 'Jane Doe', book: 'The Hunger Games', checkoutDate: '10-11-2023', dueDate: '10-25-2023', media: 'Movie', checkoutDate: '10-12-2023', dueDate: '10-26-2023' },
  { id: 3, user: 'Jason Doe', book: 'Databases V2 Textbook', checkoutDate: '10-07-2023', dueDate: '10-21-2023' },
  { id: 4, user: 'Jordan Doe', book: 'Captain Underpants', checkoutDate: '10-08-2023', dueDate: '10-22-2023' },
  // ... more checkouts
])
const showUsersDropdown = ref(false)
const showNamesDropdown = ref(false)


const uniqueUsers = computed(() => {
  return [...new Set(checkouts.value.map(checkout => ({ id: checkout.id, name: checkout.user })))];
})

const uniqueNames = computed(() => {
  return [...new Set(checkouts.value.map(checkout => checkout.user))];
})

function filterByUserId(id) {
  filteredcheckouts.value = checkouts.value.filter(checkout => checkout.id === id);
}
function filterByName(name) {
  filteredcheckouts.value = checkouts.value.filter(checkout => checkout.user === name);
}
function resetFilter() {
  filteredcheckouts.value = checkouts;
  showUsersDropdown.value = false;
  showNamesDropdown.value = false;
}
</script>

<template>
  <div class="checkouts-page">
    <h1>Currently Checked Out</h1>
    <div class="filters">
      <button @click="showUsersDropdown = !showUsersDropdown">User ID</button>
      <div v-if="showUsersDropdown" class="dropdown">
        <button v-for="user in uniqueUsers" :key="user.id" @click="filterByUserId(user.id)">
          {{ user.id }}
        </button>
        <button @click="resetFilter">Back</button>
      </div>

      <button @click="showNamesDropdown = !showNamesDropdown">Name</button>
      <div v-if="showNamesDropdown" class="dropdown">
        <button v-for="name in uniqueNames" :key="name" @click="filterByName(name)">
          {{ name }}
        </button>
        <button @click="resetFilter">Back</button>
      </div>
    </div>

    <div v-if="filteredcheckouts.length > 0">
      <div class="checkout" v-for="checkout in filteredcheckouts" :key="checkout.id">
        <h3>{{ checkout.user }}</h3>
        <p>Book: {{ checkout.book }}</p>
        <p>Device: {{ checkout.device }}</p>
        <p>Media: {{ checkout.media }}</p>
        <p>Checked Out On: {{ checkout.checkoutDate }}</p>
        <p>Due Date: {{ checkout.dueDate }}</p>
      </div>
    </div>
    <div v-else>
      <p>No checkouts to display</p>
    </div>
    <div class="library-image">
    </div>
  </div>
</template>
  
<style scoped>
.checkouts-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.checkout {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.library-image {
  margin-top: 20px;
  text-align: center;
}

img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.login-section {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 40px 20px;
  border-radius: 8px;
  color: #fff;
}

.filters {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.dropdown {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.login-header,
.login-label {
  font-weight: bold;
  color: #000;
}

.login-bg-image {
  margin-top: 20px;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
</style>
  
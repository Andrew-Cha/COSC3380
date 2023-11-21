<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api`;

const rentMedia = ref([]);
const rentBooks = ref([]);
const rentDevices = ref([]);

onMounted(async () => {
  try {
    const itemsResponse = await axios.get(`${apiUrl}/rentMedia`);
    media.value = itemsResponse.data;
    const booksResponse = await axios.get(`${apiUrl}/rentBooks`);
    books.value = booksResponse.data;
    const devicesResponse = await axios.get(`${apiUrl}/rentDevices`);
    devices.value = devicesResponse.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

async function returnItem(id) {
  try {
    await axios.post(`${apiUrl}/return`, { id });
  } catch (error) {
    console.error('Error returning the item:', error);
  }
}

async function extendLoan(id) {
  try {
    await axios.post(`${apiUrl}/extend`, { id });
  } catch (error) {
    console.error('Error returning the item:', error);
  }
}
</script>
<template>
  <div class="inventory-page">
    <h2 class="page-title">My Inventory</h2>

    <div class="inventory-section">
      <h3>Books</h3>
      <table v-if="rentBooks.length != 0" table class="inventory-table">
        <th>Title</th>
        <th>ISBN</th>
        <th>Edition</th>
        <th>Loan Date</th>
        <th>Loan Until</th>
        <th>Returned Date</th>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.isbn }}</td>
          <td> {{ book.edition }}</td>
          <td> {{ book.loaned_at }}</td>
          <td> {{ book.loaned_until }}</td>
          <td> {{ book.returned_at }}</td>
          <td>
            <button class="action-button return-button" @click="returnItem(book.id)">Return</button>
            <button class="action-button extend-button" @click="extendLoan(book.id)">Extend</button>
          </td>
        </tr>
      </table>
      <div v-else>
        <p>You do not have any book to check out.</p>
      </div>
    </div>

    <div class="inventory-section">
      <h3>Devices</h3>
      <table v-if="rentDevices.length != 0" class="inventory-table">
        <th>Name</th>
        <th>Type</th>
        <th>Serial Number</th>
        <th>Loan Date</th>
        <th>Loan Until</th>
        <th>Returned Date</th>
        <tr v-for="device in devices" :key="device.id">
          <td>{{ device.device_name }}</td>
          <td>{{ device.device_type }}</td>
          <td> {{ device.serial_number }}</td>
          <td> {{ device.loaned_at }}</td>
          <td> {{ device.loaned_until }}</td>
          <td> {{ device.returned_at }}</td>
          <td>
            <button class="action-button return-button" @click="returnItem(device.id)">Return</button>
            <button class="action-button extend-button" @click="extendLoan(device.id)">Extend</button>
          </td>
        </tr>
      </table>

      <div v-else>
        <p>You do not have any device to check out.</p>
      </div>
    </div>

    <div class="inventory-section">
      <h3>Media</h3>
      <table v-if="rentMedia.length != 0" class="inventory-table">
        <th>Title</th>
        <th>Author</th>
        <th>Media Link</th>
        <th>Loan Date</th>
        <th>Loan Until</th>
        <th>Returned Date</th>
        <tr v-for="item in media" :key="item.id">
          <td>{{ item.title }}</td>
          <td>{{ item.author }}</td>
          <td>{{ item.file_link }}</td>
          <td>{{ item.loaned_at }}</td>
          <td>{{ item.loaned_until }}</td>
          <td>{{ item.returned_at }}</td>
          <td>
            <button class="action-button return-button" @click="returnItem(item.id)">Return</button>
            <button class="action-button extend-button" @click="extendLoan(item.id)">Extend</button>
          </td>
        </tr>
      </table>

      <div v-else>
        <p>You do not have any media to check out.</p>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
.inventory-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.inventory-section {
  width: 80%;
  margin-bottom: 20px;
}

.inventory-table {
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.action-button {
  background-color: #007BFF;
  color: white;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.return-button {
  margin-right: 5px;
}

.action-button:hover {
  background-color: #0056b3;
}

table,
th,
td {
  border: 1px solid;
}
</style>
  
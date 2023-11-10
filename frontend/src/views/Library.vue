<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api`;

const media = ref([]);
const books = ref([]);
const devices = ref([]);

onMounted(async () => {
    try {
        const itemsResponse = await axios.get(`${apiUrl}/media`);
        media.value = itemsResponse.data;
        const booksResponse = await axios.get(`${apiUrl}/books`);
        books.value = booksResponse.data;
        const devicesResponse = await axios.get(`${apiUrl}/devices`);
        devices.value = devicesResponse.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

async function returnItem(id) {

}

async function extendLoan(id) {

}
</script>
<template>
    <div class="inventory-page">
        <h2 class="page-title">Library Inventory</h2>

        <div class="inventory-section">
            <h3>Books</h3>
            <table v-if="books.length != 0" table class="inventory-table">
                <th>Title</th>
                <th>ISBN</th>
                <th>Condition</th>
                <th>Edition</th>
                <th>Release Year</th>
                <th>Actions</th>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.isbn }}</td>
                    <td> {{ book.condition }}</td>
                    <td> {{ book.edition }}</td>
                    <td> {{ book.release_year }}</td>
                    <td>
                        <button class="action-button return-button" @click="returnItem(book.id)">Loan</button>
                        <button class="action-button extend-button" @click="extendLoan(book.id)">Hold</button>
                    </td>
                </tr>
            </table>
            <div v-else>
                <p>Loading the books..</p>
            </div>
        </div>

        <div class="inventory-section">
            <h3>Devices</h3>
            <table v-if="devices.length != 0" class="inventory-table">
                <th>Name</th>
                <th>Type</th>
                <th>Maintenance History</th>
                <th>Manufacturer</th>
                <th>Opearting System</th>
                <th>Serial Number</th>
                <th>Year Released</th>
                <th>Actions</th>
                <tr v-for="device in devices" :key="device.id">
                    <td>{{ device.device_name }}</td>
                    <td>{{ device.device_type }}</td>
                    <td> {{ device.maintenance_history }}</td>
                    <td> {{ device.manufacturer }}</td>
                    <td> {{ device.operating_system }}</td>
                    <td> {{ device.serial_number }}</td>
                    <td> {{ device.year_publish }}</td>
                    <td>
                        <button class="action-button return-button" @click="returnItem(device.id)">Loan</button>
                        <button class="action-button extend-button" @click="extendLoan(device.id)">Hold</button>
                    </td>
                </tr>
            </table>

            <div v-else>
                <p>Loading devices..</p>
            </div>
        </div>

        <div class="inventory-section">
            <h3>Media</h3>
            <table v-if="media.length != 0" class="inventory-table">
                <th>Author</th>
                <th>Title</th>
                <th>Media Type</th>
                <th>Media Size</th>
                <th>Actions</th>
                <tr v-for="item in media" :key="item.id">
                    <td>{{ item.author }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.file_type }}</td>
                    <td>{{ item.file_size }}</td>
                    <td>
                        <button class="action-button return-button" @click="returnItem(item.id)">Loan</button>
                        <button class="action-button extend-button" @click="extendLoan(item.id)">Hold</button>
                    </td>
                </tr>
            </table>

            <div v-else>
                <p>Loading media..</p>
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
  
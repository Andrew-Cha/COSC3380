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
        console.log(media.value)
        console.log(books.value)
        console.log(devices.value)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

/* refreshing for returning and extending */
async function returnItem(id) {

}

async function extendLoan(id) {

}
/* item book device tables */
</script>
<template>
    <div class="inventory-page">
        <h2 class="page-title">Library Inventory</h2>

        <div class="inventory-section">
            <h3>Media</h3>
            <table class="inventory-table">
                <tr v-for="item in media" :key="item.id">
                    <td>{{ item.title }}</td>
                    <td>
                        <button class="action-button return-button" @click="returnItem(item.id)">Return</button>
                        <button class="action-button extend-button" @click="extendLoan(item.id)">Extend</button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="inventory-section">
            <h3>Books</h3>
            <table class="inventory-table">
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.isbn }}</td>
                    <td>
                        <button class="action-button return-button" @click="returnItem(book.id)">Return</button>
                        <button class="action-button extend-button" @click="extendLoan(book.id)">Extend</button>
                    </td>
                </tr>
            </table>
        </div>

        <div class="inventory-section">
            <h3>Devices</h3>
            <table class="inventory-table">
                <tr v-for="device in devices" :key="device.id">
                    <td>{{ device.device_name }}</td>
                    <td>{{ device.device_type }}</td>
                    <td>
                        <button class="action-button return-button" @click="returnItem(device.id)">Return</button>
                        <button class="action-button extend-button" @click="extendLoan(device.id)">Extend</button>
                    </td>
                </tr>
            </table>
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
</style>
  
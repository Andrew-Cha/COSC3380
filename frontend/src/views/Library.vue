<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api`;

const items = ref([]);
const books = ref([]);
const devices = ref([]);

onMounted(async () => {
    try {
        const itemsResponse = await axios.get(`${apiUrl}/items`);
        items.value = itemsResponse.data;
        const booksResponse = await axios.get(`${apiUrl}/books`);
        books.value = booksResponse.data;
        const devicesResponse = await axios.get(`${apiUrl}/devices`);
        devices.value = devicesResponse.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

/* refreshing for returning and extending */
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
        console.error('Error extending the loan:', error);
    }
}
/* item book device tables */
</script>

<template>
    <div class="inventory-page">
        <h2>Library Inventory</h2>
        
        
        <div class="table-section">
            <h3>Items</h3>
            <table>
                <tr v-for="item in items" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.due_date }}</td>
                    <td>
                        <button @click="returnItem(item.id)">Return</button>
                        <button @click="extendLoan(item.id)">Extend</button>
                    </td>
                </tr>
            </table>
        </div>

        
        <div class="table-section">
            <h3>Books</h3>
            <table>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.due_date }}</td>
                    <td>
                        <button @click="returnItem(book.id)">Return</button>
                        <button @click="extendLoan(book.id)">Extend</button>
                    </td>
                </tr>
            </table>
        </div>

        
        <div class="table-section">
            <h3>Devices</h3>
            <table>
                <tr v-for="device in devices" :key="device.id">
                    <td>{{ device.type }}</td>
                    <td>{{ device.due_date }}</td>
                    <td>
                        <button @click="returnItem(device.id)">Return</button>
                        <button @click="extendLoan(device.id)">Extend</button>
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

.table-section {
    margin-bottom: 20px;
    width: 80%;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
}

td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

button {
    background-color: #5cb85c; 
    color: white;
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #4cae4c;
}
</style>

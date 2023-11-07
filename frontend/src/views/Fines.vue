<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api`;

const fineToBook = ref([])
const fineToDevice = ref([])
const finetoMedia = ref([])

onMounted(async () => {
    try {
        const bookResponse = await axios.get(`${apiUrl}/fineToBook`);
        fineToBook.value = bookResponse.data;
        const mediaResponse = await axios.get(`${apiUrl}/fineToMedia`);
        fineToMedia.value = mediaResponse.data;
        const deviceResponse = await axios.get(`${apiUrl}/fineToDevice`);
        fineTodevice.value = deviceResponse.data;
        console.log(fineToBook.value)
        console.log(fineToDevice.value)
        console.log(finetoMedia.value)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
async function payFine(id) {
    try {
        await axios.post(`${apiUrl}/pay`, { id });
    } catch (error) {
        console.error('Error returning the item:', error);
    }
}
</script>

<template>
    <div class="fines-page">
        <h1>Fines Page</h1>

        <div class="table-section">
            <h3>Books</h3>
            <table>
                <tr v-for="book in fineToBook" :key="book.id">
                    <td>
                        {{ book.id }}
                        {{ book.title }}
                    </td>
                    <td>
                        <button @click="payFine(book.id)">Pay Fine</button>
                    </td>

                </tr>
            </table>
        </div>

        <div class="table-section">
            <h3>Media</h3>
            <table>
                <tr v-for="media in fineToMedia" :key="media.id">
                    <td>
                        {{ media.id }}
                        {{ media.title }}
                    </td>
                    <td>
                        <button @click="payFine(media.id)">Pay Fine</button>
                    </td>

                </tr>
            </table>
        </div>
        <div class="table-section">
            <h3>Device</h3>
            <table>
                <tr v-for="device in fineToDevice" :key="device.id">
                    <td>
                        {{ device.id }}
                        {{ device.device_name }}
                    </td>
                    <td>
                        <button @click="payFine(device.id)">Pay Fine</button>
                    </td>

                </tr>
            </table>
        </div>
    </div>
</template>

  
<style scoped>
.fines-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
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

.fine {
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
</style>
  
  
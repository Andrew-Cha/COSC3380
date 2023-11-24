<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore()
const { user, isLoggedIn } = storeToRefs(mainStore)

const apiUrl = `http://${import.meta.env.VITE_SERVER_URL}:3000/api`;

const fineToBook = ref([])
const fineToDevice = ref([])
const fineToMedia = ref([])

const refreshFines = async () => {
    try {
        const body = {
            userId: user.value.id
        }

        const bookResponse = await axios.post(`${apiUrl}/fines/books`, body);
        fineToBook.value = bookResponse.data;
        const mediaResponse = await axios.post(`${apiUrl}/fines/media`, body);
        fineToMedia.value = mediaResponse.data;
        const deviceResponse = await axios.post(`${apiUrl}/fines/devices`, body);
        fineToDevice.value = deviceResponse.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(refreshFines);

const payBook = async (id, cardNumber) => {
    await axios.post(`${apiUrl}/fines/payBook`, { id, cardNumber });
    await refreshFines();
};

const payMedia = async (id, cardNumber) => {
    await axios.post(`${apiUrl}/fines/payMedia`, { id, cardNumber });
    await refreshFines();
};

const payDevice = async (id, cardNumber) => {
    await axios.post(`${apiUrl}/fines/payDevice`, { id, cardNumber });
    await refreshFines();
};

const payFine = async (id, type) => {
    if (isLoggedIn.value) {
        try {
            const cardNumber = prompt("Please give me your card number")

            switch (type) {
                case 'book':
                    await payBook(id, cardNumber);
                    break;
                case 'media':
                    await payMedia(id, cardNumber);
                    break;
                case 'device':
                    await payDevice(id, cardNumber);
                    break;
                default:
                    throw new Error(`Unsupported fine type: ${type}`);
            }
            alert("Paid successfully, thank you for your money.")
        } catch (error) {
            console.error('Error paying fine:', error);
        }
    }
};
</script>

<template>
    <div class="fines-page">
        <h1>Fines Page</h1>

        <div>
            <h3>Books</h3>
            <table v-if="fineToBook.length !== 0" class="table-section">
                <th>Book Title</th>
                <th>Amount Due</th>
                <th>Fined At</th>
                <tr v-for="book in fineToBook" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>${{ book.fine_amount }}</td>
                    <td>{{ book.fined_at }}</td>
                    <td>
                        <button @click="payFine(book.id, 'book')" :disabled="book.transaction_amount != null">Pay
                            Fine</button>
                    </td>
                </tr>
            </table>

            <div v-else>
                <p>You have no fines for books.</p>
            </div>
        </div>

        <div>
            <h3>Device</h3>
            <table v-if="fineToDevice.length !== 0" class="table-section">
                <th>Device Name</th>
                <th>Amount Due</th>
                <th>Fined At</th>
                <tr v-for="device in fineToDevice" :key="device.id">
                    <td>{{ device.device_name }}</td>
                    <td>${{ device.fine_amount }}</td>
                    <td>{{ device.fined_at }}</td>
                    <td>
                        <button @click="payFine(device.id, 'device')" :disabled="device.transaction_amount != null">Pay
                            Fine</button>
                    </td>
                </tr>
            </table>
            <div v-else>
                <p>You have no fines for devices.</p>
            </div>
        </div>

        <div>
            <h3>Media</h3>
            <table v-if="fineToMedia.length !== 0" class="table-section">
                <th>Media Name</th>
                <th>Amount Due</th>
                <th>Fined At</th>
                <tr v-for="media in fineToMedia" :key="media.id">
                    <td>{{ media.title }}</td>
                    <td>${{ media.fine_amount }}</td>
                    <td>{{ media.fined_at }}</td>
                    <td>
                        <button @click="payFine(media.id, 'media')" :disabled="media.transaction_amount != null">Pay
                            Fine</button>
                    </td>
                </tr>
            </table>
            <div v-else>
                <p>You have no fines for media.</p>
            </div>
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
    background-color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0;
}

td {
    border: 1px solid #ccc;
    padding: 8px;
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

button:disabled {
    background-color: gray;
}
</style>
  
  
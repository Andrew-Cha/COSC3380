<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const user = ref({
    name: "",
    registration: "",
    identificationNumber: "",
    role_ID: "",
});


async function fetchUser() {
    try {
        const response = await axios.get(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/customer/1`);
        if (response.status === 200) {
            const userData = response.data;
            user.value = {
                name: userData.first_name + ' ' + userData.last_name,
                registration: userData.registration_date,
                password: userData.password
            };
        } else {
            console.error('Error getting customer data');
        }
    } catch (error) {
        console.error(error);
    }
}

onMounted(fetchUser);

</script>


<template>
    <div class="user-profile-page">
        <h2 class="page-title">User Information - Hardcoded to the first user for now</h2>
        <div class="user-information">
            <div class="user-detail">
                <strong>Name:</strong>
                <p>{{ user.name }}</p>
            </div>
            <div class="user-detail">
                <strong>Registration Date:</strong>
                <p>{{ user.registration }}</p>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.user-profile-page {
    text-align: center;
    margin: 20px;
}

.page-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.user-information {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #ccc;
    padding: 20px;
    margin: 20px;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.user-detail {
    margin: 10px 0;
    text-align: left;
}

.user-detail strong {
    font-weight: bold;
    margin-right: 5px;
    color: #007BFF;
}

.user-detail p {
    margin: 0;
}

.previous-button {
    background-color: #007BFF;
    color: #fff;
    margin-right: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.next-button {
    background-color: #007BFF;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.previous-button:hover,
.next-button:hover {
    background-color: #0056b3;
}
</style>
  
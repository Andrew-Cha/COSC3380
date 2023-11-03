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
        <h2>User Information</h2>
        <div class="user-information">
            <p>Name: {{ user.name }}</p>
            <p>Registration Date: {{ user.registration }}</p>
        </div>
    </div>
</template>
  
<style scoped>
.profile-page {
    text-align: center;
    margin: 20px;
}

.user-info {
    border: 1px solid #ffffff;
    padding: 10px;
    margin: 10px;
}

.previous-button {
    background-color: rgb(212, 250, 244);
    color: #fff;
    margin-right: 10px;
}

.next-button {
    background-color: rgb(212, 250, 244);
    color: #fff;
}
</style>
  

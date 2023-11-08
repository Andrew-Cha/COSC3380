<script setup>
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore()
const { user } = storeToRefs(mainStore)

</script>


<template>
    <div class="user-profile-page">
        <h2 class="page-title">Your Information</h2>
        <div class="user-information">
            <div class="user-detail">
                <strong>First Name:</strong>
                <p>{{ user.first_name }}</p>
            </div>
            <div class="user-detail">
                <strong>Last Name:</strong>
                <p>{{ user.last_name }}</p>
            </div>
            <div class="user-detail">
                <strong>Registration Date:</strong>
                <p>{{ user.registration_date }}</p>
            </div>
            <div class="user-detail">
                <strong>Role:</strong>
                <p v-if="user.role_id === 1">Customer</p>
                <p v-else-if="user.role_id === 2">Faculty</p>
                <p v-else-if="user.role_id === 3">Admin</p>
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
  
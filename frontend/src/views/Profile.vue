<script setup>
import { ref } from 'vue'

const user = ref({
    name: "John Smith",
    registration: "2023-10-31",
    identificationNumber: "012345",
    role_ID: "1",
})

function previousUser() {

}
function nextUser() {

}
</script>

<template>
    <div class="user-profile-page">
        <h2>User Information</h2>
        <button @click="previousUser" class="return-button">Previous</button>
        <button @click="nextUser" class="extend-button">Next</button>
        <div class="user-information">

            <p>Name: {{ user.name }}</p>
            <p>User ID: {{ user.identificationNumber }}</p>
            <p>Registration Date: {{ user.registration }}</p>
            <p> Role ID: {{ user.role_ID }}</p>
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
  
<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div class="welcome-page">
        <h1>Welcome to Our Cool Library!</h1>

        <section>
            <p>Check out these features on our website:</p>
            <ul class="feature-list">
                <li>
                    <router-link to="/library" class="big-button">Explore the Library</router-link>
                </li>
                <li>
                    <router-link to="/inventory" class="big-button">My Items</router-link>
                </li>
                <li>
                    <router-link to="/fines" class="big-button">My Fines</router-link>
                </li>
                <li>
                    <router-link to="/profile" class="big-button">My Profile</router-link>
                </li>
            </ul>
        </section>

        <h1>TODO List:</h1>
        <li>3x Reports on Admin page</li>
    </div>
</template>
  
<style scoped>
.welcome-page {
    text-align: center;
}

.feature-list {
    list-style: none;
    padding: 0;
}

.big-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-decoration: none;
    font-size: 18px;
    margin: 10px;
    transition: background-color 0.3s ease-in-out;
}

.big-button:hover {
    background-color: #0056b3;
}
</style>
  
<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import axios from 'axios'
import router from '../router';

const name = ref('')
const password = ref('')
const isLoggingIn = ref(true)

async function login() {
    console.log("here")
    const customer = {
        firstName: name.value,
        lastName: name.value,
        password: password.value
    }
    axios.post(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/customers/login`, customer)
        .then((response) => {
            console.log(response.data)
            console.log("test")
            window.alert("Logged in successfully.")
            localStorage.setItem('isLoggedIn', 'true')
            router.push('/')
        })
        .catch((error) => {
            window.alert("Could not log in.")
        });
}

function signup() {
    const customer = {
        firstName: name.value,
        lastName: name.value,
        password: password.value
    }
    axios.post(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/customers/create`, customer).then((response) => {
        window.alert("Created user successfully, please log in.")
    })
        .catch((error) => {
            window.alert("Could not create your user.")
        });
}
</script>

<template>
    <div class="auth-page">
        <div v-if="isLoggingIn" class="auth-form">
            <form class="form" action="" @submit.prevent="login">
                <h1>Login</h1>
                <div class="form-group">
                    <input type="text" placeholder="Username" v-model="name" />
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" v-model="password" />
                </div>
                <div class="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div class="toggle-action">
                <button @click="isLoggingIn = false">Create an account?</button>
            </div>
        </div>

        <div v-else class="auth-form">
            <form class="form" action="" @submit.prevent="signup">
                <h1>Sign Up</h1>
                <div class="form-group">
                    <input type="text" placeholder="Username" v-model="name" />
                </div>
                <div class="form-group">
                    <input type="password" placeholder="Password" v-model="password" />
                </div>
                <div class="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>
            <div class="toggle-action">
                <button @click="isLoggingIn = true">Already have an account?</button>
            </div>
        </div>
    </div>
</template>
  
<style scoped>
.auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
}

.auth-form {
    width: 320px;
    padding: 20px;
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.form {
    display: grid;
    gap: 15px;
    text-align: center;
}

.form-group {
    text-align: left;
}

input[type="text"],
input[type="password"] {
    text-align: center;
    width: 100%;
    padding: 10px 0px 10px 0px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    width: 100%;
    padding: 12px;
    background-color: #007BFF;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

button:hover {
    background-color: #0056b3;
}

.toggle-action {
    margin-top: 10px;
}
</style>
  
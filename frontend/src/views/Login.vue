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
    <div v-if="isLoggingIn == true" class="login">
        <form class="form" action="" @submit.prevent="login">
            <h1>
                Login
            </h1>
            <input type="text" placeholder="Username" v-model="name" />
            <input type="text" placeholder="Password" v-model="password" />
            <button type="submit">Login</button>
        </form>
        <button @click="isLoggingIn = false">Create an account?</button>
    </div>

    <div v-else="isLoggingIn == false" class="signup">
        <form class="form" action="" @submit.prevent="signup">
            <h1>
                Sign Up
            </h1>
            <input type="text" placeholder="Username" v-model="name" />
            <input type="text" placeholder="Password" v-model="password" />
            <button type="submit">Register</button>
        </form>
        <button @click="isLoggingIn = true">Already have an account?</button>
    </div>
</template>

<style scoped>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
}

.form {
    width: 300px;
    padding: 15px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
}

.footer {
    position: absolute;
    bottom: 0px;
    left: 10px;
}

.signup {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
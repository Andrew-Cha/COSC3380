<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import axios from 'axios'
import router from '../router';

const name = ref('')
const password = ref('')
const alert = ref('')
const textAlert = reactive({ text: '' })
const isLoggingIn = ref(false)

const users = ref([])
axios
    .get(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/users`)
    .then((response) => {
        users.value = response.data
    })
    .catch((error) => {
        console.error(error);
    });

async function login() {
    axios.post(`http://${import.meta.env.VITE_SERVER_URL}:3000/api/login`)
        .then((response) => {
            isLoggedIn.value = true
        })
        .catch((error) => {
            alert("Bad things happened")
        });
}

function setAlter() {
    localStorage.setItem('alter', 'true')
}

function signup() {
    if (name.value == "" || password.value == "") {
        console.log('404: Not Found')
        alert.value = 'error'
        textAlert.text = '404: Not Found'

    } else if (localStorage.name == null && localStorage.password == null) {
        localStorage.setItem('name', name.value)
        localStorage.setItem('password', password.value)
        localStorage.setItem('alter', false)

        alert.value = 'success'
        textAlert.text = 'Account created!'
        router.push('/')
    } else if (localStorage.alter == 'true') {
        localStorage.setItem('name', name.value)
        localStorage.setItem('password', password.value)
        localStorage.setItem('alter', false)

        alert.value = 'success'
        textAlert.text = 'Account created!'

        router.push('/')
    } else {
        alert.value = 'info'
        textAlert.text = 'You already have an account'
    }
}
</script>

<template>
    <div v-if="isLoggingIn == true" class="login">
        <div>
            <h1>
                Login
            </h1>
            <form class="form" action="" @submit.prevent="login">
                <input type="text" placeholder="Username" v-model="name" />
                <input type="text" placeholder="Password" v-model="password" />
                <button type="submit" label="Login" icon="pi pi-check" severity="help" />
                <div :severity="alert">{{ textAlert.text }}</div>
            </form>
            <button @click="isLoggingIn = false">Create an account?</button>
        </div>
    </div>

    <div v-else="isLoggingIn == false" class="signup">
        <div>
            <h1>
                Sign Up
            </h1>
            <form class="form" action="" @submit.prevent="signup">
                <input type="text" placeholder="Username" v-model="name" />
                <input type="text" placeholder="Password" v-model="password" />
                <button type="submit" label="Register" severity="help" class="button" />
                <div :severity="alert">{{ textAlert.text }}</div>
            </form>
            <button @click="isLoggingIn = true">Already have an account?</button>
        </div>
    </div>
    <div class="footer">
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
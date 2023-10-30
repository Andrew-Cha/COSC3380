<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import router from '../router';

const name = ref('')
const password = ref('')
const alert = ref('')
const textAlert = reactive({ text: '' })

function login() {
    if (name.value == "" || password.value == "") {
        console.log('404: Not Found')
        alert.value = 'error'
        textAlert.text = '404: Not Found'
    } else if (name.value == localStorage.name && password.value == localStorage.password) {
        localStorage.setItem('enter', 'true')

        alert.value = 'success'
        textAlert.text = 'Login...'
        router.push('/')
    } else {
        console.log('400: Bad Request')
        alert.value = 'error'
        textAlert.text = '400: Bad Request'
    }
}

function setAlter() {
    localStorage.setItem('alter', 'true')
}

</script>

<template>
    <div class="signup">
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
        </div>
    </div>
    <div class="footer">
    </div>
</template>

<style scoped>
.signup {
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
</style>
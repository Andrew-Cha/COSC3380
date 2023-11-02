<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import router from '../router';

const name = ref('')
const password = ref('')
const alert = ref('')
const textAlert = reactive({ text: '' })

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
    <div class="signup">
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
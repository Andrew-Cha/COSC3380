<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <div>
        <h1>Welcome to Our Cool Library!</h1>

        <body>
            Check out these things in our website:
            <ul>
                <li>
                    What we have available at the <RouterLink to="/library">Library</RouterLink>
                </li>
                <li>
                    What you have taken out or held at <RouterLink to="/inventory">My Items</RouterLink>
                </li>
                <li>
                    If you have any fines at <RouterLink to="/fines">My Fines</RouterLink>
                </li>
                <li>
                    Your information at <RouterLink to="/profile">My Profile</RouterLink>
                </li>
            </ul>
        </body>
    </div>
</template>

<style scoped>

</style>
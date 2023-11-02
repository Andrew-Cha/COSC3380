<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/library">Library</RouterLink>
        <RouterLink to="/inventory">My Items</RouterLink>
        <RouterLink to="/fines">My Fines</RouterLink>
        <RouterLink to="/profile">My Profile</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  background-color: gray;
  width: 100vw;
}
</style>

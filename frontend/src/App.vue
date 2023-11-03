<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="application">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink class="navbutton" to="/">Home</RouterLink>
          <RouterLink class="navbutton" to="/library">Library</RouterLink>
          <RouterLink class="navbutton" to="/inventory">My Items</RouterLink>
          <RouterLink class="navbutton" to="/fines">My Fines</RouterLink>
          <RouterLink class="navbutton" to="/profile">My Profile</RouterLink>
          <RouterLink class="navbutton" to="/login">Login</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-evenly;
  background-color: #75B8C8;
  width: 100vw;
  height: 40px;
  font-size: 20px;
  border-radius: 5px;
}

nav a {
  height: 30px;
  width: 100px;
  border: 2px;
  border-style: dashed;
  text-align: center;
}

.application {
  padding: 0px;
}
</style>

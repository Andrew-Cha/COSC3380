<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="application">
    <header>
      <nav class="main-header">
        <RouterLink class="navbutton" to="/">Home</RouterLink>
        <RouterLink class="navbutton" to="/library">Library</RouterLink>
        <RouterLink class="navbutton" to="/inventory">My Items</RouterLink>
        <RouterLink class="navbutton" to="/fines">My Fines</RouterLink>
        <RouterLink class="navbutton" to="/profile">My Profile</RouterLink>
        <RouterLink class="navbutton" to="/login">Login</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>
<style scoped>
.main-header {
  background-color: #77CBB9;
  padding: 15px 0;
  text-align: center;
  color: #fff;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.main-nav {
  display: flex;
  justify-content: center;
}

.navbutton {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
  margin: 0 10px;
}

.navbutton:hover {
  background-color: #0056b3;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  background-color: #CDD3D5;
}
</style>
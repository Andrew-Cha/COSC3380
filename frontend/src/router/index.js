import { createRouter, createWebHistory } from 'vue-router'
import Fines from '../views/Fines.vue'
import Library from '../views/Library.vue'
import UserInventory from '../views/UserInventory.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/inventory',
      name: 'My Items',
      component: UserInventory
    },
    {
      path: '/fines',
      name: 'My Fines',
      component: Fines
    },
    {
      path: '/library',
      name: 'Library',
      component: Library
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'My Profile',
      component: Profile
    }
  ]
})

router.beforeEach((to, from) => {
  document.title = to.name || "Library"
  if (localStorage.isLoggedIn != 'true' && to.name !== 'Login') {
    return '/login'
  }
})
export default router

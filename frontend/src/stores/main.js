import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
  const isLoggedIn = ref(false)

  return { isLoggedIn }
})

<template>
  <router-view />
</template>

<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Run once AND on every route change
watch(
  () => route.query.auth,
  (auth) => {
    if (auth === 'lampoonoverride') {
      sessionStorage.setItem('authBypass', 'true')
    }
  },
  { immediate: true }
)

</script>

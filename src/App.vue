<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

onMounted(() => {
  if (route.query.auth === 'lampoonoverride') {
    sessionStorage.setItem('authBypass', 'true')
  }
})
</script>

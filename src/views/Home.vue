<template data-color-mode="dark">
  <Navbar />
  <div class="pt-20 px-6">
    <h1 class="text-3xl font-bold text-center mb-6">🔥 Trending Markets</h1>
    <MarketList />
  </div>
  <Footer />
</template>

<script setup>
import Navbar from "../components/Navbar.vue";
import MarketList from "../components/MarketList.vue";
import Footer from "../components/Footer.vue";
</script>

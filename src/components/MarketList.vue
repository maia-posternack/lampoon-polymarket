<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <MarketCard v-for="market in markets" :key="market.id" :market="market" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import MarketCard from "./MarketCard.vue";
  import axios from "axios";
  
  const markets = ref([]);
  
  onMounted(async () => {
    const response = await axios.get("/api/markets"); 
    markets.value = response.data;
  });
  </script>
  
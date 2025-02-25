<template>
  <Navbar />
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <router-link to="/" class="text-blue-500 hover:underline">&larr; Back</router-link>

    <img :src="market.image" class="w-full h-60 object-cover rounded-lg mt-4" />

    <h1 class="text-2xl font-bold mt-4">{{ market.question }}</h1>

    <div class="text-gray-500 text-sm mt-2">
      <p>📊 Market Volume: <strong>{{ market.volume }}</strong></p>
      <p>💰 Liquidity: <strong>{{ market.liquidity }}</strong></p>
    </div>

    <div class="flex justify-between mt-6">
      <button class="px-6 py-3 bg-green-500 text-white font-bold rounded">Bet Yes ({{ market.odds.yes }}%)</button>
      <button class="px-6 py-3 bg-red-500 text-white font-bold rounded">Bet No ({{ market.odds.no }}%)</button>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

const route = useRoute();

const marketData = ref({
  1: { question: "Will Bitcoin hit $100k?", image: "/market1.jpg", odds: { yes: 60, no: 40 }, volume: "$1.2M", liquidity: "$500k" },
  2: { question: "Will Trump win 2024?", image: "/market2.jpg", odds: { yes: 55, no: 45 }, volume: "$900k", liquidity: "$400k" },
});

const market = computed(() => marketData.value[route.params.id]);
</script>

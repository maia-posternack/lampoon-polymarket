<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const markets = ref([
  { id: 1, question: "Will Bitcoin hit $100k in 2025?", odds: { yes: "60%", no: "40%" } },
  { id: 2, question: "Will Trump win in 2024?", odds: { yes: "55%", no: "45%" } },
]);

const goToMarket = (id) => {
  router.push(`/market/${id}`);
};
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <h1 class="text-3xl font-bold text-center mb-4">Spoof Polymarket</h1>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="market in markets"
        :key="market.id"
        class="p-4 bg-white rounded shadow cursor-pointer"
        @click="goToMarket(market.id)"
      >
        <h2 class="text-xl font-bold">{{ market.question }}</h2>
        <p class="text-gray-600">Yes: {{ market.odds.yes }}</p>
        <p class="text-gray-600">No: {{ market.odds.no }}</p>
      </div>
    </div>
  </div>
</template>

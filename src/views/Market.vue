<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const marketData = ref({
  1: { question: "Will Bitcoin hit $100k in 2025?", odds: { yes: 60, no: 40 } },
  2: { question: "Will Trump win in 2024?", odds: { yes: 55, no: 45 } },
});

const market = computed(() => marketData.value[route.params.id]);

const placeBet = (type) => {
  if (type === "yes") {
    market.value.odds.yes += 1;
    market.value.odds.no -= 1;
  } else {
    market.value.odds.no += 1;
    market.value.odds.yes -= 1;
  }
};
</script>

<template>
  <div class="p-8">
    <router-link to="/" class="text-blue-500">&larr; Back to Markets</router-link>
    <h1 class="text-3xl font-bold mt-4">{{ market.question }}</h1>
    <div class="mt-4">
      <button @click="placeBet('yes')" class="px-4 py-2 bg-green-500 text-white rounded">Bet Yes ({{ market.odds.yes }}%)</button>
      <button @click="placeBet('no')" class="px-4 py-2 bg-red-500 text-white rounded ml-2">Bet No ({{ market.odds.no }}%)</button>
    </div>
  </div>
</template>

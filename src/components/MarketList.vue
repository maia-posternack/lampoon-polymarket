<template>
  <div class="market-card-container">
    <MarketCard v-for="(market, index) in sortedMarkets" :key="index" :image="market.image" :title="market.title"
      :link="'/market/' + market.id" :odds="market.odds" :posterImage="market.posterImage"
      :posterName="market.posterName" :id="market.id" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import MarketCard from "./MarketCard.vue";

const props = defineProps({
  markets: {
    type: Array,
    required: true
  }
});

// Computed property to sort markets by date_posted in descending order
const sortedMarkets = computed(() => {
  return [...props.markets].sort((a, b) => new Date(b.date_posted) - new Date(a.date_posted));
});
</script>

<style scoped>
.market-card-container {
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 0px;
  width: 100%;
}

@media (max-width: 1000px) {
  .market-card-container {
    grid-template-columns: 1fr;
    column-gap: 0px;
    row-gap: 0px;
  }
}
</style>

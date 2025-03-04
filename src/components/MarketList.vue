<template>
  <div class="market-card-container">
    <MarketCard
      v-for="(market, index) in markets"
      :key="index"
      :image="market.image"
      :title="market.title"
      :link="market.link"
      :odds="market.odds"
      :posterImage="market.posterImage"
      :posterName="market.posterName"
    />
  </div>
</template>

<script setup>
import MarketCard from "./MarketCard.vue";

const markets = [
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "Trump ends Ukraine war in first 90 days",
    link: "/market",
    odds: "80",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "gnaialf,a,a,ll,flala",
  },
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "Trump ends Ukraine war in first 90 days",
    link: "/market",
    odds: "40",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "zerohedge",
  },
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "Trump ends Ukraine war in first 90 days",
    link: "/market",
    odds: "21",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "zerohedge",
  },
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "Trump ends Ukraine war in first 90 days",
    link: "/market",
    odds: "21",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "zerohedge",
  }
];
</script>

<style scoped>
.market-card-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Default: 3 cards per row */
  gap: 16px; /* Adds spacing between cards */
  width: 100%;
}

/* When screen width is less than 1000px, show only 1 card per row */
@media (max-width: 1000px) {
  .market-card-container {
    grid-template-columns: 1fr; /* 1 card per row */
  }
}
</style>

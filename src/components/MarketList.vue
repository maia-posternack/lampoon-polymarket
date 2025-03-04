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
    title: "example 1 this will probably happen",
    link: "/market",
    odds: "80",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "username1",
  },
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "example 2",
    link: "/market",
    odds: "27",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "username2",
  },
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "example 3",
    link: "/market",
    odds: "55",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "superlongusernamehere",
  },
  {
    image: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpolymarket-upload.s3.us-east-2.amazonaws.com%2Ftrump-wins-ends-ukraine-war-in-90-days-V1Cr3I7aFmnD.jpg&w=96&q=75",
    title: "example 4 super duper unlikely but u should bet anyway",
    link: "/market",
    odds: "21",
    posterImage: "https://polymarket.com/_next/image?url=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F72647502%2Ftyler_400x400.jpg&w=96&q=75",
    posterName: "himynameismaia",
  }
];
</script>

<style scoped>
.market-card-container {
  margin-top: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Default: 3 cards per row */
  column-gap: 16px; /* Spacing between columns (side-by-side cards) */
  row-gap: 0px; /* Reduced spacing between rows (top-to-bottom) */
  width: 100%;
}

/* When screen width is less than 1000px, show only 1 card per row */
@media (max-width: 1000px) {
  .market-card-container {
    grid-template-columns: 1fr; /* 1 card per row */
    column-gap: 0px; /* No side spacing needed for single-column layout */
    row-gap: 0px; /* Keep reduced row spacing */
  }
}

</style>

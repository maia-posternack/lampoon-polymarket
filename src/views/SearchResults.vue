<template data-color-mode="dark">
  <Navbar />
  <div class="content">
    <SearchBar />
    <MarketList :markets="filteredMarkets" />
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/firebase"; // Adjust as needed
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar.vue";
import SearchBar from "@/components/SearchBar.vue";
import MarketList from "../components/MarketList.vue";
import Footer from "../components/Footer.vue";

const markets = ref([]);
const route = useRoute();

const fetchMarkets = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "markets"));
    markets.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      odds: calculateOdds(doc.data().yesVotes, doc.data().noVotes),
    })).filter(market => market.tag?.toLowerCase() !== "lampoon"); // Exclude if tag is "lampoon"

  } catch (error) {
    console.error("❌ Error fetching markets:", error);
  }
};

const calculateOdds = (yesVotes, noVotes) => {
  const totalVotes = yesVotes + noVotes;
  return totalVotes === 0 ? "50" : ((yesVotes / totalVotes) * 100).toFixed(0);
};

// Compute filtered markets based on search query
const filteredMarkets = computed(() => {
  const query = route.query.query?.toLowerCase() || "";
  return markets.value.filter(market => market.title.toLowerCase().includes(query));
});

// Refetch markets when page loads
onMounted(fetchMarkets);

// Re-filter when the route query changes (e.g., new search)
watch(() => route.query.query, fetchMarkets);
</script>

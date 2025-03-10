<template>
  <Navbar />
  <div class="content">
    <MarketList :markets="markets" />
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase"; // Adjust the import path based on your project
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar.vue";
import MarketList from "../components/MarketList.vue";
import Footer from "../components/Footer.vue";

const markets = ref([]);

const fetchMarkets = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "markets"));
    markets.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      odds: calculateOdds(doc.data().yesVotes, doc.data().noVotes),
    }));
    console.log("OUR DOC ID", markets);
  } catch (error) {
    console.error("❌ Error fetching markets:", error);
  }
};

const calculateOdds = (yesVotes, noVotes) => {
  const totalVotes = yesVotes + noVotes;
  return totalVotes === 0 ? "50" : ((yesVotes / totalVotes) * 100).toFixed(0);
};

onMounted(fetchMarkets);
</script>

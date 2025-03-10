<template data-color-mode="dark">
  <div class="page-wrapper">
    <Navbar />
    <div class="content">
      <MarketButton />
      <SearchBar />
      <MarketList :markets="filteredMarkets" />
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import MarketButton from '@/components/MarketButton.vue';
import MarketList from '@/components/MarketList.vue';
import Footer from '@/components/Footer.vue';
import SearchBar from '@/components/SearchBar.vue';
import { db } from '@/firebase'; // Adjust the import path based on your project
import { collection, getDocs } from 'firebase/firestore';

const markets = ref([]);

// Function to fetch all markets from Firestore
const fetchMarkets = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'markets'));
    markets.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      odds: calculateOdds(doc.data().yesVotes, doc.data().noVotes),
    }));
  } catch (error) {
    console.error('❌ Error fetching markets:', error);
  }
};

// Function to calculate odds based on votes
const calculateOdds = (yesVotes, noVotes) => {
  const totalVotes = yesVotes + noVotes;
  return totalVotes === 0 ? '50' : ((yesVotes / totalVotes) * 100).toFixed(0);
};

// Computed property to filter out markets with the 'Lampoon' tag
const filteredMarkets = computed(() => {
  return markets.value.filter(market => market.tag !== 'Lampoon');
});

// Fetch markets when the component is mounted
onMounted(fetchMarkets);
</script>

<style>
/* 🔥 Keep Navbar Fixed and Always on Top */
.sticky {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: #333 !important;
  padding: 15px;
  text-align: center;
  z-index: 10000 !important; /* Keep it above all content */
  isolation: isolate;
}

/* 🔥 Make Body Scroll Normally */
body {
  overflow-x: hidden;
  overflow-y: auto; /* Allow scrolling */
  margin: 0;
}

/* 🔥 Allow Content to Scroll But Never Overlap Navbar */
.content {
  position: relative !important;
  z-index: 1 !important;
  padding: 10px !important;
  padding-top: 110px !important; /* Ensures content starts below navbar */
  padding-bottom: 70px !important; /* Ensures content ends above footer */
}
</style>

<template data-color-mode="dark">
    <Navbar />
    <div class="content">
      <PasswordPrompt v-if="requiresAuth && !isAuthenticated" @authenticated="handleAuthentication" />
      <MarketList v-else :markets="filteredMarkets" />
    </div>
    <Footer />
  </template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';
import MarketList from '@/components/MarketList.vue';
import Footer from '@/components/Footer.vue';
import PasswordPrompt from '@/components/PasswordPrompt.vue';

import { db } from '@/firebase'; // Adjust the import path based on your project
import { collection, getDocs } from 'firebase/firestore';

const route = useRoute();
const markets = ref([]);
const tag = route.params.tag;
const isAuthenticated = ref(false);

// Determine if the current route requires authentication
const requiresAuth = computed(() => tag === 'lampoon');

// Function to handle successful authentication
const handleAuthentication = (status) => {
  isAuthenticated.value = status;
};


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

// Computed property to filter markets based on the tag
const filteredMarkets = computed(() => {
    const tagMapping = {
        'lampoon': 'Lampoon',
        'final-clubs': 'Final Clubs',
        'professors': 'Professors',
        'other': 'Other',
    };
    const tagName = tagMapping[tag.toLowerCase()] || '';
    if (tagName === '') {
    // If no specific tag is provided, return all markets except those with the 'Lampoon' tag
    return markets.value.filter(market => market.tag !== 'Lampoon');
  } else {
    // Otherwise, return markets that match the specified tag
    return markets.value.filter(market => market.tag === tagName);
  }
});

// Fetch markets when the component is mounted
onMounted(fetchMarkets);
</script>
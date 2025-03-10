<template data-color-mode="dark">
  <Navbar />
  <div class="wallet-container content">
    <!-- Top Section -->
    <div class="wallet-header">
      <div class="username">@{{ username || "" }}</div>
      <div class="balance">
        <div class="cash">${{ currentCash?.toFixed(2) || "0.00" }}</div>
        <div class="harvybucks"> Users begin with $500 Harvybucks</div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="black" d="M16.97 4.757a.999.999 0 0 0-1.918-.073l-3.186 9.554l-2.952-6.644a1.002 1.002 0 0 0-1.843.034L5.323 12H2v2h3.323c.823 0 1.552-.494 1.856-1.257l.869-2.172l3.037 6.835c.162.363.521.594.915.594l.048-.001a1 1 0 0 0 .9-.683l2.914-8.742l.979 3.911A1.995 1.995 0 0 0 18.781 14H22v-2h-3.22z"></path>
          </svg>
        </div>
        <div class="stat-label">Positions Value</div>
        <div class="stat-value">${{ positionsValue }}</div>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="black" d="m10 10.414l4 4l5.707-5.707L22 11V5h-6l2.293 2.293L14 11.586l-4-4l-7.707 7.707l1.414 1.414z"></path>
          </svg>
        </div>
        <div class="stat-label">Profit/Loss</div>
        <div class="stat-value">${{ profitLoss }}</div>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="black" d="M9 6h2v14H9zm4 2h2v12h-2zm4-4h2v16h-2zM5 12h2v8H5z"></path>
          </svg>
        </div>
        <div class="stat-label">Volume Traded</div>
        <div class="stat-value">${{ volumeTraded }}</div>
      </div>

      <div class="stat-item">
        <div class="stat-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="black" d="m2.394 13.742l4.743 3.62l7.616-8.704l-1.506-1.316l-6.384 7.296l-3.257-2.486zm19.359-5.084l-1.506-1.316l-6.369 7.279l-.753-.602l-1.25 1.562l2.247 1.798z"></path>
          </svg>
        </div>
        <div class="stat-label">Markets Traded</div>
        <div class="stat-value">{{ marketsTraded }}</div>
      </div>
    </div>

    <!-- Purchases List -->
    <div class="purchases">
      <h2>Purchases</h2>
      <div v-for="bet in sorted_bets" :key="bet.id" class="bet-item">
        <img :src="bet.image" alt="Market Image" class="bet-image" />
        <div class="bet-details">
          <div class="bet-title">{{ bet.title }}</div>
          <div class="bet-amount">Amount:  <span> ${{ bet.amount }}</span></div>
    <div class="bet-win">Potential Win:  <span> {{ bet.potential_win }}</span></div>

      
        </div>
      </div>
    </div>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { db } from "@/firebase"; // Adjust path to your Firebase setup
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { authStore } from "@/stores/authStore"; // Adjust based on your auth store
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

// Reactive state
const username = ref("");
const currentCash = ref(0);
const currentBets = ref([]);
const marketsData = ref(new Map()); // Store market data for quick lookup

// Fetch user data from Firestore
const fetchUserData = async () => {
  try {
    const user = authStore.currentUser;
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data();
      username.value = userData.username;
      currentCash.value = userData.current_cash;
      currentBets.value = userData.current_bets || [];
    }
  } catch (error) {
    console.error("❌ Error fetching user data:", error);
  }
};

// Fetch all markets from Firestore and store in a Map
const fetchMarketsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "markets"));
    const marketsMap = new Map();
    
    querySnapshot.forEach(doc => {
      marketsMap.set(doc.id, doc.data());
    });

    marketsData.value = marketsMap;
  } catch (error) {
    console.error("❌ Error fetching markets:", error);
  }
};

const profitLoss = computed(() => {
  return (parseFloat(positionsValue.value) - parseFloat(volumeTraded.value)).toFixed(2);
});
const sorted_bets = computed(() => {
  return [...currentBets.value].sort((a, b) => b.timestamp - a.timestamp);
});

// ✅ Compute total positions value
const positionsValue = computed(() => {
  if (!currentBets.value.length || !marketsData.value.size) return 0;

  let totalValue = 0;

  currentBets.value.forEach(bet => {
    const market = marketsData.value.get(bet.market_id);
    if (!market) return; // Skip if market data is missing
    console.log(market);
    const { yesVotes = 0, noVotes = 0 } = market;
    const totalVotes = yesVotes + noVotes;
    if (totalVotes === 0) return; // Avoid division by zero

    let multiple = 0;
    if (bet.bet_type === "yes") {
      multiple = 1 / (yesVotes / (totalVotes));
    } else if (bet.bet_type === "no") {
      multiple = 1-(1 / (noVotes / (totalVotes)));
    }

    console.log(bet.bet_type, multiple, bet.amount);
    totalValue += multiple * bet.amount;
  });

  return totalValue.toFixed(2);
});

// ✅ Computed property to get the number of markets traded
const marketsTraded = computed(() => currentBets.value.length);

// ✅ Computed property to calculate total volume traded (sum of all bet amounts)
const volumeTraded = computed(() => 
  currentBets.value.reduce((total, bet) => total + (bet.amount || 0), 0)
);

// Fetch data when component mounts
onMounted(async () => {
  await fetchUserData();
  await fetchMarketsData();
});
</script>



<style>

.wallet-container {
  padding: 20px;
  color: white;
}

/* 🛠 Align username with "Harvybucks" */
.wallet-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end; /* Align items to the bottom */
  font-size: 20px;
  font-weight: bold;
}

/* 💰 Balance & Harvybucks Styling */
.balance {
  text-align: right;
}

.cash {
  font-size: 24px;
  font-weight: bold;
}

.harvybucks {
  font-size: 12px; /* Smaller */
  font-style: italic; /* Italic */
  color: gray; /* Subtle */
  font-family: OpenSauceSans-Regular, sans-serif !important; /* Custom font */
  font-weight: 400; /* Regular */
}

/* 📈 Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 20px;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
}



.stat-icon {
  background: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 10px;
}

.stat-label {
  font-size: 14px;
  color: gray;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
}

/* 🛒 Purchases Section */
.purchases {
  margin-top: 30px;
}

.purchases h2 {
  font-size: 20px; /* Bigger */
  font-family: "OpenSauceSans-Bold", sans-serif;
  font-weight: 700;
}

/* 🎟️ Bet Item */
.bet-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}



/* 📸 Bet Image */
.bet-image {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-right: 15px;
  object-fit: cover;
}

/* 🔹 Bet Title (Semi-Bold) */
.bet-title {
  font-weight: 600;
  font-family: "OpenSauceSans-SemiBold", sans-serif;
  font-size: 16px;
}



/* 💰 Amount: Bold Label, Regular Value */
/* 💰 Amount & Potential Win: Proper Spacing */
/* 💰 Amount & Potential Win: Label and Value Inline */
/* 💰 Amount & Potential Win: Separate Lines */
.bet-amount,
.bet-win {
  font-weight: 600; /* Make the label bold */
  font-size: 12px;
  display: block; /* Ensures each label is on a new line */
}

/* Keep Label & Value Inline */
.bet-amount span,
.bet-win span {
  font-weight: 400 !important; /* Make the value regular weight */
  font-family: inherit !important; /* Prevents unintended inheritance */
  margin-left: 3px; /* Ensure proper spacing between label & value */
}

</style>

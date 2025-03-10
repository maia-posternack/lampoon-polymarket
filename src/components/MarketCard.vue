<template>
  <div class="card" :class="{ 'buying-mode': isBuying }">

    <!-- BUYING UI TAKES OVER THE ENTIRE CARD -->
    <div v-if="isBuyingYes || isBuyingNo" class="buying-container">
      <div class="card-header">
        <div class="image-container">
          <img :src="image" :alt="title" class="card-image" />
        </div>
        <div class="buying-title">
          <a :href="link" class="card-title">{{ title }}</a>
          <div class="close-button" @click="closeBuying">✕</div>
        </div>
      </div>

      <div class="card-edit-body">
        <div class="input-and-slider">
          <div class="buying-input-container">
            $
            <input type="number" v-model="betAmount" placeholder="0" class="bet-input"
              :class="{ 'error-input': showCashAlert }" />
            <p v-if="showCashAlert" class="cash-alert">
              Not enough cash, brokie
            </p>
          </div>

          <!-- SLIDER CONTROL -->
          <div class="bet-slider">
            <input type="range" v-model="betAmount" min="0" max="100" step="1" class="slider">
          </div>
        </div>



        <div class="buying-actions">
          <button v-if="isBuyingYes" class="buy-confirm buy-yes-btn" @click="confirmPurchase('yes')">
            <span class="confirm-text">Buy Yes</span>
            <span class="win-text">To win {{ potentialWinYes }}</span>
          </button>

          <button v-if="isBuyingNo" class="buy-confirm buy-no-btn" @click="confirmPurchase('no')">
            <span class="confirm-text">Buy No</span>
            <span class="win-text">To win {{ potentialWinNo }}</span>
          </button>

        </div>
      </div>
    </div>

    <!-- ORIGINAL CARD ONLY SHOWS IF NOT BUYING -->
    <div v-else>
      <div class="card-header">
        <div class="image-container">
          <img :src="image" :alt="title" class="card-image" />
        </div>
        <div class="card-content">
          <a :href="link" class="card-title">{{ title }}</a>
          <div class="odds-container">
            <svg class="odds-graphic" width="58" height="29" viewBox="-29 -29 58 29">
              <path d="M -29.001 0 A 29 29 0 1 1 29 0" fill="none" stroke="#858D92" stroke-width="4"></path>
              <path :d="oddsPath" fill="none" :stroke="odds < 50 ? '#E64800' : '#27ae60'" stroke-opacity="0.8155"
                stroke-width="4">
              </path>
            </svg>
            <div class="odds-text">
              <p>{{ odds }}%</p>
              <p>chance</p>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div class="buy-button-container">
          <button class="buy-button buy-yes" @click="startBuying('yes')">
            <div class="buy-button-content">
              <span>Buy Yes</span>
              <div class="buy-button-icons">
                <div class="arrow-icon">
                  <div class="arrow-icon">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18px"
                      width="18px" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 12L12 6L18 12L16.5 13.5L12 9L7.5 13.5Z"></path>
                      <path d="M6 18L12 12L18 18L16.5 19.5L12 15L7.5 19.5Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <button class="buy-button buy-no" @click="startBuying('no')">
            <div class="buy-button-content">
              <span>Buy No</span>
              <div class="buy-button-icons">
                <span class="arrow-icon">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="18px"
                    width="18px" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L12 12L18 6L16.5 4.5L12 9L7.5 4.5Z"></path>
                    <path d="M6 12L12 18L18 12L16.5 10.5L12 15L7.5 10.5Z"></path>
                  </svg>
                </span>
              </div>
            </div>
          </button>
        </div>

        <div class="poster-info">
          <img :src="posterImage" :alt="posterName" class="poster-image" />
          <p>{{ posterName }}</p>
        </div>
      </div>
    </div>

  </div>
  <LoginModal v-if="isModalOpen" @close="isModalOpen = false" />

</template>


<script>
import { ref, computed } from "vue";
import LoginModal from "@/components/LoginModal.vue"; // ✅ Ensure import
import { authStore } from "@/stores/authStore"; // ✅ Import global auth state
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Ensure you have the correct import for Firestore

const isModalOpen = ref(false); // ✅ Control login modal visibility


const isBuyingYes = ref(false);
const isBuyingNo = ref(false);
const betAmount = ref(10);



export default {
  props: {
    image: String,
    title: String,
    link: String,
    odds: Number,
    posterImage: String,
    posterName: String,
    id: String
  },
  components: {
    LoginModal,
  },
  data() {
    return {
      isBuyingYes: false, // Tracks Buy Yes state
      isBuyingNo: false,  // Tracks Buy No state
      betAmount: 10,
      isModalOpen: false, // Controls LoginModal visibility
      showCashAlert: false,
    };
  },
  computed: {
    potentialWinYes() {
      const decimalOdds = 1 / (this.odds / 100); // Buy Yes odds
      return `$${(this.betAmount * decimalOdds).toFixed(2)}`;
    },
    potentialWinNo() {
      const decimalOdds = 1 / ((1 - this.odds / 100)); // Buy No odds
      return `$${(this.betAmount * decimalOdds).toFixed(2)}`;
    },

    oddsPath() {
      const percentage = 1 - this.odds / 100;
      const angle = percentage * 180;
      const x = 29 * Math.cos((angle * Math.PI) / 180);
      const y = -29 * Math.sin((angle * Math.PI) / 180);
      return `M -29 0 A 29 29 0 0 1 ${x} ${y}`;
    }
  },
  methods: {
    addAmount(amount) {
      this.betAmount += amount;
    },
    startBuying(type) {
      if (!authStore.currentUser) {
        console.log("🔒 User not logged in. Showing login modal.");
        this.isModalOpen = true; // Show login modal
        return;
      }
      if (type === "yes") {
        this.isBuyingYes = true;
        this.isBuyingNo = false;
        console.log("Buying Yes");
      } else {
        this.isBuyingNo = true;
        this.isBuyingYes = false;
        console.log("Buying No");
      }
    },
    closeBuying() {
      this.isBuyingYes = false;
      this.isBuyingNo = false;
      console.log("Closing buying UI");
    },
    async confirmPurchase(type) {
  const user = authStore.currentUser;
  const betAmount = this.betAmount;

  if (!user) {
    console.error("❌ No user logged in.");
    return;
  }

  // ✅ Fetch latest user data from Firestore instead of relying on `authStore.currentUser`
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.error("❌ User document does not exist.");
    return;
  }

  const userData = userSnap.data(); // ✅ Get up-to-date user data
  console.log("Fetched User Data:", userData);

  if (!userData.current_cash) {
    console.warn("⚠️ current_cash is missing or undefined. Setting it to 0.");
    userData.current_cash = 0; // ✅ Prevents NaN issues
  }

  if (betAmount > userData.current_cash) {
    console.warn("❌ Not enough cash.");
    this.showCashAlert = true; // ✅ Show alert
    return;
  }

  this.showCashAlert = false; // ✅ Hide alert if they have enough money

  const bet = {
    market_id: this.id,
    bet_type: type,
    amount: betAmount,
    potential_win: type === "yes" ? this.potentialWinYes : this.potentialWinNo,
    timestamp: new Date().toISOString(),
    title: this.title,
    image: this.image
  };

  console.log("✅ Placing bet:", bet);

  try {
    // ✅ Update user data
    const updatedBets = [...(userData.current_bets || []), bet];
    const updatedCash = userData.current_cash - betAmount;

    // ✅ Prevent NaN or negative values
    if (isNaN(updatedCash) || updatedCash < 0) {
      console.error("❌ Invalid cash calculation, preventing update.");
      return;
    }

    // ✅ Update Firestore with the new bet and cash balance
    await updateDoc(userRef, {
      current_bets: updatedBets,
      current_cash: updatedCash,
    });

    console.log("✅ Bet placed successfully. New cash balance:", updatedCash);

    // ✅ Update market votes
    const marketRef = doc(db, "markets", this.id);
    const marketSnap = await getDoc(marketRef);

    if (!marketSnap.exists()) {
      console.error("❌ Market does not exist.");
      return;
    }

    const marketData = marketSnap.data();
    const updatedVotes = type === "yes"
      ? (marketData.yesVotes || 0) + betAmount
      : (marketData.noVotes || 0) + betAmount;

    await updateDoc(marketRef, {
      [type === "yes" ? "yesVotes" : "noVotes"]: updatedVotes,
    });

    console.log("✅ Market updated successfully.");

    this.$router.push("/wallet"); // ✅ Redirect to wallet page

  } catch (error) {
    console.error("❌ Error placing bet:", error);
    alert("Error placing bet. Check console.");
  }
}




  }

}


</script>

<style scoped>
@font-face {
  font-family: "OpenSauceSans-Bold";
  src: url("fonts/OpenSauceSans-Bold.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "OpenSauceSans-Medium";
  src: url("fonts/OpenSauceSans-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "OpenSauceSans-SemiBold";
  src: url("fonts/OpenSauceSans-SemiBold.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

.input-and-slider {
  transform: translateY(10px);

  display: flex;
  align-items: center;
  gap: 10px;
  /* Space between input and slider */
  width: 100%;
}

.card-edit-body {
  padding-left: 8px !important;
  padding-right: 8px !important;

}

.buy-confirm {
  transform: translateY(20px);
  /* Moves it down by 10px */
  ;
  background-color: rgb(39, 174, 96);
  color: rgb(255, 255, 255);
  width: 100%;
  /* Makes it take the full width */
  padding: 8px 1px;
  border: none;
  border-radius: 8px;
  text-align: center;
  font-size: 14px !important;
  font-family: OpenSauceSans-Medium !important;
  display: flex;
  flex-direction: column;
  /* Stacks text on separate rows */
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.buy-yes-btn {
  background-color: rgb(39, 174, 96);
  color: rgb(255, 255, 255);
}

.buy-yes-btn:hover {
  opacity: 0.85;
}

.buy-no-btn {
  background-color: rgb(230, 72, 0);
  /* Red color for Buy No */
  color: rgb(255, 255, 255);
}

.buy-no-btn:hover {
  opacity: 0.85;
}

.buy-confirm:hover {
  opacity: 0.85;
  /* Slightly less opaque */
}

/* Ensures stacked text alignment */
.confirm-text {
  font-size: 14px;
}

.win-text {
  font-size: 11px;
  opacity: 0.8;
  /* Slightly faded for clarity */
}


.bet-slider {
  flex-grow: 1;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 6px;
  background: rgb(52, 68, 82);
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

/* Style the slider thumb */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.bet-input {
  background-color: rgb(29, 43, 57);
  /* Matches .buying-input-container */
  color: white;
  border: none;
  outline: none;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  -moz-appearance: textfield;
  /* Removes arrows in Firefox */
}

/* Removes up/down arrows in Chrome, Safari, Edge, Opera */
.bet-input::-webkit-outer-spin-button,
.bet-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Ensures arrows are gone in Firefox */
.bet-input[type="number"] {
  -moz-appearance: textfield;
}


.buying-input-container {
  align-items: center;
  align-self: center;
  appearance: auto;
  background-attachment: scroll;
  background-clip: border-box;
  background-color: rgb(29, 43, 57);
  background-image: none;
  background-origin: padding-box;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-size: auto;
  border-bottom-color: rgb(52, 68, 82);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgb(52, 68, 82);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: rgb(52, 68, 82);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(52, 68, 82);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: text;
  direction: ltr;
  display: flex;
  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
  font-size: 14px;
  font-size-adjust: none;
  font-stretch: 100%;
  font-style: normal;
  font-variant-alternates: normal;
  font-variant-caps: normal;
  font-variant-east-asian: normal;
  font-variant-emoji: normal;
  font-variant-ligatures: normal;
  font-variant-numeric: normal;
  font-variant-position: normal;
  font-variation-settings: normal;
  font-weight: 400;
  height: 40px;
  justify-content: flex-start;
  letter-spacing: normal;
  line-height: 16.1px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  outline-color: rgb(255, 255, 255);
  outline-style: none;
  outline-width: 0px;
  overflow-clip-margin: 0px;
  overflow-x: clip;
  overflow-y: clip;
  padding-block-end: 16px;
  padding-block-start: 16px;
  padding-bottom: 16px;
  padding-inline-end: 10px;
  padding-inline-start: 10px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 16px;
  text-align: left;
  text-indent: 0px;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: none;
  transition-behavior: normal;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  user-select: none;
  width: 70%;
  /* Increase input size */
  flex-grow: 2;
  /* Makes input take more space */
  word-spacing: 0px;
  -webkit-rtl-ordering: logical;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-border-image: none;
}


.card {
  margin-top: 4px;
  margin-bottom: 4px;
  padding: 5px;
  width: 100%;
  background-color: rgb(44, 63, 79);
  border-bottom-color: rgb(52, 68, 82);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgb(52, 68, 82);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: rgb(52, 68, 82);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgb(52, 68, 82);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 3px 6px 0px,
    rgba(0, 0, 0, 0.02) 0px 6px 12px 0px;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  direction: ltr;
  display: flex;
  flex-direction: column;
  font-family: OpenSauceSans-Bold;
  height: 175px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-top: 12px;
  position: relative;
  text-size-adjust: 100%;
  transition-behavior: normal, normal;
  transition-delay: 0s, 0s;
  transition-duration: 0.1s, 0.1s;
  transition-property: box-shadow, background-color;
  transition-timing-function: ease, ease;
  unicode-bidi: isolate;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.card {
  transition: background-color 0.2s ease-in-out;
  /* Smooth transition effect */
}

.cash-alert {
  color: rgb(230, 72, 0);
  font-size: 12px;
  margin-top: 4px;
  text-align: block;
  width: 100%;
  /* Ensures it spans the input box width */

}



.card:hover {
  background-color: #435463;
  /* Changes background on hover */
}

.card-header {
  align-items: flex-start;
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  column-gap: 8px;
  direction: ltr;
  display: flex;
  font-family: OpenSauceSans-Bold;
  height: 42px;
  max-height: 42px;
  min-height: 42px;
  padding-left: 12px;
  padding-right: 12px;
  position: relative;
  row-gap: 8px;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: 100%;
  z-index: 3;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.image-container {
  width: 38px;
  height: 38px;
  border-radius: 4px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  display: flex;
  flex-direction: column;
  /* Stack elements (title & odds-container) */
  align-items: flex-start;
  justify-content: space-between;
  /* Ensures space between title & odds-container */
  gap: 8px;
  /* Keeps spacing consistent */
  width: 100%;
  /* Ensures it spans full width */
}

.card-title {
  max-width: calc(100% - 80px);
  /* Prevents it from touching odds-container */
  position: relative;
  text-decoration: none;
  color: white;
  overflow: hidden;
}

.odds-text p {
  margin: 0;
}

.card-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  /* Matches card padding */
  width: 100%;
  /* Ensures full width for the container */
}

.buy-button {
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.buy-yes {
  background: green;
  color: white;
}

.buy-no {
  background: red;
  color: white;
}

.poster-info {
  display: flex;
  align-items: center;
}

.poster-image {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.odds-container {
  transform: translateY(-12px);
  /* Moves it up by 10px */
  position: absolute;
  top: 10px;
  right: 10px;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  cursor: default;
  direction: ltr;
  display: flex;
  height: 68px;
  justify-content: flex-end;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: auto;
  height: auto;
  padding: 5px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  column-gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Centers items horizontally */
  justify-content: center;
  /* Centers content within container */
  overflow: visible;
}

.odds-graphic {
  color: rgba(0, 0, 0, 0.8);
  cursor: default;
  overflow: visible;
  position: relative;
  direction: ltr;
  display: flex;
  font-family: __sauce_f5be8f, __sauce_Fallback_f5be8f;
  height: 29px;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: 58px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.poster-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
}

.odds-text {
  transform: translateY(-13px);
  /* Moves it up without affecting layout flow */
  box-sizing: border-box;
  color: rgb(252, 252, 252);
  cursor: default;
  direction: ltr;
  display: block;
  font-family: OpenSauceSans-Medium !important;
  font-size: 14px;
  font-weight: 500;
  height: 17.5px;
  letter-spacing: normal;
  line-height: 17.5px;
  margin-block-end: 0px;
  margin-block-start: 0px;
  margin-bottom: 0px;
  margin-inline-end: 0px;
  margin-inline-start: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  text-align: center;
  text-size-adjust: 100%;
  transition-behavior: normal;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  unicode-bidi: isolate;
  width: 28.8828px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-align: center;
  /* Centers text horizontally */
  width: 100%;
  /* Ensures it spans the container */
}

.odds-text p:last-child {
  margin: -2px;
  font-size: 11px;
  opacity: 0.5;
  color: rgb(252, 252, 252);
}

.card-footer {
  box-sizing: border-box;
  color: rgba(0, 0, 0, 0.8);
  column-gap: 8px;
  direction: ltr;
  display: flex;
  flex-direction: column;
  height: 124px;
  justify-content: flex-end;
  opacity: 1;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  row-gap: 8px;
  text-size-adjust: 100%;
  transform: matrix(1, 0, 0, 1, 0, 0);
  unicode-bidi: isolate;
  width: 100%;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.buy-button-container {
  display: flex;
  transform: translateY(-35px);
  /* Moves it up by 10px */
  gap: 8px;
  /* Keeps a small gap between buttons */
  width: 100%;
  /* Makes sure it fills the available space */
}

.buy-button {
  width: 100%;
  /* Allow it to take full container width */
  max-width: calc(100% - 12px);
  /* Ensure it doesn't exceed available space */
}

.buy-yes {
  background-color: #27ae60;
  color: white;
}

.buy-no {
  background-color: #e64800;
  color: white;
}

.buy-button-content {
  display: flex;
  align-items: center;
  gap: 5px;
}

.buy-button-icons {
  display: flex;
  gap: 4px;
}

.buy-button {
  align-items: center;
  appearance: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-style: none;
  border-left-width: 0px;
  border-right-style: none;
  border-right-width: 0px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-top-style: none;
  border-top-width: 0px;
  box-sizing: border-box;
  cursor: pointer;
  direction: ltr;
  display: flex;
  flex-basis: 0%;
  flex-grow: 1;
  flex-shrink: 1;
  font-family: OpenSauceSans-Medium !important;
  font-feature-settings: normal;
  font-kerning: auto;
  font-optical-sizing: auto;
  font-size: 14px;
  font-size-adjust: none;
  font-stretch: 100%;
  font-weight: 600;
  height: 36px;
  justify-content: center;
  letter-spacing: normal;
  line-height: 20px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-block-end: 0px;
  padding-block-start: 0px;
  padding-inline-end: 16px;
  padding-inline-start: 16px;
  padding-left: 16px;
  padding-right: 16px;
  text-align: start;
  text-indent: 0px;
  text-overflow: ellipsis;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: none;
  text-wrap-mode: nowrap;
  transition-behavior: normal, normal;
  transition-delay: 0s, 0s;
  transition-duration: 0.075s, 0.075s;
  transition-property: background-color, color;
  transition-timing-function: ease-in-out, ease-in-out;
  user-select: none;
  white-space-collapse: collapse;
  width: 289px;
  word-spacing: 0px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.buy-yes {
  background-color: rgba(39, 174, 96, 0.2);
  /* Green with 10% opacity */
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  color: rgb(39, 174, 96);
  /* Text stays fully visible */
}

.buy-yes:hover {
  background-color: rgb(39, 174, 96);
  /* Solid green on hover */
  color: rgb(255, 255, 255);
  /* Text turns white on hover */
}

.buy-no {
  background-color: rgba(230, 72, 0, 0.2);
  /* Green with 10% opacity */
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
  color: rgb(230, 72, 0);
  /* Text stays fully visible */
}

.buy-no:hover {
  background-color: rgb(230, 72, 0);
  /* Solid green on hover */
  color: rgb(255, 255, 255);
  /* Text turns white on hover */
}

.poster-info {
  align-items: center;
  background-color: rgba(45, 156, 219, 0.2);
  border-bottom-color: rgba(0, 0, 0, 0);
  border-bottom-left-radius: 500px;
  border-bottom-right-radius: 500px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgba(0, 0, 0, 0);
  border-left-style: solid;
  border-left-width: 1px;
  border-right-color: rgba(0, 0, 0, 0);
  border-right-style: solid;
  border-right-width: 1px;
  border-top-color: rgba(0, 0, 0, 0);
  border-top-left-radius: 500px;
  border-top-right-radius: 500px;
  border-top-style: solid;
  border-top-width: 1px;
  box-shadow: none;
  box-sizing: border-box;
  color: white;
  column-gap: 4px;
  cursor: pointer;
  direction: ltr;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  height: 24px;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-left: 2px;
  padding-right: 8px;
  row-gap: 4px;
  text-decoration-color: rgb(47, 128, 237);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-size-adjust: 100%;
  text-wrap-mode: nowrap;
  transition-behavior: normal, normal, normal;
  transition-delay: 0s, 0s, 0s;
  transition-duration: 0.1s, 0.2s, 0.1s;
  transition-property: box-shadow, border-color, transform;
  transition-timing-function: ease, ease, ease-in-out;
  white-space-collapse: collapse;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: OpenSauceSans-SemiBold;
}

.poster-info {
  width: auto;
  /* Allows the container to expand based on text length */
  min-width: fit-content;
  /* Ensures it only takes up as much space as needed */
  padding-left: 4px;
  /* Keeps left padding consistent */
  padding-right: 8px;
  /* Adds right padding for a balanced look */
}

.poster-info p,
.poster-info span {
  margin-left: -5px;
  /* Moves text 5px to the left */
}

.close-button {
  position: absolute;
  top: 0px;
  /* Move to the top */
  right: 8px;
  /* Move to the right */
  font-size: 16px;
  /* Make it smaller */
  color: white;
  /* Make it white */
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  line-height: 1;
  font-weight: bold;
  z-index: 20;
  /* Ensure it appears on top */
}
</style>

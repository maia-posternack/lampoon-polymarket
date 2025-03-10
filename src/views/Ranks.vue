<template data-color-mode="dark">
  <Navbar />
  <div class="ranks-container content">
    <!-- Big Leaderboard Title -->
    <h2>Leaderboard</h2>

    <!-- Profit Label with Blue Icon -->
    <div class="profit-label">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="rgb(45, 156, 219)">
        <path
          d="M21 4H3C2.73478 4 2.48043 4.10536 2.29289 4.29289C2.10536 4.48043 2 4.73478 2 5V19C2 19.2652 2.10536 19.5196 2.29289 19.7071C2.48043 19.8946 2.73478 20 3 20H21C21.2652 20 21.5196 19.8946 21.7071 19.7071C21.8946 19.5196 22 19.2652 22 19V5C22 4.73478 21.8946 4.48043 21.7071 4.29289C21.5196 4.10536 21.2652 4 21 4ZM20 15C19.2044 15 18.4413 15.3161 17.8787 15.8787C17.3161 16.4413 17 17.2044 17 18H7C7 17.2044 6.68393 16.4413 6.12132 15.8787C5.55871 15.3161 4.79565 15 4 15V9C4.79565 9 5.55871 8.68393 6.12132 8.12132C6.68393 7.55871 7 6.79565 7 6H17C17 6.79565 17.3161 7.55871 17.8787 8.12132C18.4413 8.68393 19.2044 9 20 9V15Z">
        </path>
        <path
          d="M12 8C9.794 8 8 9.794 8 12C8 14.206 9.794 16 12 16C14.206 16 16 14.206 16 12C16 9.794 14.206 8 12 8ZM12 14C10.897 14 10 13.103 10 12C10 10.897 10.897 10 12 10C13.103 10 14 10.897 14 12C14 13.103 13.103 14 12 14Z">
        </path>
      </svg>
      <span>Profit</span>
    </div>

    <!-- Leaderboard List -->
    <div class="leaderboard">
      <div v-for="(user, index) in rankedUsers" :key="user.id" class="leaderboard-item">
        <img :src="user.photo" alt="User Profile" class="profile-pic" />

        <div class="user-info">
          <span class="username">{{ user.username }}</span>
          <span class="profit">${{ user.profit.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { db } from "@/firebase"; // Adjust path based on your setup
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

// Reactive state
const users = ref([]);

// Fetch all users from Firestore and update profit
const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    const usersList = [];

    for (const docSnap of querySnapshot.docs) {
      const userData = docSnap.data();
      const userId = docSnap.id;

      // ✅ Directly pull `profit_loss` from Firestore
      const profit = parseFloat(userData.profit_loss || 0);

      usersList.push({
        id: userId,
        username: userData.username,
        photo: userData.photo, // Add profile pic if available
        profit: profit,
      });
    }

    users.value = usersList;
  } catch (error) {
    console.error("❌ Error fetching users:", error);
  }
};


// Computed property to sort users by profit (descending order)
const rankedUsers = computed(() => {
  return [...users.value].sort((a, b) => b.profit - a.profit);
});

// Fetch users when component mounts
onMounted(fetchUsers);
</script>

<style>
.ranks-container {
  margin-top: 20px;
  padding: 20px;
  color: white;
  text-align: center;
}

/* 🎖️ Leaderboard Title */
h2 {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 💰 Profit Label with Icon */
.profit-label {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.profit-label svg {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}

/* 🏆 Leaderboard List */
.leaderboard {
  max-width: 400px;
  margin: 0 auto;
}

/* 🏅 Leaderboard Item */
.leaderboard-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 10px;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.leaderboard-item:hover {
  transform: scale(1.02);
  box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
}

/* 👤 Profile Picture */
.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

/* 🏅 Username & Profit */
.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.username {
  font-weight: bold;
  font-size: 16px;
}

.profit {
  font-size: 14px;
  color: gray;
}
</style>
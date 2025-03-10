<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <h2 class="welcome">Welcome to Harvymarket</h2>
      <div class="smaller">
        Sign in using your Harvard College email address.
      </div>
      <button class="button-style signup google-btn" @click="signInWithGoogle">
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 488 512" class="google-icon"
          height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
          </path>
        </svg>
        Continue with Google
      </button>


    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase"; // Import Firestore & Auth
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { authStore } from "@/stores/authStore"; // ✅ Import global auth state
import { useRouter } from "vue-router"; // ✅ Import Vue Router

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async signInWithGoogle() {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const email = user.email;

        if (!email.endsWith("@college.harvard.edu")) {
          await auth.signOut();
          return;
        }

        console.log("✅ User signed in:", user);

        // Format username: remove spaces, convert to lowercase
        const username = user.displayName.replace(/\s+/g, "").toLowerCase();
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          // ✅ New User: Create Firestore Profile
          console.log("🆕 Creating new user profile...");
          await setDoc(userRef, {
            username: username,
            email: user.email,
            photo: user.photoURL,
            current_cash: 500, // ✅ Start with $500
            current_bets: [],
            created_markets: [],
            uid: user.uid,
            positions_value: 0,
            volume_traded: 0,
            profit_loss: 0,
          });


          console.log("✅ User profile created in Firestore.");
          authStore.setUser({ uid: user.uid, username, email: user.email, photo: user.photoURL });

          // ✅ Redirect to Wallet Page
          this.router.push("/wallet");
        } else {
          // ✅ Existing User: Just set currentUser
          console.log("🔄 Existing user detected.");
          const existingUser = userSnap.data();
          authStore.setUser(existingUser);
          this.router.push("/");

        }

        this.closeModal();
      } catch (error) {
        console.error("🔥 Error signing in:", error);
      }
    }
  }
};
</script>


<style scoped>
/* Modal Background (Darkens Rest of Page) */
.welcome {
  font-size: 24px;
  font-family: 'OpenSauceSans-SemiBold', sans-serif;
  margin-bottom: 10px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  /* Semi-transparent black */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  /* High z-index to stay on top */
}

/* Modal Box */
.modal-content {
  margin: 20px;

  background: rgb(29, 43, 57);
  /* Dark Blue */
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  color: white;
  width: 400px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  font-family: 'OpenSauceSans-SemiBold', sans-serif;
  font-size: 18px;
}

/* Google Button */
.google-btn {
  margin-top: 20px;
  width: 100%;
  cursor: pointer;
}

.google-btn {
  margin-top: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* Spacing between icon and text */
  width: 100%;
  cursor: pointer;
}

.google-icon {
  height: 20px;
  /* Adjust icon size */
  width: 20px;
  fill: white;
  /* Ensures it matches the text color */
}

.smaller {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 10px;
  font-family: 'OpenSauceSans-Regular', sans-serif;
}
</style>
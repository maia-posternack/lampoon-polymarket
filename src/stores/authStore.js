import { reactive, watchEffect } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase"; // Import Firebase auth

export const authStore = reactive({
  isSignedIn: false,  
  currentUser: null,  

  setUser(user) {
    this.isSignedIn = !!user;
    this.currentUser = user;
  },

  clearUser() {
    this.isSignedIn = false;
    this.currentUser = null;
  }
});

// ✅ Automatically update authStore when Firebase detects a logged-in user
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("✅ User restored:", user);
    authStore.setUser({ 
      uid: user.uid, 
      email: user.email, 
      photo: user.photoURL, // ✅ Ensure profile photo is included
      displayName: user.displayName
    });
  } else {
    console.log("❌ No user logged in.");
    authStore.clearUser();
  }
});

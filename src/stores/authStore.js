import { reactive } from "vue";

export const authStore = reactive({
  isSignedIn: false,  // ✅ Tracks if user is signed in
  currentUser: null,   // ✅ Stores user info
  setUser(user) {
    this.isSignedIn = !!user;
    this.currentUser = user;
  },
  clearUser() {
    this.isSignedIn = false;
    this.currentUser = null;
  }
});

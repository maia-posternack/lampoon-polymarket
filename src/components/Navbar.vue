<template>
  <nav id="__pm_mobile_top_nav" class="sticky top-top">
    <!-- Top Navigation -->
    <div class="all-nav">
      <!-- Logo -->
      <a href="/" class=" custom-link">
        <svg class="custom-logo" width="180" height="60" viewBox="0 0 210 30" fill="none">
   
        <text x="40" y="30"  fill="white">Harvymarket</text>

          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M30.6525 17.4069V0L0 8.6333V8.77358V29.2266V29.3668L30.6525 38.0001V20.5933V17.4069ZM27.6857 16.5713V3.8835L5.16277 10.2277L27.6857 16.5713ZM25.4849 19.0001L2.96678 12.6572V25.3429L25.4849 19.0001ZM5.16283 27.7724L27.6857 34.1166V21.4289L5.16283 27.7724Z"
            fill="white"></path>
        </svg>
      </a>

      <!-- Auth Buttons -->
      <div class="auth-section login-signup">
        <template v-if="!isSignedIn">
          <!-- Show Log In and Sign Up when not signed in -->
          <button class="button-style login" @click="openModal">Log In</button>
          <button class="button-style signup" @click="openModal">Sign Up</button>
        </template>
        <template v-else >
          <!-- Show User Photo & Logout when signed in -->
          <button class="button-style signup user-controls" @click="logout">Log Out</button>
          <img :src="currentUser.photo" alt="Profile" class="profile-pic user-controls" />

        </template>
      </div>
    </div>

    <!-- Navigation Links -->
    <div class="nav-css">
      <nav aria-label="Main">
        <ul class="list-holder">
          <li>
             <div class="live-container">
               <span>LIVE</span>
               <div class="live-indicator"></div>
             </div>
           </li>
          <li class="nav-item"><a href="/market/all" class="nav-item-click">All</a></li>
          <li class="nav-item"><a href="/market/lampoon" class="nav-item-click">Lampoon</a></li>
          <li class="nav-item"><a href="/market/final-clubs" class="nav-item-click">Final Clubs</a></li>
          <li class="nav-item"><a href="/market/professors" class="nav-item-click">Professors</a></li>
          <li class="nav-item"><a href="/market/other" class="nav-item-click">Other</a></li>
        </ul>
      </nav>
    </div>

    <LoginModal v-if="isModalOpen" @close="closeModal" />
  </nav>
</template>
  
<script>
import LoginModal from "@/components/LoginModal.vue";
import { auth } from "@/firebase"; // Import Firebase Auth
import { signOut } from "firebase/auth";
import { authStore } from "@/stores/authStore"; // Import global auth state

export default {
  components: {
    LoginModal,
  },
  computed: {
    isSignedIn() {
      return authStore.isSignedIn;
    },
    currentUser() {
      return authStore.currentUser;
    }
  },
  data() {
    return {
      isModalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async logout() {
      try {
        await signOut(auth);
        authStore.clearUser();
        console.log("✅ User logged out.");
      } catch (error) {
        console.error("🔥 Error logging out:", error);
      }
    }
  }
};
</script>


<style>

.custom-logo text {
    font-family: 'OpenSauceSans-Medium', sans-serif;
    font-size: 27px;
    font-weight: 600px;
}

.nav-item-click {
  font-family: '__sauce_f5be8f', '__sauce_Fallback_f5be8f', sans-serif;
  font-weight: 400;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  white-space: nowrap;
  border-bottom: 3px solid transparent;
  text-transform: capitalize;
  display: flex;
  line-height: 20px;
  font-size: 14px !important;
  padding: 0.4rem 0rem 0.8rem !important;
  padding: 0.5rem 1rem;
  outline: none;
  user-select: none;
  font-family: '__sauce_f5be8f', '__sauce_Fallback_f5be8f', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  transition: 0.2s;
  display: block;
  text-decoration: none;
}

.list-holder {
  all: unset;
  align-items: center;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  z-index: 4;
  background: unset;
  list-style: none;
  border-radius: 8px;
}

/* Button styles */
.button-style {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: var(--fontSizes-sm);
  font-family: '__sauce_f5be8f', '__sauce_Fallback_f5be8f', sans-serif;
  letter-spacing: var(--letterSpacings-wide);
  user-select: none;
  font-weight: var(--fontWeights-medium) !important;
  border-radius: 7px;
  transition: 0.2s;
  padding: 0.6rem 1.2rem;
}

.nav-item {
  list-style: none;

}

.top-top {
  display: flex;
  top: 0px;
  left: 0px;
  right: 0px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadows-dropShadowMdLight);
  border-bottom: 1px solid var(--colors-borderLight);
  z-index: 5;
}


.login-signup {
  display: flex;

}


.all-nav {
  padding-left: 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  text-align: center;
  z-index: 5;
  padding-bottom: 0px !important;
}

/* Ensure links are properly positioned */
.nav-css li a {
  position: relative;
  /* Needed for ::after positioning */
  display: inline-block;
  /* Prevents full-width behavior */
  text-decoration: none;
  /* Removes default underline */
  color: rgb(252, 252, 252);
}

/* Default: Hidden underline */
.nav-css li ::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0px;
  /* Position it just below the text */
  width: 100%;
  /* Ensure it spans full width */
  height: 10px;
  background-color: white;
  opacity: 0;
}

/* Hover Effect: Show the underline */
.nav-css li a:hover::after,
.nav-css li a:hover::after {
  opacity: 1;
}

.nav-css {
  box-sizing: border-box;
  display: flex !important;
  justify-content: flex-start !important;
  /* Force left alignment */
  align-items: center !important;
  width: 100% !important;
  flex-wrap: nowrap !important;
  position: relative !important;
  align-items: center;
  gap: 1rem;
  margin: 0px;
  z-index: 5;
  transition: mask-position 250ms ease-out, mask-size 250ms ease-out;
  overflow-y: hidden !important; /* Prevent vertical scrolling */
  display: flex;
  height: 60px; /* Set this to match your navbar height */

}

/* Navigation List */
.nav-css ul {
  display: flex;
  padding: 0;
  margin: 0;
  list-style: none;
  align-items: center;
  height: 100%; /* Makes ul take full height of .nav-css */
  border-bottom: 1px solid var(--colors-borderLight); /* Ensure this aligns with ul */

  /* Ensure all items align perfectly */
  gap: 0px !important;
  /* Force no extra spacing */
}

/* Navigation Items - Allow Dynamic Width */
.nav-css li {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 50px;
  height: 100%; /* Matches the full height of ul/nav */
  margin: 0 !important;
  line-height: normal !important;
  white-space: nowrap !important;
  flex-shrink: 0;
  /* Prevents auto-resizing */
  position: relative;
}


/* Apply the same styles to all items like "Global Elections" */
.nav-css li a {
  border-bottom-style: solid;
  border-bottom-width: 3px;
  box-sizing: border-box;
  color: rgb(252, 252, 252);
  cursor: pointer;
  display: flex;
  font-family: 'OpenSauceSans-Regular', sans-serif !important;
  font-size: 14px;
  font-weight: 400;
  line-height: normal !important;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;
  padding: 6.4px 0px 12.8px 0px !important;
  text-size-adjust: 100%;
  user-select: none;
  transition: all 0.2s ease;
  width: auto;
  height: 100%; /* Make sure links fill their parent <li> */

  /* Allows dynamic width */
}




/* LIVE Indicator - Fix alignment */
.nav-css .live-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transform: translateY(-4px);
  /* Move it up */
  font-size: 12px !important;
  font-family: 'OpenSauceSans-SemiBold', sans-serif !important;
  letter-spacing: 1.2px;
  color: rgb(255, 88, 66);




}

/* Blinking Red Dot */
.nav-css .live-indicator {
  display: block;
  width: 8px;
  height: 8px;
  background-color: rgb(255, 88, 66);
  border-radius: 50%;
  margin-left: 4px;
  position: relative;
  top: -1px;
  /* Adjust alignment */
  animation: blink-red 1.9s infinite ease-out;
  transform: translateY(1px);
  /* Move it down */

}

/* Blinking Animation */
@keyframes blink-red {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.nav-css {
  overflow-x: visible !important;
  /* Allow horizontal scrolling */
  white-space: nowrap !important;
  /* Prevent wrapping */
  -webkit-overflow-scrolling: touch;
  /* Smooth scrolling on mobile */
}

/* Ensure the scrolling container (ul) doesn’t break */
.nav-css ul {
  display: flex;
  flex-wrap: nowrap !important;
  /* Ensure items stay in one line */
  overflow-x: visible !important;
  /* Enable scrolling */
  scrollbar-width: none;
  /* Hide scrollbar in Firefox */
}

/* Hide scrollbar in WebKit browsers (Chrome, Safari, Edge) */
.nav-css::-webkit-scrollbar,
.nav-css ul::-webkit-scrollbar {
  width: 0px !important;
  height: 0px !important;
  background: transparent !important;
  display: none !important;
}

/* Hide scrollbar in Firefox */
.nav-css,
.nav-css ul {
  scrollbar-width: none !important;
  /* Firefox */
}

/* Hide scrollbar in Edge & Internet Explorer */
.nav-css,
.nav-css ul {
  -ms-overflow-style: none !important;
  /* Edge & IE */
}

.nav-css {
  min-width: 100vw !important;
  /* Prevents it from getting smaller than the screen */
}

.nav-css ul {
  cursor: grab;
  user-select: none;
}

.nav-css ul:active {
  cursor: grabbing;
}

.login {
  align-items: center;
  appearance: button;
  background-attachment: scroll;
  background-clip: border-box;
  background-color: rgba(0, 0, 0, 0);
  background-image: none;
  background-origin: padding-box;
  background-position-x: 0%;
  background-position-y: 0%;
  background-repeat: repeat;
  background-size: auto;
  border-bottom-color: rgb(45, 156, 219);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgb(45, 156, 219);
  border-left-style: none;
  border-left-width: 0px;
  border-right-color: rgb(45, 156, 219);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(45, 156, 219);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  border-top-style: none;
  border-top-width: 0px;
  box-sizing: border-box;
  color: rgb(45, 156, 219);
  cursor: default;
  display: flex;
  font-family: 'OpenSauceSans-Medium', sans-serif !important;
  font-feature-settings: normal;
  font-kerning: auto;
  font-optical-sizing: auto;
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
  font-weight: 500;
  height: 36px;
  justify-content: center;
  letter-spacing: 0.35px;
  line-height: 16.1px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  overflow-x: visible;
  overflow-y: visible;
  padding-block-end: 9.6px;
  padding-block-start: 9.6px;
  padding-bottom: 9.6px;
  padding-inline-end: 16px;
  padding-inline-start: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 9.6px;
  text-align: center;
  text-indent: 0px;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: none;
  text-wrap-mode: nowrap;
  transition-behavior: normal;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  user-select: none;
  white-space-collapse: collapse;
  width: 75.2891px;
  word-spacing: 0px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  color: rgb(45, 156, 219);
  background-color: rgba(0, 0, 0, 0);
  transition: all 0.2s ease-in-out;
  margin-right: 10px !important;


}

/* Hover Effect: Button turns white with light opacity */
.login:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
  /* Light white */
  color: rgb(45, 156, 219) !important;
  /* Keep text color the same */
}

.signup {
  font-family: 'OpenSauceSans-Medium', sans-serif !important;
  align-items: center;
  appearance: button;
  background-color: rgb(45, 156, 219);
  border-bottom-color: rgb(255, 255, 255);
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-bottom-style: none;
  border-bottom-width: 0px;
  border-image-outset: 0;
  border-image-repeat: stretch;
  border-image-slice: 100%;
  border-image-source: none;
  border-image-width: 1;
  border-left-color: rgb(255, 255, 255);
  border-left-style: none;
  border-left-width: 0px;
  border-right-color: rgb(255, 255, 255);
  border-right-style: none;
  border-right-width: 0px;
  border-top-color: rgb(255, 255, 255);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  border-top-style: none;
  border-top-width: 0px;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  cursor: default;
  display: flex;
  font-feature-settings: normal;
  font-kerning: auto;
  font-optical-sizing: auto;
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
  font-weight: 500;
  height: 36px;
  justify-content: center;
  letter-spacing: 0.35px;
  line-height: 16.1px;
  margin-bottom: 0px;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0px;
  overflow-x: visible;
  overflow-y: visible;
  padding-block-end: 9.6px;
  padding-block-start: 9.6px;
  padding-bottom: 9.6px;
  padding-inline-end: 16px;
  padding-inline-start: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 9.6px;
  text-align: center;
  text-indent: 0px;
  text-rendering: auto;
  text-shadow: none;
  text-size-adjust: 100%;
  text-transform: none;
  text-wrap-mode: nowrap;
  transition-behavior: normal;
  transition-delay: 0s;
  transition-duration: 0.2s;
  transition-property: all;
  transition-timing-function: ease;
  user-select: none;
  white-space-collapse: collapse;
  width: 87.5703px;
  word-spacing: 0px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-border-image: none;
}

.signup:hover {
  opacity: 0.9 !important;
  /* Reduce opacity by 0.1 */

}

nav {
  padding-left: 20px !important;
  /* Adds 20px margin around everything */
  padding-right: 20px !important;
  /* Adds 20px margin around everything */

  padding-top: 10px !important;
  /* Removes top padding */
}

.nav-css {
  position: relative;
  overflow-x: auto !important;
  white-space: nowrap !important;
  -webkit-overflow-scrolling: touch;
  mask-image: linear-gradient(to right, black 90%, rgba(0, 0, 0, 0) 100%);
  -webkit-mask-image: linear-gradient(to right, black 90%, rgba(0, 0, 0, 0) 100%);
}

/* Creates the ultra-thin low-opacity line */
#__pm_mobile_top_nav {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999 !important;
  /* Ensures navbar always stays on top */
}


/* Bottom Line: Touches the edges of the screen */
#__pm_mobile_top_nav::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -20px;
  width: 120%;
  /* Stretches across entire navbar */
  height: 1px;
  /* Very thin */
  background-color: rgba(255, 255, 255, 0.2);
  /* Low opacity white */
  pointer-events: none;
  /* Prevents interaction */
}


.custom-link {
  font-size: 1.5em;
  /* Increase text size */
  display: inline-block;
  padding: 2px;
  /* Add padding for a larger clickable area */
  color: white !important;
  /* Ensure the text is white */
  text-decoration: none;
  /* Remove underline */

}

.custom-logo {
  width: 130px !important;
  /* Increase the width */
  height: auto !important;
  /* Maintain aspect ratio */
  fill: white !important;
  /* Change logo color to white */
}

.custom-link:hover .custom-logo {
  opacity: 0.6;
  /* Lower opacity on hover */
}
.auth-section {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.profile-pic {
  width: 35px !important;
  height: 35px !important;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid white;
}
.user-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto; /* Pushes log out button & profile photo to the right */
  transform: translateX(20px);
}

</style>

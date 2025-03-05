<template>
  <div class="footer-container">
    <div class="footer-menu">
      <div v-for="item in menuItems" :key="item.name" class="footer-item">
        <router-link :to="item.path" class="footer-link" :class="{ 'active-link': $route.path === item.path }">
          <div class="icon-container">
            <svg v-if="item.name == 'Activity'" stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="2"></circle>
              <path :d="item.iconPath"></path>
            </svg>
            <svg v-if="item.name != 'Activity'" stroke="currentColor" fill="currentColor" stroke-width="0" :viewBox="item.viewBox" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path :d="item.iconPath"></path>

            </svg>
            <p>{{ item.name }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuItems: [
        { name: "Home", path: "/", viewBox: "0 0 24 24", iconPath: "M3,13h1v2v5c0,1.103,0.897,2,2,2h3h6h3c1.103,0,2-0.897,2-2v-5v-2h1c0.404,0,0.77-0.244,0.924-0.617 c0.155-0.374,0.069-0.804-0.217-1.09l-9-9c-0.391-0.391-1.023-0.391-1.414,0l-9,9c-0.286,0.286-0.372,0.716-0.217,1.09 C2.23,12.756,2.596,13,3,13z M10,20v-5h4v5H10z M12,4.414l6,6V15l0,0l0.001,5H16v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5 H6v-5v-3v-1.586L12,4.414z" },
        { name: "Search", path: "/search", viewBox: "0 0 20 20", iconPath: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" },
        { name: "Create", path: "/create", viewBox: "0 0 16 16", iconPath: "M1 2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V2zM1 7a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7z M1 12a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H7a1 1 0 01-1-1v-2zm5 0a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z" },
        { name: "Activity", path: "/activity", viewBox: "0 0 20 20", iconPath: "M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"},
        { name: "Wallet", path: "/wallet", viewBox: "0 0 24 24", iconPath: "M3,3v17c0,0.553,0.447,1,1,1h17v-2H5V3H3z M15.293,14.707c0.391,0.391,1.023,0.391,1.414,0l5-5l-1.414-1.414L16,12.586l-2.293-2.293c-0.391-0.391-1.023-0.391-1.414,0l-5,5l1.414,1.414L13,12.414L15.293,14.707z" }
      ]
    };
  }
};
</script>

<style scoped>
@font-face {
  font-family: 'OpenSauceSans-Medium';
  src:  url('fonts/OpenSauceSans-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

.footer-container {
  background-color: rgb(29, 43, 57) !important;
  border-top-color: rgb(66, 84, 100);
  opacity: 1 !important;
  border-top-style: solid;
  border-top-width: 1px;
  box-sizing: border-box;
  color: rgb(133, 141, 146);
  display: flex;
  font-family: OpenSauceSans-Medium;
  font-size: 10px;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  overflow-x: visible;
  overflow-y: visible;
  text-size-adjust: 100%;
  unicode-bidi: isolate;
  width: 100%;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9999; /* Keeps it above all other elements */
  pointer-events: auto; /* Ensures interactivity */
}

.footer-menu {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.footer-item {
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
}
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer-link {
  text-decoration: none;
  color: inherit;
}
.footer-link.active-link {
  color: white !important;
}
.icon-container svg {
  width: auto;
  height: 20px;
}
.smaller svg {
  height: 18px;
}
</style>
